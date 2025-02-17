export default function formatDateToYYYYMMDD(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const days = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${days}`;
}
