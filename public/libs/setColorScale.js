//logic for showing scale form
let scaleButton = document.querySelector(".adjust_scale");
let scale_container = document.querySelector(".scale_container");

scaleButton.addEventListener("click", function () {
  scale_container.classList.toggle("scale_container_open");
});

document.onload = function () {
  scale_container.classList.remove("scale_container_open");
};

document.addEventListener("click", (evt) => {
  const flyoutElement = document.querySelector(".main_scale_container");
  let targetElement = evt.target; // clicked element

  do {
    if (targetElement === flyoutElement) {
      // This is a click inside. Do nothing, just return.

      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);

  // This is a click outside. Close the flyout.
  scale_container.classList.remove("scale_container_open");
});

//increase current speeds
let increase = document.querySelector("#animate-speed");
let increaseButton = document.querySelector(".increase_speed");

const multiplicator = window.localStorage.getItem("multiplicator");
increaseButton.innerHTML = `Increase Speed`;

["change", "keyup"].forEach((evt) =>
  increase.addEventListener(evt, updateValue, false)
);

//update value
function updateValue(e) {
  window.localStorage.setItem("multiplicator", e.target.value);
  increaseButton.innerHTML = `Increase Speed ${`x${e.target.value}`}`;
}

//select date for data
const selectElement = document.querySelector("#date-select");
const yearValue = window.localStorage.getItem("currentYear");
const selectedOption = document.querySelector("#selected_year");

//fetch data years from folder with node API
fetch("/getyears")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.dataYears.map((year) => {
      let option = document.createElement("option");
      option.value = year;
      option.innerHTML = year;
      selectElement.appendChild(option);
    });
  });

selectedOption.innerHTML = `${yearValue ? yearValue : "1950"}`;

selectElement.addEventListener("change", (event) => {
  window.localStorage.setItem("currentYear", event.target.value);
  location.reload();
});

//only show current multiplier when ocean highlighted
const oceanMode = document.querySelector("#ocean-mode-enable");
const speedMultiplierForm = document.querySelector("#multiplier");
const oceanModeButtonss = document.querySelector(".speed-value");

oceanModeButtonss.textContent = `x${multiplicator}`;
oceanMode.addEventListener("click", function () {
  if (oceanMode.classList.contains("highlighted")) {
    speedMultiplierForm.style.display = "none";
  }
});
