export function calendarDays(year, month, currentProfile) {
  const days = [], total = new Date(year, month, 0).getDate();
  for (let day = 1; day <= total; day++) {
    const date = new Date(year, month - 1, day);
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({ date: dateString, weekday: date.getDay(), scheduledWorkday: currentProfile.scheduledWeekdays.includes(date.getDay()), cutoff: day <= currentProfile.cutoff1.endDay ? 1 : 2 });
  }
  return days;
}
