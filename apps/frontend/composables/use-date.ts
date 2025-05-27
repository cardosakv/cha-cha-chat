import { DATE_FORMAT_FULL, DATE_FORMAT_TODAY, DATE_FORMAT_WEEK } from "~/shared/constants";

export const useDate = (date: Date | undefined) => {
  const formatted = computed(() => {
    if (!date) {
      return "";
    }

    if (isToday(date)) {
      return useDateFormat(date, DATE_FORMAT_TODAY);
    } else if (isOneWeekAgo(date)) {
      return useDateFormat(date, DATE_FORMAT_WEEK);
    } else {
      return useDateFormat(date, DATE_FORMAT_FULL);
    }
  });

  return formatted;
};
