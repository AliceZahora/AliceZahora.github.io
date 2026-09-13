/*
Alice Zahora
Class: Web 200
Assignment: 3
Date: 09/13/2026
*/

function tempConvert()
{
    let tempHTML = document.getElementById("tempNum");
    let currTemp = tempHTML.innerHTML;
    let tempTypeHTML = document.getElementById("tempType");
    let tempType = tempTypeHTML.innerHTML;
    let newTemp;

    if(tempType == " °F ")
    {
        newTemp = (currTemp - 32) * (5/9);
        tempTypeHTML.innerHTML = " °C ";
    }
    else
    {
        newTemp = ((9/5) * currTemp) + 32;
        tempTypeHTML.innerHTML = " °F ";
    }

    tempHTML.innerHTML = newTemp;
}
function speedConvert()
{
    let speedHTML = document.getElementById("speedNum");
    let currSpeed = speedHTML.innerHTML;
    let speedTypeHTML = document.getElementById("speedType");
    let speedType = speedTypeHTML.innerHTML;
    let newSpeed;

    if(speedType == "mph")
    {
        newSpeed = currSpeed * 1.6;
        speedTypeHTML.innerHTML = "kmph";
    }
    else
    {
        newSpeed = currSpeed/1.6;
        speedTypeHTML.innerHTML = "mph";
    }

    speedHTML.innerHTML = newSpeed;
}


