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
