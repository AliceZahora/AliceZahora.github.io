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
answerNo.addEventListener("click", saidNo(this));

function saidYes()
{
    attempNum = 0;
}
function saidNo(currButton)
{
    attempNum++;

    if(attempNum < 3)
    {
        moveButton(this);
    }
    else
    {
        answerNo.addEventListener("mouseover", changeButtonStyle(this))
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
