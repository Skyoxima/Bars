// <========================================= Forming the X-axis Ticks Functionality =========================================>
(function CreateXAxisTicks() {
  xTicks = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {
    xTicks[i].style.left = `${1.75 + 4.75 * i}%`;
    xTicks[i].style.setProperty("--tick-text", `'${i / 2}'`);
    if(i / 2 > 6)
      xTicks[i].style.setProperty("--tick-text-color", "green");
    else if(i / 2 > 3 && i / 2 < 7)
      xTicks[i].style.setProperty("--tick-text-color", "#e3c565");
  }
})();

// <========================================= Adjusting the bar width whenever xTicks change =========================================>
(function adjustBarWidths() {
  window.addEventListener("resize", () => {
    const xTicks = document.querySelectorAll(".x-ticks"),   // when the zeroth changes so do the others cause percentages have been used
          barDivs = document.querySelectorAll(".bar");
    for(let i = 0; i < barDivs.length; i++) {
      barDivs[i].style.width = `${xTicks[parseFloat(barDivs[i].getAttribute("bar-value")) * 2].getBoundingClientRect().left - xTicks[0].getBoundingClientRect().left}px`;
      //. * 2 makes the value correctly correspond to its index 
    }
  });
})();

// <========================================= Indexing the Bars Functionality =========================================>
function yAxisBarIndxAndVal() {
  barDivs = document.querySelectorAll('.bar');
  for(let i = 0; i < barDivs.length; i++) {
    const barValue = parseFloat(barDivs[i].getAttribute("bar-value"));
    // barDivs[i].style.setProperty("--bar-number", `"${i + 1}"`);
    barDivs[i].innerHTML = `<span>${barValue}</span>`;
    
    if((barValue * 2) % 2 == 1)                                   // if decimal value
      barDivs[i].firstChild.style.right = "-25px";

    if(barValue == 10)
      barDivs[i].firstChild.style.right = "-18px";

    if(i >= 9)
      barDivs[i].style.setProperty("--bar-index-left", "-20px");
  }
};
yAxisBarIndxAndVal();

// <========================================= Adding a Bar Functionality =========================================>
(function addBar() {
  const xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),          // z ~ zero-th
        blockerDiv = document.querySelector('.blocker'),
        addBarPopUp = document.querySelector('.add-bar-pu'),
        barPlaneDiv = document.querySelector('#bar-plane'),
        addBarBtn = document.getElementById('add-bar-btn'),
        newBarVal = document.getElementById("new-bar-val"),
        newBarLabel = document.getElementById("new-bar-label"),
        newBarColor = document.getElementById("bar-color-picker"),
        popUpSubmitBtn = document.getElementById("pop-up-submit"),
        popUpCancelBtn = document.getElementById("pop-up-cancel");
  
  addBarBtn.onclick = () => {
    popUpSubmitBtn.disabled = true;
    addBarPopUp.style.display = 'block'
    blockerDiv.style.display = 'block';

  }
  
  // validation of inputs
  newBarVal.oninput = () => {
    newBarVal.value = newBarVal.value.replace(/[^0-9\.]/g, "");                 // don't allow any text other than digits and decimal
    if(newBarVal.value === "")                                                  // disable the add button for all invalid inputs i.e no value to set to
      popUpSubmitBtn.disabled = true;
    else {
      newBarVal.value = newBarVal.value.replace(/1[^0]|[2-9]\d|10[0-9]|0[^\.]|^\.|\.[^5]+|\.5.+/g, "");   
      popUpSubmitBtn.disabled = false;
    }
  } 
  // 1[^0] -> 1 should not be followed by anything(number) except 0
  // [2-9]\d -> 2-9 should not be followed by any number
  // 10[0-9] -> 10 should not be followed by anything
  // 0[^\.] -> 0 should not be followed by anything except decimal
  // ^\. -> . cannot be at the start of the string
  // \.[^5]+ -> decimal should not be followed by anything except 5
  // \.5.+ -> .5 should not be followed by anything 

  
  // using the field data to construct the bar
  popUpSubmitBtn.onclick = () => {
    bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = newBarColor.value;
    bar.style.setProperty("--stands-for-text", `"${newBarLabel.value}"`);
    bar.setAttribute("bar-value", newBarVal.value);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount + 1);

    let iXTickPsn = xTicksSpans[parseFloat(newBarVal.value) * 2].getBoundingClientRect();         // * 2 adjusts the mid values correctly too
    bar.style.width = `${iXTickPsn.left - zXTickPsn.left}px`;
    barPlaneDiv.appendChild(bar);
    barPlaneDiv.lastChild.addEventListener("click", editBars);
    yAxisBarIndxAndVal();
    
    newBarVal.value = "";
    newBarLabel.value = "";
    newBarColor.value = "#ffc0cb";
    blockerDiv.style.display = 'none';
  }

  popUpCancelBtn.onclick = () => {
    blockerDiv.style.display = 'none';
    addBarPopUp.style.display = 'none';
  }
})();

// <========================================= Editing Bars Functionality =========================================>
function editBars(ev) {
  const editBarDiv = document.getElementById("edit-bar-tooltip");
  // null error

  editBarDiv.style.left = `${ev.clientX}px`;
  editBarDiv.style.top = `${ev.clientY}px`;
  editBarDiv.style.display = "block";
}

// <========================================= Removing Bars Functionality =========================================>
// Removing all bars
const removeAllBars = () => {
  const barPlaneDiv = document.getElementById("bar-plane");
  barPlaneDiv.innerHTML = null;
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
          barValue: parseFloat(barDivs[i].getAttribute("bar-value")),
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
loadBarFiles.onchange = async () => {
  const loadedBars = await new Response(loadBarFiles.files[0]).json(),                       //! understand this line...
        xTicksSpans = document.querySelectorAll('.x-ticks'),
        zXTickPsn = xTicksSpans[0].getBoundingClientRect(),
        barPlaneDiv = document.querySelector('#bar-plane');
  removeAllBars();                                                                         // clear the screen before loading the uploaded bars

  for(let i = 0; i < loadedBars.allBars.length; i++) {
    bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = loadedBars.allBars[i].barColor;
    bar.style.setProperty("--stands-for-text", loadedBars.allBars[i].barLabel);
    bar.setAttribute("bar-value", loadedBars.allBars[i].barValue);
    bar.setAttribute("bar-number", barPlaneDiv.childElementCount + 1);
    
    let iXTickPsn = xTicksSpans[loadedBars.allBars[i].barValue * 2].getBoundingClientRect();
    bar.style.width = `${iXTickPsn.left - zXTickPsn.left}px`
    barPlaneDiv.appendChild(bar);

    // adding a listener to divs added from this method, I intended for dblclick but it's not happening on laptop so fellback to click
    barPlaneDiv.lastChild.addEventListener("click", editBars);
    yAxisBarIndxAndVal();
  }
  loadBarFiles.value = null                                                                // once the file has been read, remove its contents
}