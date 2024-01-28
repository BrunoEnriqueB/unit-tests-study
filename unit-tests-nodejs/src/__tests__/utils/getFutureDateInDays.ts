/***
 * Return actual date plus "days"
 * @param days Example: 5
 */
export default function (days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
