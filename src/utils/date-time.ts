export function dateCalc(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const months = String(month).padStart(2, "0");
  const days = String(day).padStart(2, "0");

  return `${year}. ${months}. ${days}`;
}

export function dateCalc2(value: string) {
  const date = new Date(value);
  const year = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function timeCalc(value: string) {
  const date = new Date(value);
  let hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (hour > 23) {
    hour = hour - 24;
  }
  const hours = String(hour).padStart(2, "0");

  return `${hours}:${minutes}`;
}
