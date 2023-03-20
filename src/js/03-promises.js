import Notiflix from 'notiflix'


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
  })
}

const formEl =  document.querySelector(".form");

function handleSubmit(event) {
  event.preventDefault();
  
  const {
    elements: { delay, step, amount}
  } = event.currentTarget;

  const firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPrm = Number(amount.value);
  
  for (let position = 0; position < amountPrm; position++) {
     createPromise(position+1, firstDelay + stepDelay*position)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

formEl.addEventListener("submit", handleSubmit);



