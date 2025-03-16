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