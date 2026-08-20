import assert from "node:assert/strict";
import { calendarDays } from "../engine.js";

const profile = { scheduledWeekdays: [1, 2, 3, 4, 5], cutoff1: { endDay: 15 } };
assert.equal(calendarDays(2026, 2, profile).length, 28, "February 2026 has 28 days");
assert.equal(calendarDays(2028, 2, profile).length, 29, "February leap year has 29 days");
assert.equal(calendarDays(2026, 8, profile).filter((d) => d.scheduledWorkday && d.cutoff === 1).length, 10, "August 2026 first cutoff weekdays");
assert.equal(calendarDays(2026, 8, profile).filter((d) => d.scheduledWorkday && d.cutoff === 2).length, 11, "August 2026 second cutoff weekdays before exceptions");
assert.equal(calendarDays(2026, 8, profile).filter((d) => d.scheduledWorkday && d.cutoff === 1).every((d) => Number(d.date.slice(-2)) <= 15), true);
console.log("Payroll calendar tests passed");
