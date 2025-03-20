export class ValidateTime {
  static formatHour(scheduleDate, scheduleHour) {
    const [day, month, year] = scheduleDate.split('/').map(Number);
    const [hour, minute] = scheduleHour.split(':').map(Number);

    const daysInMonth = new Date(year, month, 0).getDate();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if(hour > 21 || hour < 9) {
      throw new Error('O horário não está disponível');
    };

    if(day < 1 || day > daysInMonth) {
      throw new Error('Esse dia não existe no mês que você passou');
    };

    if (month < 1 || month > 12) {
      throw new Error('O mês não está no formato correto.');
    };

    if (year < currentYear || month < currentMonth) {
      throw new Error('A data não pode ser anterior a data atual.');
    };

    const isValidHour = hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    if (!isValidHour) {
      throw new Error('A hora não está no formato correto.');
    };

    return new Date(year, month - 1, day, hour, minute);
  }
}
