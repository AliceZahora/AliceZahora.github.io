/*
    Alice Zahora
    Class: Web 200
    Assignment: 7
    Date: 10/11/2026
*/

const startMenu = document.getElementById("startMenu");
const instructions = document.getElementById("instructions");
const startButton = document.getElementById("startButton");

const numFood = document.getElementById("numFood");

startButton.addEventListener("click", gameSetup);

//checks is input is within the range
function checkInput()
{
    let valid = false;

    if(numFood.value > 0 && numFood.value <= 20)
    {
        valid = true;
    }

    return valid;
}
//hides start screen to make room for game
function gameSetup ()
{
    if (checkInput())
    {
        startMenu.style.display = "none";
        instructions.style.display = "none";

        displayFood();
    }
    else
    {
        alert("Please enter a valid number (1-20)");
    }
}
function displayFood()
{
    //default food number if none entered
    let food = 10;
}
