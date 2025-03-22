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
const errorMessage = document.querySelector('.error-message');

const morningSchedules = [];
const afternoonSchedules = [];
const nightSchedules = [];

window.onload = () => {
  const savedMorning = JSON.parse(localStorage.getItem("morningSchedules")) || [];
  const savedAfternoon = JSON.parse(localStorage.getItem("afternoonSchedules")) || [];
  const savedNight = JSON.parse(localStorage.getItem("nightSchedules")) || [];

  morningSchedules.push(...savedMorning);
  afternoonSchedules.push(...savedAfternoon);
  nightSchedules.push(...savedNight);

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

  try {
    const [hour] = scheduleHour.split(':').map(Number);
    const formattedDateTime = ValidateTime.formatHour(scheduleDate, scheduleHour);

    const newSchedule = {
      name: document.querySelector('#tutor-name').value,
      pet: document.querySelector('#pet-name').value,
      phone: document.querySelector('#phone').value,
      description: document.querySelector('#description').value,
      date: formattedDateTime,
    }

    const isMorningSchedule = hour >= 9 && hour <= 12;
    const isAfternoonSchedule = hour >= 13 && hour <= 18;
    const isNightSchedule = hour >= 19 && hour <= 21;

    if (isMorningSchedule) {
      morningSchedules.push(newSchedule);
      localStorage.setItem("morningSchedules", JSON.stringify(morningSchedules));
      Render.schedule(newSchedule, morningSchedulesList);
    } else if (isAfternoonSchedule) {
      afternoonSchedules.push(newSchedule);
      localStorage.setItem("afternoonSchedules", JSON.stringify(afternoonSchedules));
      Render.schedule(newSchedule, afternoonSchedulesList);
    } else if (isNightSchedule) {
      nightSchedules.push(newSchedule);
      localStorage.setItem("nightSchedules", JSON.stringify(nightSchedules));
      Render.schedule(newSchedule, nightSchedulesList);
    }

    errorMessage.textContent = '';
    newScheduleForm.close();
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("schedules-list__remove")) {
    const li = event.target.closest("li");
    if (!li) {
      return;
    };

    const pet = li.querySelector(".schedules-list__pet").textContent.trim();
    const description = li.querySelector('.schedules-list__type').textContent.trim();


    let scheduleArrayName;
    if (li.closest(".morning-schedules")) {
      scheduleArrayName = "morningSchedules";
    } else if (li.closest(".afternoon-schedules")) {
      scheduleArrayName = "afternoonSchedules";
    } else if (li.closest(".night-schedules")) {
      scheduleArrayName = "nightSchedules";
    }

    if (scheduleArrayName) {
      let schedules = JSON.parse(localStorage.getItem(scheduleArrayName)) || [];
      schedules = schedules.filter((schedule) => {
        return schedule.pet !== pet & schedule.type !== description;
      });

      localStorage.setItem(scheduleArrayName, JSON.stringify(schedules));
      li.remove();
    }
  }
});
