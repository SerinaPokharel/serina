const contactForm = document.querySelector('#contact_form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#send');
const thanksMessage = document.querySelector('.thanks');
const spinner = document.querySelector('.spinner-border');
const charCounter = document.querySelector('.valid-feedback');

const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const API_URL = '<YOUR_FORM_URL_HERE>';

const warningClass = 'is-invalid';
const successClass = 'is-valid';

// function to add/remove classes
function setUpClasses(e, isValid) {
  const input = e.target;

  if (isValid) {
    input.classList.add(successClass);
    input.classList.remove(warningClass);
  } else {
    input.classList.add(warningClass);
    input.classList.remove(successClass);
  }
}

nameInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.length > 1 ? true : false);
  checkAllInputs();
});

emailInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.match(emailPattern) ? true : false);
  checkAllInputs();
});

subjectInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.length > 2 ? true : false);
  checkAllInputs();
});

messageInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.split(' ').length > 5 ? true : false);
  checkAllInputs();
  charCounter.textContent = `${messageInput.value.length} / 400`;
});

// disable submitButton if the inputs have not achieved the conditions
function checkAllInputs() {
  submitButton.disabled =
    nameInput.value.length > 1 &&
    emailInput.value.match(emailPattern) &&
    subjectInput.value.length > 2 &&
    messageInput.value.split(' ').length > 5
      ? false
      : true;
}

// Send Email
async function sendEmail(e) {
  e.preventDefault();
  submitButton.style.display = 'none';
  spinner.style.display = 'inline-block';
  let data = new FormData(contactForm);
  await fetch(API_URL, {
    method: 'POST',
    body: data
  });
  spinner.style.display = 'none';
  thanksMessage.style.display = 'block';
  e.target.reset();
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.classList.remove(successClass);
  });
}

contactForm.addEventListener('submit', sendEmail);

// clear form on load page
contactForm.reset();
