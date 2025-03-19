export class ValidateTime {
  static date(value) {
    const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day) {
    return false;
  }

  return true;
  }

  static hour(value) {
    const [hour, minute] = value.split(':').map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }
}
