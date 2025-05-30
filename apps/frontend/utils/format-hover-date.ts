import { DATE_FORMAT_FULL } from "~/shared/constants";

export default (timestamp: number | undefined) => {
  if (!timestamp) return "";

  return useDateFormat(new Date(timestamp), DATE_FORMAT_FULL).value;
};
