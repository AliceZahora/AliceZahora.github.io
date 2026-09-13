/*
Alice Zahora
Class: Web 200
Assignment: 3
Date: 09/13/2026
*/

function tempConvert()
{
    let tempHTML = document.getElementById("tempNum");
    let currTemp = tempHTML.value;
    let tempTypeHTML = document.getElementById("tempType");
    let tempType = tempTypeHTML.innerHTML;
    let newTemp;

    let buttonHTML = document.getElementById("tempButton");

    if(tempType == " °F ")
    {
        newTemp = (currTemp - 32) * (5/9);
        tempTypeHTML.innerHTML = " °C ";
        buttonHTML.innerHTML = " Change To &degF ";
    }
    else
    {
        newTemp = ((9/5) * currTemp) + 32;
        tempTypeHTML.innerHTML = " °F ";
        buttonHTML.innerHTML = " Change To &degC ";
    }

    tempHTML.value = newTemp;
}
function speedConvert()
{
    let speedHTML = document.getElementById("speedNum");
    let currSpeed = speedHTML.value;
    let speedTypeHTML = document.getElementById("speedType");
    let speedType = speedTypeHTML.innerHTML;
    let newSpeed;

    let buttonHTML = document.getElementById("speedButton");

    if(speedType == "mph")
    {
        newSpeed = currSpeed * 1.6;
        speedTypeHTML.innerHTML = "kmph";
        buttonHTML.innerHTML = "Change to miles ";
    }
    else
    {
        newSpeed = currSpeed/1.6;
        speedTypeHTML.innerHTML = "mph";
        buttonHTML.innerHTML = "Change to km ";
    }

    speedHTML.value = newSpeed;
}


