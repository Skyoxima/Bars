import { CreateXAxisTicks } from "./xTicks.js";
// import { handleAddBarSubmit, newBarValLiveValidation } from "./addBarsEventHandlers.js";

export const xTicksSpans: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".x-ticks"),
  zerothXTPsn = xTicksSpans[0].getBoundingClientRect(),
  blockerDiv: HTMLDivElement = document.querySelector(".blocker"),
  addBarPopUp: HTMLDivElement = document.querySelector(".add-bar-pu"),
  barPlaneDiv: HTMLDivElement = document.querySelector("#bar-plane"),
  addBarBtn = document.getElementById("add-bar-btn"),
  newBarVal = document.getElementById("new-bar-val") as HTMLInputElement,
  newBarLabel = document.getElementById("new-bar-label") as HTMLInputElement,
  newBarColor = document.getElementById("bar-color-picker") as HTMLInputElement,
  popUpCancelBtn = document.getElementById(
    "pop-up-cancel"
  ) as HTMLButtonElement,
  popUpSubmitBtn = document.getElementById(
    "pop-up-submit"
  ) as HTMLButtonElement,
  tooltip = document.querySelector("#edit-bar-tooltip");

// Event Listeners
window.addEventListener("resize", () => {
  const xTicks: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".x-ticks"),                  // when the zeroth changes so do the others cause percentages have been used
    barDivs: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".bar");

  for (let i = 0; i < barDivs.length; i++) {
    barDivs[i].style.width = `${
      xTicks[
        parseFloat(barDivs[i].getAttribute("bar-value")) * 2
      ].getBoundingClientRect().left - xTicks[0].getBoundingClientRect().left
    }px`;
    //. * 2 makes the value correctly correspond to its index

    // keeps the bar number on within the y-axis - offsetLeft gives position relative to the parent which is what I wanted for 0th x-tick
    if (i < 9)
      barDivs[i].style.setProperty(
        "--bar-number-left",
        `${-(xTicks[0].offsetLeft + 5)}px`
      );
    if (i >= 9)
      barDivs[i].style.setProperty(
        "--bar-number-left",
        `${-(xTicks[0].offsetLeft + 3)}px`
      );
  }
});

// Functions
CreateXAxisTicks();

// Event Handlers
// A. Add Bar Button (brings up a pop-up)
addBarBtn.onclick = () => {
  tooltip.classList.remove("active-tooltip");
  popUpSubmitBtn.disabled = true;
  addBarPopUp.style.display = 'block';
  blockerDiv.style.display = 'block';
}

// B. Live Validation of value input in Add Bar Pop-up
// newBarVal.oninput = newBarValLiveValidation;
// popUpSubmitBtn.onclick = handleAddBarSubmit;

