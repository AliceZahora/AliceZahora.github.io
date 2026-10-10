/*
    Alice Zahora
    Class: Web 200
    Assignment: 7
    Date: 10/11/2026
*/

let startMenu = document.getElementById("startMenu");
let instructions = document.getElementById("instructions");
let startButton = document.getElementById("startButton");

let numFood = document.getElementById("numFood");

startButton.addEventListener("click", gameSetup);

//hides start screen to make room for game
function gameSetup ()
{
    startMenu.style.display = "none";
    instructions.style.display = "none";

    displayFood();
}
function displayFood()
{
    alert(numFood.value);
}
