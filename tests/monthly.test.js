import assert from "node:assert/strict";
import { PAYROLL_RULES } from "../rules.js";

const monthlySalary = 50000;
const policy = PAYROLL_RULES.monthlyPolicy;
assert.equal(monthlySalary * policy.cutoffAllocation[1], 25000, "monthly salary is split equally for cutoff 1");
assert.equal(monthlySalary / policy.absenceDivisor, 2500, "monthly absence deduction uses the configured divisor");
assert.equal((monthlySalary / policy.monthlyWorkdays) * (2 - 1), 2500, "worked regular holiday adds the configured premium");
console.log("Monthly-paid policy tests passed");
