/*
    Alice Zahora
    Class: Web 200
    Assignment: 4
    Date: 09/17/2026
*/
//Enter key triggers equation submission
document.addEventListener("keydown", (event) => {
    if(event.code == "Enter")
    {
        doMath();
    }
});
//Checks keyboard entry to see if character is allowed in equation
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
//Concats value in calculator screen with new input key
function addToScreen(element)
{
    var isInputAllowed = checkEntry(element.value);

    if(isInputAllowed)
    {
        document.getElementById("calcScreen").value =
        document.getElementById("calcScreen").value.concat(element.value);
    }
}
//Checks if multiple operators in a row are allowed
function checkEntry(entry)
{
    var currValue = document.getElementById("calcScreen").value;
    var lastEntry = currValue.charAt(currValue.length - 1);
    var regexSplit = /[^\d.]/
    var splitValue = currValue.split(regexSplit);
    var allow = true;

    //If current number already has decimal place, prevent input
    if((splitValue[splitValue.length-1]).includes('.') && entry == '.')
    {
        allow = false;
    }
    //If last input was an operator and current input is operator
    //If current input is decimal, allow since +.# is valid, shorthand decimal with implied 0
    //Previous if statement already prevents invalid decimal placements
    if(isNaN(lastEntry) && (isNaN(entry) && entry != '.'))
    {
        //default to false but...
        allow = false;

        //if its a double minus (one is a negative sign) but not triple, it is still valid
        if(entry == '-' && !isNaN(currValue.charAt(currValue.length - 2)) && lastEntry != '.')
        {
            allow = true;
        }
    }
    //Allows only the minus sign to be an operator which starts the equation (interpretted as negative sign)
    if(currValue.length == 0 && (entry.match(regexSplit) && entry != '-'))
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
    return (num1 + num2);
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
function changeMinuses(fullEntry)
{
    var currPosition = 0;
    var foundAt = fullEntry.indexOf('-', currPosition);
    var regexNum = /[^\d.]/;

    //continue until all minuses are found and analyzed
    while(foundAt != -1)
    {
        currPosition = foundAt;
        //if minus found after operator or is first in equation, it means its a negative and
        // is marked as a non operator
        if(foundAt == 0 || (fullEntry[foundAt - 1].match(regexNum)))
        {
            fullEntry = fullEntry.substring(0,currPosition) + 'n' +
            fullEntry.substring(currPosition + 1, fullEntry.length);
        }

        foundAt = fullEntry.indexOf('-', currPosition+1);
    }

    return fullEntry;
}
//Parses input string and decides which operation function to trigger
function doMath()
{
    var fullEntry = document.getElementById("calcScreen").value;
    var regexNum = /[^\d.n]/;
    var regexOp = /[\d.n]/;

    fullEntry = changeMinuses(fullEntry);

    //split equation into numbers and operators with no blank spaces
    var numbers =  fullEntry.split(regexNum).filter(Boolean);
    var operators = fullEntry.split(regexOp).filter(Boolean);
    var opPosition = 0;

    //since the operators were already removed, negative can be added back
    //without messing up split
    for (var x = 0; x!= numbers.length; x++)
    {
        if(numbers[x][0] == 'n')
        {
            numbers[x] = '-' + numbers[x][1];
        }
    }

    //if first char is minus, interpret it as negative, remove from operators
    //array and add negative to first digit in number array
    /*if(fullEntry[0] == '-')
    {
        operators.shift();
        numbers[0] = parseFloat('-' + numbers[0].toString());
    }*/

    var answer;

    //only do math if there are operators
    if(operators.length > 0)
    {
        //do multiplication first
        opPosition = operators.indexOf('*');
        //if no multiplication, move on to - and +
        if(opPosition == -1)
        {
            opPosition = operators.findIndex(isOperator);
        }

        //continue to do math until no operators are left
        while(opPosition != -1)
        {
            //check which operator is active and trigger appropriate math function
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

            //change number in proper place to be the answer of previous arithmetic
            numbers[opPosition] = answer;

            //if the second number in the arithmetic is not at the end of the array
            //move the numbers after it to copy over it
            //else, simply remove the back of the array, since it will be the second number
            if(opPosition + 1 < numbers.length)
            {
                numbers.copyWithin(opPosition + 1, opPosition + 2, numbers.length);
            }

            //removes either second number in arithmetic or the leftover that resulted
            //from the shift left
            numbers.pop();

            //same logic as numbers array movement
            if(opPosition < operators.length)
            {
                operators.copyWithin(opPosition, opPosition + 1, opPosition.length);
            }
            operators.pop();

            //search to prepare for next loop
            opPosition = operators.indexOf('*');
            //if no multiplication left, search for - and + in equation
            if(opPosition == -1)
            {
                opPosition = operators.findIndex(isOperator);
            }
        }

        //output answer
        document.getElementById("calcScreen").value = answer;
    }

}
