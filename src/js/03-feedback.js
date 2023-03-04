const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name = "email"]'),
  message: document.querySelector('textarea[name = "message"]'),
};
const STORAGE_KEY = 'feedback-form-state';
const { form, email, message } = refs;

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

reloadPage();

function onFormInput(e) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email.value, message: message.value })
  );
}

function onFormSubmit(e) {
  e.preventDefault();
  if (!message.value || !email.value) {
    alert('Заповніть всі поля');
  } else {
    const currentString = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('Поточне значення форми:', currentString);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function reloadPage() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    console.log(savedMessage);
    email.value = savedMessage.email;
    message.value = savedMessage.message;
  }
}
