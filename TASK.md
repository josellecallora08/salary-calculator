# TASK: Add Monthly-Salary Payroll Support

## Status

Planned

## Objective

Extend Payroll Lite PH so users can choose between daily-paid and monthly-paid payroll profiles without changing the existing daily-paid behavior.

The system must continue to calculate both payroll types using the same calendar, cutoff, holiday, deduction, tax, history, and reporting workflow.

## User story

As an employee with a monthly salary,
I want to configure my monthly basic salary instead of a daily wage,
so that my expected semi-monthly payouts and deductions reflect my payroll arrangement.

## Scope

### Included

- Add a pay-basis choice:
  - Daily-paid
  - Monthly-paid
- Keep the existing daily-rate profile flow unchanged when Daily-paid is selected.
- Add a Monthly-paid profile field for monthly basic salary.
- Calculate monthly-paid cutoff earnings using versioned payroll rules.
- Continue supporting:
  - Work schedules
  - Unpaid absences
  - Holiday statuses
  - Cutoff and payday settings
  - Automatic SSS, PhilHealth, Pag-IBIG, and withholding-tax estimates
  - Manual contribution overrides
  - Monthly history
  - Printable reports
- Display the selected pay basis in the profile summary and payroll report.
- Store the pay basis and salary inputs in saved profile and monthly records.

### Excluded from this update

- AI assistant features
- Overtime and night differential
- Paid leave balances
- Rest-day work
- Multiple employee profiles
- Cloud synchronization
- Employer payroll filing
- Automatic retrieval of government rules

## Product requirements

### Profile setup

Add a required `Pay basis` field to the profile form.

When `Daily-paid` is selected:

- Show `Daily rate`.
- Hide `Monthly basic salary`.
- Use the existing daily-paid calculation behavior.

When `Monthly-paid` is selected:

- Show `Monthly basic salary`.
- Hide or disable `Daily rate`.
- Keep the work schedule because it is needed for attendance and absence treatment.
- Keep cutoff, payday, and deduction-cutoff settings.

The selected pay basis must be saved locally and restored when the application is reopened.

### Monthly-paid calculation

Monthly-paid calculations must not silently reuse the daily-paid formula. They must use a separate, versioned monthly-pay policy configuration.

The policy must define:

- How monthly basic salary is allocated between cutoff 1 and cutoff 2.
- How unpaid absences reduce monthly-paid earnings.
- Whether holidays are already included in monthly pay or require a separate adjustment.
- How partial-month attendance is handled.
- How contribution and tax bases are determined.
- Rounding behavior.

Until an employer policy is selected, the application must clearly label the result as an estimate and show the assumptions used.

### Suggested default monthly-paid policy

Use a configurable default policy rather than hardcoding the rules into UI components:

- Base monthly salary is allocated across the two configured cutoffs.
- Unpaid absences are deducted using the configured monthly-paid divisor.
- Holiday treatment follows the bundled holiday rules and monthly-paid policy.
- Statutory deductions and withholding tax use the resulting taxable compensation.
- The calculation output includes the divisor and allocation assumptions.

The divisor must be a named rule setting and must not be inferred from the number of calendar weekdays without an explicit policy decision.

## Data model changes

### Payroll profile

Add:

```ts
type PayBasis = "DAILY" | "MONTHLY";

type PayrollProfile = {
  id: string;
  payBasis: PayBasis;
  dailyRate?: number;
  monthlyBasicSalary?: number;
  scheduledWeekdays: number[];
  cutoff1: {
    startDay: number;
    endDay: number;
    paydayDay: number;
  };
  cutoff2: {
    startDay: number;
    endOfMonth: true;
    paydayDay: number;
    paydayNextMonth: boolean;
  };
  deductionCutoff: 1 | 2;
  useContributionOverrides?: boolean;
  overrides?: {
    sss?: number;
    philHealth?: number;
    pagIbig?: number;
  };
  createdAt: string;
  updatedAt: string;
};
```

Validation rules:

- `DAILY` requires a positive `dailyRate`.
- `MONTHLY` requires a positive `monthlyBasicSalary`.
- Exactly one primary salary field is active for a profile.
- Existing profiles without `payBasis` migrate to `DAILY`.

### Monthly record

Store a profile snapshot or pay basis with each saved monthly record so a historical result remains understandable after the profile changes.

```ts
type MonthlyRecord = {
  // existing fields...
  payBasis: "DAILY" | "MONTHLY";
  salaryInput: number;
  monthlyPolicyVersion: string;
};
```

### Payroll result

Add calculation assumptions:

```ts
type PayrollAssumptions = {
  payBasis: "DAILY" | "MONTHLY";
  salaryInput: number;
  monthlyBasicSalary: number;
  monthlyPolicyVersion: string;
  absenceDivisor?: number;
  cutoffAllocation: string;
};
```

## UI requirements

### Profile screen

- Add a clear Pay basis selector near the salary fields.
- Update the salary label when the pay basis changes.
- Show the active salary input only.
- Explain that monthly-paid absence and holiday treatment are estimates based on the selected policy.
- Keep contribution overrides collapsed by default.
- Show that statutory deductions and tax are automatically estimated.

### Monthly calculator screen

- Show the selected pay basis.
- Show the relevant salary input as a saved value.
- Keep the calendar workflow unchanged.
- Do not ask monthly-paid users to manually enter calculated cutoff pay.

### Results screen

- Show pay basis and salary basis in the summary.
- Show monthly basic salary for monthly-paid profiles.
- Show the monthly-paid policy version and assumptions in the breakdown.
- Clearly label all results as estimated payroll.

### Printable report

Include:

- Pay basis
- Daily rate or monthly basic salary
- Cutoff allocation
- Absence treatment
- Holiday treatment
- Statutory deductions
- Withholding tax
- Rules and policy versions
- Estimated Payroll disclaimer

## Implementation tasks

### EPIC A - Domain and migration

- [ ] Add `PayBasis` and updated profile types.
- [ ] Add profile migration for existing daily-paid profiles.
- [ ] Add validation for mutually exclusive salary fields.
- [ ] Add monthly policy configuration schema.

### EPIC B - Profile UI

- [ ] Add pay-basis selector.
- [ ] Toggle daily-rate and monthly-salary fields.
- [ ] Save and reload monthly-paid profiles.
- [ ] Preserve contribution override behavior.
- [ ] Add validation messages.

### EPIC C - Calculation engine

- [ ] Separate daily-paid and monthly-paid gross-pay calculations.
- [ ] Implement configurable monthly-paid cutoff allocation.
- [ ] Implement configurable monthly-paid absence deduction.
- [ ] Resolve holiday treatment for monthly-paid employees.
- [ ] Feed monthly-paid taxable compensation into deduction and tax engines.
- [ ] Return calculation assumptions.

### EPIC D - Results and reporting

- [ ] Display pay basis in results.
- [ ] Display monthly-paid assumptions.
- [ ] Include pay basis in saved monthly records.
- [ ] Include pay basis and policy version in printable reports.

### EPIC E - Testing

- [ ] Existing daily-paid tests remain passing.
- [ ] Monthly-paid profile validation.
- [ ] Daily-paid profile migration.
- [ ] Monthly salary split across cutoffs.
- [ ] Monthly-paid absence deduction.
- [ ] Monthly-paid holiday not worked.
- [ ] Monthly-paid holiday worked.
- [ ] Contribution and tax recalculation after salary changes.
- [ ] History retains the original pay basis and policy version.
- [ ] Printable report includes monthly-paid assumptions.

## Acceptance criteria

- A user can select Daily-paid or Monthly-paid during profile setup.
- A Daily-paid profile calculates the same way as before this update.
- A Monthly-paid profile does not require a daily rate.
- A Monthly-paid profile calculates both cutoff payouts from monthly basic salary.
- Unpaid absence treatment follows a visible, versioned monthly-paid policy.
- Holiday treatment follows a visible, versioned monthly-paid policy.
- SSS, PhilHealth, Pag-IBIG, and withholding tax are recalculated when the salary input changes.
- Existing saved daily-paid profiles continue to work after migration.
- Saved monthly results retain the pay basis and policy version used.
- Reports identify whether the employee is daily-paid or monthly-paid.
- No backend request is required for normal calculation.

## Open policy decisions

Before treating monthly-paid calculations as production-ready, confirm:

- Employer divisor for unpaid absences.
- Whether monthly-paid salary already includes regular holidays.
- Treatment of special non-working holidays.
- Cutoff allocation policy.
- Partial-month and mid-month start rules.
- Current official contribution and withholding tables.

## Future AI note

AI may later explain calculations, convert natural-language attendance notes into calendar selections, and compare estimates with payslips. AI must not replace the deterministic payroll engine or decide statutory rules.
