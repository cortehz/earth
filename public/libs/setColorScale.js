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
increaseButton.innerHTML = `Current Speed ${
  multiplicator !== null || undefined ? `x${multiplicator}` : ""
}`;

["change", "keyup"].forEach((evt) =>
  increase.addEventListener(evt, updateValue, false)
);

function updateValue(e) {
  window.localStorage.setItem("multiplicator", e.target.value);
  let multiplicator = window.localStorage.getItem("multiplicator");
  increaseButton.innerHTML = `Current Speed ${
    multiplicator !== null || undefined
      ? `x${multiplicator}`
      : `x${e.target.value}`
  }`;
}
