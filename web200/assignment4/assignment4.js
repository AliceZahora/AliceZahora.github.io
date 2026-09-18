document.addEventListener("keydown", (event) => {
    if(event.code == "Enter")
    {
        doMath();
    }
});
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
        if(!checkEntry(e.key))
        {
            e.preventDefault();
        }
    }

})
function addToScreen(element)
{
    var isInputAllowed = checkEntry(element.value);

    if(isInputAllowed)
    {
        document.getElementById("calcScreen").value =
        document.getElementById("calcScreen").value.concat(element.value);
    }

}
function checkEntry(entry)
{
    var currValue = document.getElementById("calcScreen").value;
    var lastEntry = currValue.charAt(currValue.length - 1);
    var regexSplit = /[^\d.]/
    var splitValue = currValue.split(regexSplit);
    var allow = true;

    if((splitValue[splitValue.length-1]).includes('.') && entry == '.')
    {
        allow = false;
    }
    if((lastEntry == '*' || lastEntry == '-' || lastEntry == '.' || lastEntry == '+')
        && isNaN(entry))
    {
        allow = false;
    }

    return allow;
}
function clearScreen()
{
    document.getElementById("calcScreen").value = "";
}
function addNums(num1, num2)
{
    return (num1) + (num2);
}
const multiplyNums = function(num1, num2)
{
    return (num1 * num2);
}
const subtractNums = (num1, num2) =>
{
    return (num1 - num2);
}
const isOperator = (element) => element = /[+-]/;
function doMath()
{
    var fullEntry = document.getElementById("calcScreen").value;
    var regexNum = /[^\d.]/;
    var regexOp = /[\d.]/;

    var numbers =  fullEntry.split(regexNum);
    var operators = fullEntry.split(regexOp).filter(Boolean);
    var opPosition = 0;

    var answer;

    opPosition = operators.indexOf('*');
    if(opPosition == -1)
    {
        opPosition = operators.findIndex(isOperator);
    }

    while(opPosition != -1)
    {
        switch (operators[opPosition])
        {
            case '*':
                answer = multiplyNums(parseFloat(numbers[opPosition]), parseFloat(numbers[opPosition + 1]));
                break;
            case '+':
                answer = addNums(parseFloat(numbers[opPosition]), parseFloat(numbers[opPosition + 1]));
                break;
            case '-':
                answer = subtractNums(parseFloat(numbers[opPosition]), parseFloat(numbers[opPosition + 1]));
        }

        numbers[opPosition] = answer;

        if(opPosition + 1 < numbers.length)
        {
            numbers.copyWithin(opPosition + 1, opPosition + 2, numbers.length);
        }
        numbers.pop();

        if(opPosition < operators.length)
        {
            operators.copyWithin(opPosition, opPosition + 1, opPosition.length);
        }
        operators.pop();

        opPosition = operators.indexOf('*');
        if(opPosition == -1)
        {
            opPosition = operators.findIndex(isOperator);
        }
    }

    document.getElementById("calcScreen").value = parseFloat(answer);
}
