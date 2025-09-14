import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/bi_x-octagon.svg';

const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate;

const fp = flatpickr(myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      startBtn.disabled = true;
      return iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgba(207, 15, 15, 1)',
        position: 'topRight',
        width: 302,
        messageColor: 'white',
        iconUrl: errorIcon,
        theme: 'dark',
        close: false,
      });
    }
    startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', handlerClick);
function handlerClick() {
  myInput.disabled = true;
  startBtn.disabled = true;
  const id = setInterval(() => {
    const diff = userSelectedDate - new Date();
    if (diff < 0) {
      clearInterval(id);
      myInput.disabled = false;
      return;
    }
    const timeDiff = convertMs(diff);
    dataDays.textContent = addLeadingZero(timeDiff.days);
    dataHours.textContent = addLeadingZero(timeDiff.hours);
    dataMinutes.textContent = addLeadingZero(timeDiff.minutes);
    dataSeconds.textContent = addLeadingZero(timeDiff.seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
  return String(number).padStart(2, '0');
}