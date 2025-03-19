import { Mask } from "./mask.js";
import { Render } from "./render.js";
import { ValidateTime } from "./validate.js";

const newScheduleButton = document.querySelector('.schedules-button');
const newScheduleForm = document.querySelector('.modal');
const newScheduleHour = document.querySelector('#schedule-hour');
const newScheduleDate = document.querySelector('#schedule-date');
const newSchedulePhone = document.querySelector('#phone');
const form = document.querySelector('.modal-form');
const morningSchedulesList = document.querySelector('.morning-schedules');
const afternoonSchedulesList = document.querySelector('.afternoon-schedules');
const nightSchedulesList = document.querySelector('.night-schedules');

const morningSchedules = [];
const afternoonSchedules = [];
const nightSchedules = [];

window.onload = () => {
  morningSchedules.forEach((schedule) => Render.schedule(schedule, morningSchedulesList));
  afternoonSchedules.forEach((schedule) => Render.schedule(schedule, afternoonSchedulesList));
  nightSchedules.forEach((schedule) => Render.schedule(schedule, nightSchedulesList));
}

newScheduleButton.onclick = () => {
  newScheduleForm.showModal();
}

newSchedulePhone.oninput = () => {
  newSchedulePhone.value = Mask.phone(newSchedulePhone.value);
}

newScheduleDate.oninput = () => {
  newScheduleDate.value = Mask.date(newScheduleDate.value);
};

newScheduleHour.oninput = () => {
  newScheduleHour.value = Mask.hour(newScheduleHour.value);
}

form.onsubmit = (e) => {
  e.preventDefault();

  const tutorName = document.querySelector('#tutor-name').value;
  const petName = document.querySelector('#pet-name').value;
  const phone = document.querySelector('#phone').value;
  const serviceDescription = document.querySelector('#description').value;
  const scheduleDate = document.querySelector('#schedule-date').value;
  const scheduleHour = document.querySelector('#schedule-hour').value;

  const isDateValid = ValidateTime.date(scheduleDate);
  const isHourValid = ValidateTime.hour(scheduleHour);

  if(!isDateValid) {
    throw new Error('Formato da data não está correto.');
  }
  
  if(!isHourValid) {
    throw new Error('Formato da hora não está correto.')
  }
  console.log('horario ', Number(scheduleHour))

  const newSchedule = {
    name: tutorName,
    pet: petName,
    phone,
    description: serviceDescription,
    date: scheduleDate,
    hour: scheduleHour
  }

  if (scheduleHour >= 9 && scheduleHour <= 12) {
    morningSchedules.push(newSchedule);
    Render.schedule(newSchedule, morningSchedulesList);
  } else if (scheduleHour >= 13 && scheduleHour <= 18) {
    afternoonSchedules.push(newSchedule);
    Render.schedule(newSchedule, afternoonSchedulesList);
  } else if (scheduleHour >= 19 && scheduleHour <= 21) {
    nightSchedules.push(newSchedule);
    Render.schedule(newSchedule, nightSchedulesList);
  }
}


