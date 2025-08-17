const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const arraysOfSteps = [step1, step2, step3, step4];

import { countries } from './countries.js';

const desktopSteps = [
  document.getElementById('desktop-step-1'),
  document.getElementById('desktop-step-2'),
  document.getElementById('desktop-step-3'),
  document.getElementById('desktop-step-4')
];

let count = 0;

function validatePersonalInfo() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const country = document.getElementById('country').value.trim();
  
  if (!fullName || !email || !phone || !dob || !country) {
    return false;
  }
  
  const dobYear = new Date(dob).getFullYear();
  if (dobYear >= 2008) {
    alert('You must be at least 18 years old to register.');
    return false;
  }
  
  return true;
}

function setActiveStep(index) {
  desktopSteps.forEach((step, i) => {
    const circle = step.querySelector('div.w-12');
    const title = step.querySelector('div.text-white.font-semibold');

    if (i === index) {
      circle.classList.remove('step-inactive');
      circle.classList.add('step-active');
      title.classList.remove('opacity-70');
    } else {
      circle.classList.remove('step-active');
      circle.classList.add('step-inactive');
      title.classList.add('opacity-70');
    }
  });


  updateMobileProgress(index);
}

function updateMobileProgress(stepIndex) {
  const mobileStepCounter = document.getElementById('mobile-step-counter');
  const mobileProgress = document.getElementById('mobile-progress');
  
  if (mobileStepCounter && mobileProgress) {
    mobileStepCounter.textContent = `Step ${stepIndex + 1} of 4`;
    mobileProgress.style.width = `${((stepIndex + 1) / 4) * 100}%`;
  }
}

function nextStep() {
  if (count === 0 && !validatePersonalInfo()) {
    alert('Please complete all required fields before proceeding.');
    return;
  }
  
  if (count < arraysOfSteps.length - 1) {
    arraysOfSteps[count].classList.add('hidden');
    count++;
    arraysOfSteps[count].classList.remove('hidden');
    setActiveStep(count);
  }
}

function prevStep() {
  if (count > 0) {
    arraysOfSteps[count].classList.add('hidden');
    count--;
    arraysOfSteps[count].classList.remove('hidden');
    setActiveStep(count);
  }
}

function loadCountries() {
  const select = document.getElementById("country");
  
  if (select && select.options.length <= 1) {
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  }
}


window.nextStep = nextStep;
window.prevStep = prevStep;

loadCountries();
setActiveStep(count);