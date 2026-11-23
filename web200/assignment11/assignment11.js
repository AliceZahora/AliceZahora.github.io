/*
    Alice Zahora
    Class: Web 200
    Assignment: 11
    Date: 11/22/2026
*/

let password = document.getElementById("passOG");
let confirm = document.getElementById("passConfirm");

function checkMatch()
{
    if(password.value != confirm.value )
    {
        confirm.setCustomValidity("Passwords must match");
    }
    else
    {
        confirm.setCustomValidity("");
    }
}
function checkInput(input)
{
    if(!input.validity.patternMismatch)
    {
        input.setCustomValidity("");
    }
    else
    {
        input.setCustomValidity(input.getAttribute("data-message"));
    }
}
