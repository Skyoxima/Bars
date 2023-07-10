export function yAxisBarIndxAndVal() {
    const barDivs = document.querySelectorAll('.bar');
    for (let i = 0; i < barDivs.length; i++) {
        const barValue = parseFloat(barDivs[i].getAttribute("bar-value"));
        barDivs[i].innerHTML = `<span>${barValue}</span>`;
        // adjusting the text representation for the bar value calc. above inside the div
        if ((barValue * 2) % 2 == 1) // if decimal value
            barDivs[i].firstChild.style.right = "-25px";
        if (i >= 9)
            barDivs[i].style.setProperty("--bar-number-left", "-20px");
        if (barValue == 10)
            barDivs[i].firstChild.style.right = "-18px";
    }
}
;
