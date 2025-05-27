import { DATE_FORMAT_FULL, DATE_FORMAT_TODAY, DATE_FORMAT_WEEK } from "~/shared/constants";

export default (date: Date | undefined) => {
  if (!date) return "";

  if (isToday(date)) {
    return useDateFormat(date, DATE_FORMAT_TODAY);
  } else if (isOneWeekAgo(date)) {
    return useDateFormat(date, DATE_FORMAT_WEEK);
  } else {
    return useDateFormat(date, DATE_FORMAT_FULL);
  }
};
