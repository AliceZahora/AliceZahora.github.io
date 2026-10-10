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
                    "fa-ice-cream", "fa-apple-whole"];

let eatenCount = 0;

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

        //main.style.cursor = "url('hippo-solid-full-white\ \(small\).ico'), default";

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

        //random pos on canvas for icon, excludes header area and icon size
        //random * (max - min) + min
        newFood.style.top = (Math.random() * (97 - 12) + 12) + "vh";
        newFood.style.left = (Math.random() * 97) + "vw";

        main.appendChild(newFood);

        //remove food when mouse over (eat)
        newFood.addEventListener("mouseover", function ()
        {
            this.remove();
            eatenCount ++;
            if(eatenCount == numFood.value)
            {
                gameOver(1);
            }
        })

        i++;
    }
}
function gameOver(didWin)
{
    if(didWin)
    {
        document.getElementById("endScreen").showModal();
    }
}
