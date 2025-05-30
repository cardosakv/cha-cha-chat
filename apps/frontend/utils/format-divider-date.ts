import { DATE_FORMAT_FULL, DATE_FORMAT_TODAY, DATE_FORMAT_WEEK } from "~/shared/constants";

export default (timestamp: number | undefined) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  if (isToday(date)) {
    return useDateFormat(date, DATE_FORMAT_TODAY).value;
  } else if (isOneWeekAgo(date)) {
    return useDateFormat(date, DATE_FORMAT_WEEK).value;
  } else {
    return useDateFormat(date, DATE_FORMAT_FULL).value;
  }
};
