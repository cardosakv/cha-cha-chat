export default (date: Date) => {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 6);

  return date >= oneWeekAgo && date <= today;
};
