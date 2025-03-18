const newScheduleButton = document.querySelector('.schedules-button');
const newScheduleForm = document.querySelector('.modal');
const newScheduleHour = document.querySelector('#schedule-hour');
const newScheduleDate = document.querySelector('#schedule-date');
const form = document.querySelector('.modal-form');

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

newScheduleDate.oninput = () => {
  let value = newScheduleDate.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 10);
  newScheduleDate.value = value;
};

newScheduleHour.oninput = () => {
  let value = newScheduleHour.value.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .slice(0, 5);
    newScheduleHour.value = value;
}

function validateDate(value) {
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day) {
    return false;
  }

  return true;
}

function validateHour(value) {
  const [hour, minute] = value.split(':').map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

form.onsubmit = (e) => {
  e.preventDefault();

  const tutorName = document.querySelector('#tutor-name').value;
  const petName = document.querySelector('#pet-name').value;
  const phone = document.querySelector('#phone').value;
  const serviceDescription = document.querySelector('#description').value;
  const scheduleDate = document.querySelector('#schedule-date').value;
  const scheduleHour = document.querySelector('#schedule-hour').value;

  const isDateValid = validateDate(scheduleDate);
  const isHourValid = validateHour(scheduleHour);

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


