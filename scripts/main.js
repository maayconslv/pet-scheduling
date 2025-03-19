import { Mask } from "./mask.js";
import { ValidateTime } from "./validate.js";

const newScheduleButton = document.querySelector('.schedules-button');
const newScheduleForm = document.querySelector('.modal');
const newScheduleHour = document.querySelector('#schedule-hour');
const newScheduleDate = document.querySelector('#schedule-date');
const newSchedulePhone = document.querySelector('#phone');
const form = document.querySelector('.modal-form');

const morningSchedules = [];
const afternoonSchedules = [];
const nightSchedules = [];

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".header-calendar__wrapper input");

  input.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    let formattedValue = "";
    if (value.length > 4) {
      formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4)}`;
    } else if (value.length > 2) {
      formattedValue = `${value.substring(0, 2)}/${value.substring(2)}`;
    } else {
      formattedValue = value;
    }

    e.target.value = formattedValue;
  });

  input.addEventListener("blur", function () {
    if (input.value.length !== 10) {
      input.value = "";
    }
  });
});

newScheduleButton.onclick = () => {
  newScheduleForm.showModal();
}

newSchedulePhone.oninput = () => {
  newSchedulePhone.value = Mask.phone(newSchedulePhone.value);
}

newScheduleDate.oninput = () => {
  newScheduleDate.value = Mask.date(value);
};

newScheduleHour.oninput = () => {
  newScheduleHour.value = Mask.hour(value);
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

  const newSchedule = {
    name: tutorName,
    pet: petName,
    phone,
    description: serviceDescription,
    date: scheduleDate,
    hour: scheduleHour
  }

  console.log('new schedule: ', newSchedule);

  console.log('uhu deu submit')
}


