(function xAxisTicks() {
  xTicks = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {
    xTicks[i].style.left = `${20 + 105 * i}px`;
    xTicks[i].style.setProperty("--tick-text", `'${i}'`);
    if(i > 6)
      xTicks[i].style.setProperty("--tick-text-color", "green");
    else if(i > 3 && i < 7)
      xTicks[i].style.setProperty("--tick-text-color", "#e3c565");
  }
})();

function yAxisBarNums() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++)
    barDivs[i].style.setProperty("--bar-number", `"${i + 1}"`);
};
yAxisBarNums();

(function addBar() {
  xPlaneDiv = document.querySelector('.x-plane');
  addBarBtn = document.getElementById('add-bar-btn');
  blockerDiv = document.querySelector('.blocker');
  popUpDiv = document.querySelector('.pop-up');
  newBarVal = document.getElementById("new-bar-val");
  newBarLabel = document.getElementById("new-bar-label");
  popUpSubmitBtn = document.getElementById("pop-up-submit");
  popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  addBarBtn.onclick = () => {
    // newBarVal.value = "";
    popUpSubmitBtn.disabled = true;
    blockerDiv.style.display = 'block';
  }
  
  // acutal addition mechanism
  newBarVal.oninput = () => {
    newBarVal.value = newBarVal.value.replace(/[^0-9]/g, "");     // don't allow any text other than digits
    if(newBarVal.value === "")                                    // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      // can add warning on label PsE for invalid values
      newBarVal.value = newBarVal.value.replace(/1[1-9]+|[2-9][0-9]+|10[\d]+/g, newBarVal.value[0]);
      if(parseInt(newBarVal.value) > 0)
        popUpSubmitBtn.disabled = false;
    }
  } 

  popUpSubmitBtn.onclick = () => {
    bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = ""
    xPlaneDiv.appendChild(bar);
    yAxisBarNums();
    
    newBarVal.value = "";
    blockerDiv.style.display = 'none';
  }

  popUpCancelBtn.onclick = () => {
    blockerDiv.style.display = 'none';
  }
})();