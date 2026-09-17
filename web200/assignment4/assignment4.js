/*document.addEventListener("keydown", (event) => {
    if(event.code == "Enter")
    {
        alert("Enter")
    }
});*/
document.getElementById("calcScreen").addEventListener("keydown", function(e) {
    var regexAllowed = /[\d+\-*.]/;
    var currValue = this.value;
    var lastEntry = currValue.charAt(currValue.length - 1);

    if(!(regexAllowed.test(e.key) || e.key == "Backspace" || e.key == "Shift"))
    {
        e.preventDefault();
    }
    else if(e.key != "Backspace")
    {
        if((lastEntry == '*' || lastEntry == '-' || lastEntry == '.' ||
            lastEntry == '+') && isNaN(e.key))
        {
            e.preventDefault();
        }
    }

})
function addToScreen(element)
{
    document.getElementById("calcScreen").value =
    document.getElementById("calcScreen").value.concat(element.value);
}
function clearScreen()
{
    document.getElementById("calcScreen").value = "";
}
function addNums(num1, num2)
{
    let sum = num1 + num2;
}
const multiplyNums = function(num1, num2)
{
    let product = num1 * num2;
}
const subtractNums = (num1, num2) =>
{
    let difference = num1 - num2;
}
