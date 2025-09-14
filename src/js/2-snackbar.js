import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/bi_check2-circle.svg';
import errorIcon from '../img/bi_x-octagon.svg';

const form = document.querySelector('.form');
const label = document.querySelector('.form-input');
const fieldset = document.querySelector('.form-fieldset');

form.addEventListener('submit', hadlerSubmit);

function hadlerSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const delay = +formData.get('delay');
  const state = formData.get('state');
  label.disabled = true;
  fieldset.disabled = true;
  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`${delay}`);
      } else {
        reject(`${delay}`);
      }
    }, delay);
  });

  prom
    .then(value => {
      iziToast.show({
        message: `Fulfilled promise in ${value}ms`,
        backgroundColor: '#59a10d',
        position: 'topRight',
        width: 383,
        messageColor: '#ff',
        theme: 'dark',
        close: false,
        messageSize: '16',
        iconUrl: okIcon,
      });
    })
    .catch(error => {
      iziToast.show({
        message: ` Rejected promise in ${error}ms`,
        backgroundColor: '#ef4040',
        position: 'topRight',
        width: 383,
        messageColor: 'white',
        theme: 'dark',
        close: false,
        messageSize: '16',
        iconUrl: errorIcon,
      });
    })
    .finally(() => {
      setTimeout(() => {
        form.reset();
        label.disabled = false;
        fieldset.disabled = false;
      }, 5000);
    });
}