import { countries } from './countries.js';


const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const mainForm = document.getElementById('form');
const tradingDashboard = document.getElementById('trading-dashboard');


const arraysOfSteps = [step1, step2, step3, step4];
const desktopSteps = [
  document.getElementById('desktop-step-1'),
  document.getElementById('desktop-step-2'),
  document.getElementById('desktop-step-3'),
  document.getElementById('desktop-step-4')
];
let count = 0;


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

function validatePersonalInfo() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const country = document.getElementById('country').value.trim();
  const username = document.getElementById('username').value.trim();
  
  document.getElementById('dashboard-username').textContent= username.toUpperCase()
  const firstTwo = username.slice(0, 2).toUpperCase()
  document.getElementById("dashboard-short").textContent = firstTwo

if (!fullName || !email || !phone || !dob || !country || !username) {
  return false;
}

 
  const dobYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();

  if (currentYear - dobYear < 18) {
    alert('You must be at least 18 years old to register.');
    return false;
  }
  
  return true;
}


const beginerLevel = document.getElementById('beginer');
const intermidiateLevel = document.getElementById('intermidiate');
const advancedLevel = document.getElementById('advanced');
const tradingExperience = [beginerLevel, intermidiateLevel, advancedLevel];

const highlightMap = {
  beginer: "bg-orange-400",
  intermidiate: "bg-pink-400",
  advanced: "bg-blue-400"
};

tradingExperience.forEach(level => {
  level.addEventListener("click", function (e) {
    tradingExperience.forEach(toggle => {
      toggle.classList.remove(...Object.values(highlightMap));
      toggle.classList.remove('selected');
    });
    e.currentTarget.classList.add(highlightMap[e.currentTarget.id]);
    e.currentTarget.classList.add('selected');
    const levelName = e.currentTarget.querySelector("h3").textContent;
    document.getElementById('dashboard-level').textContent = `${levelName}`
  });
});

function validateCapital(){
  const capitalToInvest = document.getElementById('capital').value.trim();
  const selectedExperience = document.querySelector('#trading-experience .selected');
  if(!capitalToInvest || !selectedExperience){
    return false;
  } 
  return true;
}


const twoFA = document.getElementById('2FA');
const coldWallet = document.getElementById('cold-wallet');
const advancedPortfolio = document.getElementById('analytics');
const securitySelected = [twoFA, coldWallet, advancedPortfolio];

const securityFeatures = [
  {
    id: "2FA",
    name: "Two-Factor Authentication",
    price: 1,
    icon: "fas fa-mobile-alt"
  },
  {
    id: "cold-wallet",
    name: "Hardware Wallet Integration",
    price: 5,
    icon: "fas fa-usb"
  },
  {
    id: "analytics",
    name: "Advanced Portfolio Analytics",
    price: 15,
    icon: "fas fa-analytics"
  }
];

const featuresSelected = document.getElementById('features-selected');
let addOnPrice = 0;

securitySelected.forEach(security => {
  security.addEventListener("change", function(e){
    const selectedFeature = securityFeatures.find(
      feature => feature.id === e.target.closest("div[id]").id);

    if(e.target.checked && selectedFeature){
      addOnPrice += selectedFeature.price;
      const div = document.createElement("div");
      div.id = `selected-${selectedFeature.id}`;
      div.className = "flex justify-between items-center";
      div.innerHTML = `
        <span><i class="${selectedFeature.icon}"></i> ${selectedFeature.name}</span>
        <span class="text-green-600 font-medium">+$${selectedFeature.price}/mo</span>
      `;
      featuresSelected.appendChild(div);

    } else if (!e.target.checked && selectedFeature) {
      addOnPrice -= selectedFeature.price;
      const toRemove = document.getElementById(`selected-${selectedFeature.id}`)
      if(toRemove){
        toRemove.remove()
      }
    }
    
    const currentPlan = planPrice[currentPlanIndex];
    document.getElementById('total-price').textContent = `${currentPlan.price + addOnPrice}`;
  });
});


const planPrice = [
  { name: "Premium Basic", price: 7, icon: "fas fa-leaf" },
  { name: "Premium", price: 10, icon: "fas fa-gem" },
  { name: "Premium Plus", price: 15, icon: "fas fa-crown" }
];
let currentPlanIndex = 0; 

function renderPlan(index) { 
  const plan = planPrice[index];

  document.getElementById("plan-info").innerHTML = `
    <h3 class="font-semibold text-gray-900 flex items-center">
      <i class="${plan.icon} mr-2 text-indigo-600"></i>${plan.name} (Monthly)
    </h3>
    <button id="change-plan" class="text-indigo-600 text-sm font-medium hover:text-indigo-800 underline">
      Change
    </button>
  `;
  
  document.getElementById("premium-price").textContent = plan.price;

  document.getElementById('change-plan').addEventListener('click', function(){
  currentPlanIndex = (currentPlanIndex + 1) % planPrice.length;
  renderPlan(currentPlanIndex)
 
  })
   document.getElementById('total-price').textContent = `${plan.price + addOnPrice }`

}


const validators = {
  0: validatePersonalInfo,
  1: validateCapital,
};


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
  if (validators[count] && !validators[count]()) {
    alert("Please complete all required fields before proceeding.");
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


document.getElementById('start-trading').addEventListener('click', () =>{
  mainForm.classList.add('hidden');
  document.getElementById('loading-screen').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    tradingDashboard.classList.remove('hidden');
  }, 5000); 
});




window.nextStep = nextStep;
window.prevStep = prevStep;


loadCountries();
setActiveStep(count);
renderPlan(currentPlanIndex);