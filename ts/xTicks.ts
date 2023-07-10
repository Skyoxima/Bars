export function CreateXAxisTicks() {
  const xTicks: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".x-ticks");

  for(let i = 0; i < xTicks.length; i++) {
    xTicks[i].style.left = `${1.75 + 4.75 * i}%`;
    xTicks[i].style.setProperty("--tick-text", `'${i / 2}'`);
    if(i / 2 > 6)
      xTicks[i].style.setProperty("--tick-text-color", "green");
    else if(i / 2 > 3 && i / 2 < 7)
      xTicks[i].style.setProperty("--tick-text-color", "#ffb700");
  }
}