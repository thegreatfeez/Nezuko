const step1 = document.getElementById('step-1')
const step2 = document.getElementById('step-2')
const step3 = document.getElementById('step-3')
const step4 = document.getElementById('step-4')
const arraysOfSteps = [step1, step2, step3, step4]

const desktopSteps = [
  document.getElementById('desktop-step-1'),
  document.getElementById('desktop-step-2'),
  document.getElementById('desktop-step-3'),
  document.getElementById('desktop-step-4')
]

let count = 0 



function setActiveStep(index) {
  desktopSteps.forEach((step, i) => {
    const circle = step.querySelector('div.w-12') 
    const title = step.querySelector('div.text-white.font-semibold')

    if (i === index) {
      circle.classList.remove('step-inactive')
      circle.classList.add('step-active')

      title.classList.remove('opacity-70')
    } else {
      circle.classList.remove('step-active')
      circle.classList.add('step-inactive')

      title.classList.add('opacity-70')
    }
  })
}

function nextStep() {
  if (count < arraysOfSteps.length - 1) {
    arraysOfSteps[count].classList.add('hidden')
    count++
    arraysOfSteps[count].classList.remove('hidden')
    setActiveStep(count)
  }
}

function prevStep() {
  if (count > 0) {
    arraysOfSteps[count].classList.add('hidden')
    count--
    arraysOfSteps[count].classList.remove('hidden')
    setActiveStep(count)
  }
}

setActiveStep(count)