import { newBarVal, popUpSubmitBtn, newBarColor, newBarLabel, barPlaneDiv, xTicksSpans, zerothXTPsn, addBarPopUp, blockerDiv, popUpCancelBtn } from './index';
// import { yAxisBarIndxAndVal } from "./yAxisIndxAndVal";

export function newBarValLiveValidation() {
  if(newBarVal.value === "")             // disable the add button for all invalid inputs i.e no value to set to
    popUpSubmitBtn.disabled = true;
  else {
    newBarVal.value = newBarVal.value.replace(/[^0-9\.]|1[^0\.]|[2-9]\d|10.|0[^\.]|^\.|\.[^5]+|\.5.+/g, "");   
    popUpSubmitBtn.disabled = false;
  }
}
// [^0-9\.] → don't allow any text other than digits and decimal
// 1[^0\.] → 1 should not be followed by anything(number) except 0 or a decimal point
// [2-9]\d → 2-9 should not be followed by any number
// 10. → 10 should not be followed by anything
// 0[^\.] → 0 should not be followed by anything except decimal
// ^\. → . cannot be at the start of the string
// \.[^5]+ → decimal should not be followed by anything except 5 (5 can be only once)
// \.5.+ → .5 should not be followed by anything
// With the entered data, adding the new bar on the canvas when submit is clicked

export function handleAddBarSubmit() {
  let bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.background = newBarColor.value === "#ffffff" ? "#FAFAFA" : newBarColor.value;       // to not make the new bar invisible on board's hovering
  bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
  bar.setAttribute("bar-value", newBarVal.value);
  bar.setAttribute("bar-number", `${barPlaneDiv.childElementCount}`);

  let iXTickPsn = xTicksSpans[parseFloat(newBarVal.value) * 2].getBoundingClientRect();          // * 2 adjusts the mid values correctly too
  const barWidth = iXTickPsn.left - zerothXTPsn.left;
  bar.style.width = `${barWidth}px`;
  barPlaneDiv.appendChild(bar);
  bar.animate(
    [
      {width: "0px", opacity: 0},
      {width: `${barWidth}px`, opacity: 1}
    ], {
      duration: 1500,
      iterations: 1,
      easing: "ease-out"
    }
  );
  // barPlaneDiv.lastChild.addEventListener("click", editBars);      // for editing tool tip
  // yAxisBarIndxAndVal();                                           // on every bar added the function is run again...
  
  // reset the pop-up field before finalising the submit, keeps it ready for next new bars
  newBarVal.value = "";
  newBarLabel.value = "";
  newBarColor.value = "#ffc0cb";
  addBarPopUp.style.display = 'none';
  blockerDiv.style.display = 'none';
}

popUpCancelBtn.onclick = () => {
  addBarPopUp.style.display = 'none';
  blockerDiv.style.display = 'none';
}