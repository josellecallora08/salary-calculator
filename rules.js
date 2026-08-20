export const PAYROLL_RULES = {
  version: "PH-ESTIMATE-2026.1",
  effectiveFrom: "2026-01-01",
  sourceLabel: "Reference assumptions supplied in the payroll PDFs; validate against current official tables before production use.",
  contributions: { sss: 1750, philHealth: 1136, pagIbig: 200 },
  automaticContributionEstimates: { monthlyWorkdays: 20, sssRate: 0.03847, sssMaximum: 1750, philHealthRate: 0.025, philHealthMaximum: 1136, pagIbigRate: 0.02, pagIbigMaximum: 200 },
  holidayRules: {
    REGULAR: { notWorked: 1, worked: 2 },
    SPECIAL_NON_WORKING: { notWorked: 0, worked: 1.3 },
    OTHER: { notWorked: 0, worked: 1 }
  },
  withholding: { monthlyTaxableThreshold: 20000, monthlyTaxRate: 0.075, monthlyTaxBase: 25000, monthlyTax: 375, semiMonthlyCap: 50000, referenceExample: { monthlyGross: 45440, tax: 1530.90 } }
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
