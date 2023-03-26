// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  allowInput: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

const startBtnEl = document.querySelector("button");
const flatpickrEl = document.querySelector("#datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

const fpk = flatpickr(flatpickrEl, options);

function checkDate(selectedDate) {
  if (selectedDate <= new Date()) {

    if (!startBtnEl.hasAttribute("disabled")) {
      startBtnEl.setAttribute("disabled", true);
    }

    Notiflix.Notify.failure("Please choose a date in the future");
  } else {
    startBtnEl.removeAttribute("disabled");
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0")
}

let timerId = null;

startBtnEl.addEventListener("click", () => {
  const setDate = fpk.selectedDates[0];
  timerId = setInterval(() => {
    if (setDate > new Date()) {
      startBtnEl.setAttribute('disabled', true)
      let dateDifference = convertMs(setDate - new Date());

      daysEl.textContent = addLeadingZero(dateDifference.days);
      hoursEl.textContent = addLeadingZero(dateDifference.hours);
      minutesEl.textContent = addLeadingZero(dateDifference.minutes);
      secondsEl.textContent = addLeadingZero(dateDifference.seconds);
    } else {
      clearInterval(timerId);
      secondsEl.textContent = '00';
      startBtnEl.removeAttribute('disabled')
    }
  }, 1000);
});