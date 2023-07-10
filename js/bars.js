// <========================================= Editing Bars (Tooltip) Functionality =========================================>
function editBars(ev) {
  const editBarDiv = document.getElementById("edit-bar-tooltip"),
        closeIcon = document.getElementById("close-edit"),
        confirmIcon = document.getElementById("confirm-edit"),
        deleteIcon = document.getElementById("delete-bar"),
        labelChangeTxt = document.getElementById("change-label"),
        colorInput = document.getElementById("edit-color-swatch");

  editBarDiv.style.left = `${ev.pageX}px`;      //! have to consider the whole page
  editBarDiv.style.top = `${ev.pageY}px`;
  editBarDiv.classList.add("active-tooltip");
  
  deleteIcon.onclick = (e) => {
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
    ev.target.remove();
  }
  
  confirmIcon.onclick = (e) => {
    // ev is accessible because of function closure i.e editBars is HOF because of this function
    ev.target.style.backgroundColor = colorInput.value;
    if(labelChangeTxt.value == "-") {
      ev.target.style.setProperty("--stands-for-text", `""`);
    } else if(labelChangeTxt.value != "") {
      ev.target.style.setProperty("--stands-for-text", `"${labelChangeTxt.value}"`);
    }
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
  }
  
  closeIcon.onclick = () => {
    labelChangeTxt.value = ""; 
    editBarDiv.classList.remove("active-tooltip");
  }
}

// <========================================= Removing All Bars Functionality =========================================>
const removeAllBars = () => {
  const barPlaneDiv = document.getElementById("bar-plane");
  barPlaneDiv.innerHTML = null;
}

// <========================================= Saving/Downloading Functionality =========================================>
(function saveBars() {
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
    
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    saveBarsBtn.href = 'data:' + data;
    saveBarsBtn.download = 'SaveBars.json';
});
})();

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
    const barWidth = iXTickPsn.left - zXTickPsn.left;
    bar.style.width = `${barWidth}px`;
    barPlaneDiv.appendChild(bar);
    barPlaneDiv.lastChild.animate(
      [
        {width: "0px", opacity: 0},
        {width: `${barWidth}px`, opacity: 1}
      ], {
        duration: 1500,
        iterations: 1,
        easing: "ease-out",
        delay: i * 100,
        fill: "backwards"
      }
      );
      // adding a listener to divs added from this method, I intended for dblclick but it's not happening on laptop so fellback to click
    barPlaneDiv.lastChild.addEventListener("click", editBars);
    yAxisBarIndxAndVal();
  }
  loadBarFiles.value = null                                                                // once the file has been read, delete it
}