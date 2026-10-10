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
let direction = ["down", "right"];

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

        //create enemy icon and append to main
        let enemy = document.createElement("i");
        enemy.id = "enemyIcon";
        enemy.classList.add("fa-regular");
        enemy.classList.add("fa-face-angry");

        //if you touch enemy, you lose
        enemy.addEventListener("mouseover", function () {
            gameOver(0);
        });

        main.appendChild(enemy);

        setInterval(moveEnemy, 5, enemy);
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

            //if player has eaten as much food as was outputted, end game
            //with win
            if(eatenCount == numFood.value)
            {
                gameOver(1);
            }
        })

        i++;
    }
}
function moveEnemy(enemy)
{
    //per frame, move enemy one pixel down and to right

    //if current position not offscreen, check which direction we are
    //currently meant to move via array
    if(enemy.offsetTop > window.innerHeight || direction[0] == "up")
    {
        enemy.style.top = (enemy.offsetTop - 1) + "px";

        //tell to switch direction next time if next location is offscreen
        if(enemy.offsetTop < (0 + (window.innerHeight/8)))
        {
            direction[0] = "down"
        }
    }
    else
    {
        enemy.style.top = (enemy.offsetTop + 1) + "px";

        //tell to switch direction next time if next location is offscreen
        if(enemy.offsetTop > (window.innerHeight - (window.innerHeight/10)))
        {
            direction[0] = "up"
        }
    }

    /*
    //if enemy goes offscreen, redirect
    if(enemy.offsetLeft > window.innerWidth)
    {
        enemy.style.left = (enemy.offsetLeft + 1) + "px";
    }
    else
    {
        enemy.style.left = (enemy.offsetLeft - 1) + "px";
    }*/

}
function gameOver(didWin)
{
    document.getElementById("endScreen").showModal();

    if(didWin)
    {
        document.getElementById("endText").innerHTML = "You Win!";
    }
    else
    {
        document.getElementById("endText").innerHTML = "You Lose!";
    }

    resetGame();
}
function resetGame()
{
    eatenCount = 0;
    startMenu.style.display = "flex";
    instructions.style.display = "block";
    document.getElementById("enemyIcon").remove();
}
