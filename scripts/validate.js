export class ValidateTime {
  static date(value) {
    console.log('iniciou a validação')

    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return false;
    }
  
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();
  
    const testDate = new Date(year, month - 1, day);
  
    const isValid = (
      testDate.getFullYear() === year &&
      testDate.getMonth() + 1 === month &&
      testDate.getDate() === day
    );

    console.log('isValid: ', isValid)

    if(!isValid) {
      throw new Error('A hora não está no formato correto.');
    }
  }

  static hour(value) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return false;
    }

    const hour = value.getHours();
    const minute = value.getMinutes();

    console.log('value ', value);

    const isValid = hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    console.log('is valid: ', isValid)

    if(!isValid) {
      throw new Error('A data não está no formato correto.');
    };
  }
}
