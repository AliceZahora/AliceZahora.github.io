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
function checkStateView(evt)
{
    let country = evt.value.toLowerCase();

    //only ask for state if in the usa
    if(country == "usa" || country == "us" || country == "united states" ||
        country == "united states of america" || country == "united states (us)")
    {
        document.getElementById("stateDiv").style.display = "flex";
    }
    else {
        document.getElementById("stateDiv").style.display = "none";
    }
}
function editInput(input)
{
    //auto add - for phone number formatting
    if(input.value.length == 1 || input.value.length == 5 || input.value.length == 9)
    {
        input.value += "-";
    }
}
