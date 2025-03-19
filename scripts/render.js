export class Render {
  static schedule(schedule, scheduleList) {
    const wrapper = document.createElement('li');
    wrapper.classList.add('schedules-list__item');

    const hour = document.createElement('span');
    hour.classList.add('schedules-list__hour');
    hour.textContent = schedule.hour;

    const responsibleDiv = document.createElement('div');
    responsibleDiv.classList.add('schedules-list__responsible');

    const pet = document.createElement('span');
    pet.classList.add('schedules-list__pet');
    pet.textContent = schedule.pet;

    const separator = document.createElement('span');
    separator.textContent = ' / ';

    const tutor = document.createElement('span');
    tutor.classList.add('schedules-list__tutor');
    tutor.textContent = schedule.name;

    responsibleDiv.appendChild(pet);
    responsibleDiv.appendChild(separator);
    responsibleDiv.appendChild(tutor);

    const type = document.createElement('span');
    type.classList.add('schedules-list__type');
    type.textContent = schedule.description;

    const button = document.createElement('button');
    button.classList.add('schedules-list__remove');
    button.textContent = 'Remover agendamento';

    wrapper.appendChild(hour);
    wrapper.appendChild(responsibleDiv);
    wrapper.appendChild(type);
    wrapper.appendChild(button);

    scheduleList.appendChild(wrapper);
  }
}