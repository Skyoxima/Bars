import { CreateXAxisTicks } from "./xTicks.js";
// import { handleAddBarSubmit, newBarValLiveValidation } from "./addBarsEventHandlers.js";
export const xTicksSpans = document.querySelectorAll(".x-ticks"), zerothXTPsn = xTicksSpans[0].getBoundingClientRect(), blockerDiv = document.querySelector(".blocker"), addBarPopUp = document.querySelector(".add-bar-pu"), barPlaneDiv = document.querySelector("#bar-plane"), addBarBtn = document.getElementById("add-bar-btn"), newBarVal = document.getElementById("new-bar-val"), newBarLabel = document.getElementById("new-bar-label"), newBarColor = document.getElementById("bar-color-picker"), popUpCancelBtn = document.getElementById("pop-up-cancel"), popUpSubmitBtn = document.getElementById("pop-up-submit"), tooltip = document.querySelector("#edit-bar-tooltip");
// Event Listeners
window.addEventListener("resize", () => {
    const xTicks = document.querySelectorAll(".x-ticks"), // when the zeroth changes so do the others cause percentages have been used
    barDivs = document.querySelectorAll(".bar");
    for (let i = 0; i < barDivs.length; i++) {
        barDivs[i].style.width = `${xTicks[parseFloat(barDivs[i].getAttribute("bar-value")) * 2].getBoundingClientRect().left - xTicks[0].getBoundingClientRect().left}px`;
        //. * 2 makes the value correctly correspond to its index
        // keeps the bar number on within the y-axis - offsetLeft gives position relative to the parent which is what I wanted for 0th x-tick
        if (i < 9)
            barDivs[i].style.setProperty("--bar-number-left", `${-(xTicks[0].offsetLeft + 5)}px`);
        if (i >= 9)
            barDivs[i].style.setProperty("--bar-number-left", `${-(xTicks[0].offsetLeft + 3)}px`);
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
};
// B. Live Validation of value input in Add Bar Pop-up
// newBarVal.oninput = newBarValLiveValidation;
// popUpSubmitBtn.onclick = handleAddBarSubmit;
