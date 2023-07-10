import { newBarVal, popUpSubmitBtn } from "./index";
newBarVal.oninput = () => {
    if (newBarVal.value === "") // disable the add button for all invalid inputs i.e no value to set to
        popUpSubmitBtn.disabled = true;
    else {
        newBarVal.value = newBarVal.value.replace(/[^0-9\.]|1[^0\.]|[2-9]\d|10.|0[^\.]|^\.|\.[^5]+|\.5.+/g, "");
        popUpSubmitBtn.disabled = false;
    }
};
// [^0-9\.] → don't allow any text other than digits and decimal
// 1[^0\.] → 1 should not be followed by anything(number) except 0 or a decimal point
// [2-9]\d → 2-9 should not be followed by any number
// 10. → 10 should not be followed by anything
// 0[^\.] → 0 should not be followed by anything except decimal
// ^\. → . cannot be at the start of the string
// \.[^5]+ → decimal should not be followed by anything except 5 (5 can be only once)
// \.5.+ → .5 should not be followed by anything
// With the entered data, adding the new bar on the canvas when submit is clicked
