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
  const scheduleDate = document.querySelector('#schedule-date').value;
  const scheduleHour = document.querySelector('#schedule-hour').value;

  const [day, month, year] = scheduleDate.split('/').map(Number);
  const [hour, minute] = scheduleHour.split(':').map(Number);
  const dateTime = new Date(year, month - 1, day, hour, minute);

  const newSchedule = {
    name: document.querySelector('#tutor-name').value,
    pet: document.querySelector('#pet-name').value,
    phone: document.querySelector('#phone').value,
    description: document.querySelector('#description').value,
    date: dateTime,
  }

  try {
    const isMorningSchedule = hour >= 9 && hour <= 12;
    const isAfternoonSchedule = hour >= 13 && hour <= 18;
    const isNightSchedule = hour >= 19 && hour <= 21;

    ValidateTime.date(newSchedule.date);
    ValidateTime.hour(newSchedule.date);
  
    if (isMorningSchedule) {
      morningSchedules.push(newSchedule);
      Render.schedule(newSchedule, morningSchedulesList);
    } else if (isAfternoonSchedule) {
      afternoonSchedules.push(newSchedule);
      Render.schedule(newSchedule, afternoonSchedulesList);
    } else if (isNightSchedule) {
      nightSchedules.push(newSchedule);
      Render.schedule(newSchedule, nightSchedulesList);
    }

    newScheduleForm.close();
  } catch (error) {
    console.log('error: ', error)
  }
}


