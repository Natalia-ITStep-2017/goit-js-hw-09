function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtnEl = document.querySelector("button[data-start]");
const stopBtnEl = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector("body");
bodyEl.style.textAlign = "center";

let timerId = null;
stopBtnEl.setAttribute("disabled", true);

startBtnEl.addEventListener("click", (event) => {
  event.target.setAttribute("disabled", true);
  stopBtnEl.removeAttribute("disabled");
   
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
  }, 1000);
});

stopBtnEl.addEventListener("click", (event) => {
   clearInterval(timerId);
   event.target.setAttribute("disabled", true);
   startBtnEl.removeAttribute("disabled");
});
