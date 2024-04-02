import dayjs from "dayjs";

export function convertCurrency({ rubleRate }) {
  return 1 / rubleRate;
}

export function calculationInterimDates(startDate, endDate, setCuntDays) {
  const dates: string[] = [];
  let currentDate = dayjs(startDate);
  const currentEndDate = dayjs(endDate);
  console.log(currentDate, currentEndDate);

  while (
    currentDate.isBefore(endDate) ||
    currentDate.isSame(currentEndDate, "day")
  ) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }
  console.log(dates);
  setCuntDays(dates);
}
