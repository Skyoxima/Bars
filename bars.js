(function CreateXAxisTicks() {
  xTicks = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {
    xTicks[i].style.left = `${1.75 + 9 * i}%`;
    xTicks[i].style.setProperty("--tick-text", `'${i}'`);
    if(i > 6)
      xTicks[i].style.setProperty("--tick-text-color", "green");
    else if(i > 3 && i < 7)
      xTicks[i].style.setProperty("--tick-text-color", "#e3c565");
  }
})();

function yAxisBarNums() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++) {
    barDivs[i].style.setProperty("--bar-number", `"${i + 1}"`);
    if(i >= 9)
      barDivs[i].style.setProperty("--bar-index-left", "-22px");
  }
};
yAxisBarNums();

(function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks');
  const zXTickPsn = xTicksSpans[0].getBoundingClientRect();          // z ~ zero-th
  const xPlaneDiv = document.querySelector('.bar-plane');
  const addBarBtn = document.getElementById('add-bar-btn');
  const blockerDiv = document.querySelector('.blocker');
  const newBarVal = document.getElementById("new-bar-val");
  const newBarLabel = document.getElementById("new-bar-label");
  const newBarColor = document.getElementById("bar-color-picker");
  const popUpSubmitBtn = document.getElementById("pop-up-submit");
  const popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  addBarBtn.onclick = () => {
    popUpSubmitBtn.disabled = true;
    blockerDiv.style.display = 'block';
  }
  
  // validation of inputs
  newBarVal.oninput = () => {
    newBarVal.value = newBarVal.value.replace(/[^0-9]/g, "");     // don't allow any text other than digits
    if(newBarVal.value === "")                                    // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      newBarVal.value = newBarVal.value.replace(/1[1-9]+|[2-9][0-9]+|10[\d]+/g, newBarVal.value[0]);
      popUpSubmitBtn.disabled = false;
    }
  } 

  // using the field data to construct the bar
  popUpSubmitBtn.onclick = () => {
    bar = document.createElement('div');
    bar.className = 'bar';
    // bar.style.backgroundImage = "linear-gradient(to right, " + newBarColor.value + " 96%, transparent)";  // do NOT supply the ; in CSS
    bar.style.background = newBarColor.value;
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    let iXTickPsn = xTicksSpans[parseInt(newBarVal.value)].getBoundingClientRect();
    bar.style.width = `${iXTickPsn.left - zXTickPsn.left}px`
    xPlaneDiv.appendChild(bar);
    yAxisBarNums();
    
    newBarVal.value = "";
    newBarLabel.value = "";
    newBarColor.value = "#ffc0cb";
    blockerDiv.style.display = 'none';
  }

  popUpCancelBtn.onclick = () => {
    blockerDiv.style.display = 'none';
  }
})();