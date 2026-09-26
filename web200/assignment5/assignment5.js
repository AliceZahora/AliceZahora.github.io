/*
    Alice Zahora
    Class: Web 200
    Assignment: 5
    Date: 09/27/2026
*/

let attempNum = 0;
let answerYes = document.getElementById("answerYes");
let answerNo = document.getElementById("answerNo");

answerYes.addEventListener("click", saidYes);
answerNo.addEventListener("click", this.saidNo);

function saidYes()
{
    attempNum = 0;

    alert("said yes");
}
function saidNo(currButton)
{
    attempNum++;

    alert("said no");

    if(attempNum < 3)
    {
        moveButton(this);
    }
    else
    {
        answerNo.addEventListener("mouseover", this.changeButtonStyle);
    }
}
function moveButton(currButton)
{
    alert("move");
}
function changeButtonStyle(currButton)
{
    alert("change");
}
