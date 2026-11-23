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
        confirm.valid = false;
    }
    else
    {
        confirm.setCustomValidity("");
    }
}
