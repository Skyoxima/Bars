// <========================================= Forming the X-axis Ticks Functionality =========================================>
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

// <========================================= Indexing the Bars Functionality =========================================>
function yAxisBarNums() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++) {
    barDivs[i].style.setProperty("--bar-number", `"${i + 1}"`);
    if(i >= 9)
      barDivs[i].style.setProperty("--bar-index-left", "-20px");
  }
};
yAxisBarNums();

// <========================================= Adding a Bar Functionality =========================================>
(function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks');
  const zXTickPsn = xTicksSpans[0].getBoundingClientRect();          // z ~ zero-th
  const barPlaneDiv = document.querySelector('#bar-plane');
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
    bar.style.background = newBarColor.value;
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    bar.style.setProperty("--bar-value", parseInt(newBarVal.value));
    
    //TODO: adjust bar width on magnifications, i.e make bars responsive
    
    let iXTickPsn = xTicksSpans[parseInt(newBarVal.value)].getBoundingClientRect();
    bar.style.width = `${iXTickPsn.left - zXTickPsn.left}px`
    barPlaneDiv.appendChild(bar);
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


// <========================================= Removing Bars Functionality =========================================>

// Removing all bars
const removeAllBars = () => {
  const barPlane = document.getElementById("bar-plane");
  barPlane.innerHTML = null;
}

// <========================================= Saving Functionality =========================================>
let saveBarsBtn = document.getElementById('save-bars-btn');
saveBarsBtn.addEventListener("click", () => {
    barDivs = document.querySelectorAll('.bar');
    obj = { 
      allBars: [] 
    };

    for(let i = 0; i < barDivs.length; i++) {
      obj.allBars.push(
        {
          barValue: window.getComputedStyle(barDivs[i]).getPropertyValue("--bar-value"),
          barColor: window.getComputedStyle(barDivs[i]).getPropertyValue("background-color"),
          barLabel: window.getComputedStyle(barDivs[i]).getPropertyValue('--stands-for-text'),
        }
      )
    }
    // console.log(obj.allBars);
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    saveBtn = document.getElementById("save-bars-btn");
    saveBtn.href = 'data:' + data;
    saveBtn.download = 'SaveBars.json';
});

// <========================================= Loading Functionality =========================================>
const loadBarFiles = document.getElementById("load-bars-file");
// const loadBarsBtn = document.getElementById("load-bars-btn-cover");
loadBarFiles.onchange = async () => {
  console.log("Onchange invoked");
  const loadedBars = await new Response(loadBarFiles.files[0]).json()                       //! understand this line...
  const xTicksSpans = document.querySelectorAll('.x-ticks');
  const zXTickPsn = xTicksSpans[0].getBoundingClientRect();
  const barPlaneDiv = document.querySelector('#bar-plane');
  removeAllBars();      // clear the screen before loading the uploaded bars

  for(let i = 0; i < loadedBars.allBars.length; i++) {
    bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = loadedBars.allBars[i].barColor;
    bar.style.setProperty("--stands-for-text", loadedBars.allBars[i].barLabel);
    bar.style.setProperty("--bar-value", loadedBars.allBars[i].barValue);
    
    let iXTickPsn = xTicksSpans[loadedBars.allBars[i].barValue].getBoundingClientRect();
    bar.style.width = `${iXTickPsn.left - zXTickPsn.left}px`
    barPlaneDiv.appendChild(bar);
    yAxisBarNums();
  }
  loadBarFiles.value = null       // once the file has been read, remove its contents
}