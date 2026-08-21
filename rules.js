export const PAYROLL_RULES = {
  version: "PH-STATUTORY-2025.1",
  effectiveFrom: "2025-01-01",
  sourceLabel: "SSS 2025 employee share, PhilHealth 2025 premium schedule, Pag-IBIG Circular 274, and BIR TRAIN withholding brackets. Validate employer-specific treatment before production use.",
  contributions: { sss: 1750, philHealth: 1250, pagIbig: 100 },
  automaticContributionEstimates: { monthlyWorkdays: 20, sss: { minimumMSC: 5000, maximumMSC: 35000, mscStep: 500, employeeRate: 0.05 }, philHealth: { incomeFloor: 10000, incomeCeiling: 100000, employeeRate: 0.025 }, pagIbig: { lowSalaryThreshold: 1500, lowRate: 0.01, highRate: 0.02, maximumCompensation: 5000 } },
  monthlyPolicy: { version: "MONTHLY-ESTIMATE-2026.1", monthlyWorkdays: 20, absenceDivisor: 20, cutoffAllocation: { 1: 0.5, 2: 0.5 }, holidayTreatment: "Monthly base includes not-worked holidays; worked holidays receive only the configured premium." },
  holidayRules: {
    REGULAR: { notWorked: 1, worked: 2 },
    SPECIAL_NON_WORKING: { notWorked: 0, worked: 1.3 },
    OTHER: { notWorked: 0, worked: 1 }
  },
  withholding: { period: "MONTHLY_TRAIN_2023_ONWARD", brackets: [{ upTo: 20833, baseTax: 0, rate: 0, excessOver: 0 }, { upTo: 33332, baseTax: 0, rate: 0.15, excessOver: 20833 }, { upTo: 66666, baseTax: 1875, rate: 0.2, excessOver: 33332 }, { upTo: 166666, baseTax: 8541.8, rate: 0.25, excessOver: 66666 }, { upTo: 666666, baseTax: 33541.8, rate: 0.3, excessOver: 166666 }, { upTo: Infinity, baseTax: 183541.8, rate: 0.35, excessOver: 666666 }] }
};

export const HOLIDAYS = {
  2026: [
    { date: "2026-02-17", name: "Chinese New Year", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-04-02", name: "Maundy Thursday", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-04-03", name: "Good Friday", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-04-09", name: "Araw ng Kagitingan", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-04-11", name: "Black Saturday", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-05-01", name: "Labor Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-06-12", name: "Independence Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-08-21", name: "Ninoy Aquino Day", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-08-31", name: "National Heroes Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-11-01", name: "All Saints' Day", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-11-30", name: "Bonifacio Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-12-08", name: "Feast of the Immaculate Conception", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-12-24", name: "Christmas Eve", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-12-25", name: "Christmas Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-12-30", name: "Rizal Day", classification: "REGULAR", ruleVersion: "PH-ESTIMATE-2026.1" },
    { date: "2026-12-31", name: "Last Day of the Year", classification: "SPECIAL_NON_WORKING", ruleVersion: "PH-ESTIMATE-2026.1" }
  ]
};
