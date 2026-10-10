/*
    Alice Zahora
    Class: Web 200
    Assignment: 7
    Date: 10/11/2026
*/

const main = document.getElementById("main");
const startMenu = document.getElementById("startMenu");
const instructions = document.getElementById("instructions");
const startButton = document.getElementById("startButton");

const numFood = document.getElementById("numFood");

const iconTypes = ["fa-pizza-slice", "fa-egg", "fa-carrot", "fa-lemon",
                    "fa-ice-cream", "fa-apple-whole"]

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
    let i = 0;

    while(i < numFood.value)
    {
        //chooses random position in array for random icon
        var randomFood = Math.floor(Math.random() * 5);

        //create icon element
        var newFood = document.createElement("i");
        newFood.classList.add("fa-solid");
        newFood.classList.add(iconTypes[randomFood]);

        //random pos on canvas for icon, excludes header area
        //random * (max - min) + min
        newFood.style.top = (Math.random() * (100 - 12) + 12) + "vh";
        newFood.style.left = (Math.random() * (100 - 12) + 12) + "vw";

        main.appendChild(newFood);

        i++;
    }
}
