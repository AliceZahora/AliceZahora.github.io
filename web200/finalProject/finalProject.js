/*
    Alice Zahora
    Class: Web 200
    Assignment: Final Project
    Date: 11/14/2026
*/

//array of all toppings
toppings = document.getElementsByName("toppings");

for(let i = 0; i!= toppings.length; i++)
{
    toppings[i].addEventListener("change", coverageSelectDisplay);
}

function coverageSelectDisplay()
{
    //get coverage div for the current topping
    coverageOptionsDiv = event.currentTarget.parentElement.nextElementSibling;

    //switch display of options div to opposite
    coverageOptionsDiv.style.display = event.currentTarget.checked? "flex" : "none";
}
