export class Mask {
  static phone(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 10) {
      return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    } else if (value.length > 6) {
      return value.replace(/^(\d{2})(\d{1})(\d{4})/, '($1) $2 $3');
    } else if (value.length > 2) {
      return value.replace(/^(\d{2})(\d{1})/, '($1) $2');
    } else if (value.length > 0) {
      return value.replace(/^(\d{2})/, '($1)');
    }
    return value;
  }

  static date(value) {
    value = newScheduleDate.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 10);

    return value;
  }

  static hour(value) {
    value = newScheduleHour.value.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .slice(0, 5);

  return value;
  }
}
