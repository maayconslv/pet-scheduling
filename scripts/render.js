export class Render {
  static schedule(schedule, scheduleList) {
    const scheduleItemWrapper = document.createElement('li');
    scheduleItemWrapper.classList.add('schedules-list__item');

    const scheduleHour = document.createElement('span');
    scheduleHour.classList.add('schedules-list__hour');
    scheduleHour.textContent = this.formatDate(schedule.date);

    const responsibleNameDiv = document.createElement('div');
    responsibleNameDiv.classList.add('schedules-list__responsible');

    const petNameSpan = document.createElement('span');
    petNameSpan.classList.add('schedules-list__pet');
    petNameSpan.textContent = schedule.pet;

    const separator = document.createElement('span');
    separator.textContent = ' / ';

    const tutorNameSpan = document.createElement('span');
    tutorNameSpan.classList.add('schedules-list__tutor');
    tutorNameSpan.textContent = schedule.name;

    responsibleNameDiv.appendChild(petNameSpan);
    responsibleNameDiv.appendChild(separator);
    responsibleNameDiv.appendChild(tutorNameSpan);

    const type = document.createElement('span');
    type.classList.add('schedules-list__type');
    type.textContent = schedule.description;

    const button = document.createElement('button');
    button.classList.add('schedules-list__remove');
    button.textContent = 'Remover agendamento';

    scheduleItemWrapper.appendChild(scheduleHour);
    scheduleItemWrapper.appendChild(responsibleNameDiv);
    scheduleItemWrapper.appendChild(type);
    scheduleItemWrapper.appendChild(button);

    scheduleList.appendChild(scheduleItemWrapper);
  }

  static formatDate(date) {
    const formattedDate = new Date(date);
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }
}