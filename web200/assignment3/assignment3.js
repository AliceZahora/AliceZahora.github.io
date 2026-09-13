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
    let newTemp;

    if(tempType == "&degF")
    {
        newTemp = (currTemp - 32) * (5/9);
    }
    else
    {
        newTemp = ((9/5) * currTemp) + 32;
    }

    tempHTML.innerHTML = newTemp;
}
function speedConvert()
{
    let speedHTML = document.getElementById("speedNum");
    let currSpeed = speedHTML.innerHTML;
    let speedType = document.getElementById("speedType").innerHTML;
    let newSpeed;

    if(speedType == "mph")
    {
        newSpeed = currSpeed * 1.6;
    }
    else
    {
        newSpeed = currSpeed/1.6;
    }

    speedHTML.innerHTML = newSpeed;
}


