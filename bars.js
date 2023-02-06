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

(function yAxisBarNums() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++)
    barDivs[i].style.setProperty("--bar-number", `"${i + 1}"`);
})();

(function addBar() {
  addBarBtn = document.getElementById('addBarBtn');
  blockerDiv = document.querySelector('.blocker');
  popUpDiv = document.querySelector('.pop-up');
  newBarTxt = document.getElementById("new-bar-val");
  popUpSubmitBtn = document.getElementById("pop-up-submit");

  addBarBtn.onclick = () => {
    blockerDiv.style.display = 'block';
  }
  
  newBarTxt.oninput = () => {
    newBarTxt.value = newBarTxt.value.replace(/[^0-9]/g, "");
    // add positive lookahead for next digits, (only 0 allowed after 1 and nothing allowed after 2-9)
    if(parseInt(newBarTxt.value) > 0) {
      popUpSubmitBtn.disabled = false;
    }
  } 

  popUpSubmitBtn.onclick = () => {
    blockerDiv.style.display = 'none';
  }
})();