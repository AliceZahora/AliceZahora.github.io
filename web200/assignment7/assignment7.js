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
const numEnemy = document.getElementById("numEnemy");
const allFood = [];

const iconTypes = ["fa-pizza-slice", "fa-egg", "fa-carrot", "fa-lemon",
                    "fa-ice-cream", "fa-apple-whole"];

let eatenCount = 0;
let interval = 0;

let enemyArray = [];

startButton.addEventListener("click", gameSetup);
document.getElementById("standardMode").addEventListener("change", changeMode);
document.getElementById("infiniteMode").addEventListener("change", changeMode);

//Used AI to explain this concept to me
//create variable for promise
let promiseRoundOver;

//if setPromise is called, it sets up a wait until it is resolved
//however, since we set promiseRoundOver as the resolve(), if THAT
//is called, it instead resolves the promise
//so call setPromise to wait, call promiseRoundOver to end wait
const setPromise = new Promise((resolve) => {
    promiseRoundOver = resolve;
})

class Enemy
{
    constructor(setID)
    {
        this.direction = ["down", "right"];

        //create enemy icon and append to main
        this.enemy = document.createElement("i");
        this.enemy.id = setID;
        this.enemy.classList.add("fa-regular");
        this.enemy.classList.add("fa-face-angry");
        this.enemy.classList.add("fa-canvas-square");

        this.enemy.style.left = (Math.random() * 97) + "vw";
        this.enemy.style.top = (Math.random() * (97 - 12) + 12) + "vh";

        //if you touch enemy, you lose
        this.enemy.addEventListener("mouseover", function () {
            gameOver(0);
        });

        main.appendChild(this.enemy);
    }
    move()
    {
        //per frame, move enemy one pixel down and to right

        //if current position not offscreen, check which direction we are
        //currently meant to move via array
        if(this.enemy.offsetTop > window.innerHeight || this.direction[0] == "up")
        {
            this.enemy.style.top = (this.enemy.offsetTop - 5) + "px";

            //tell to switch direction next time if next location is offscreen
            if(this.enemy.offsetTop < (0 + (window.innerHeight/8)))
            {
                this.direction[0] = "down"
            }
        }
        else
        {
            this.enemy.style.top = (this.enemy.offsetTop + 5) + "px";

            //tell to switch direction next time if next location is offscreen
            if(this.enemy.offsetTop > (window.innerHeight - (window.innerHeight/5)))
            {
                this.direction[0] = "up"
            }
        }

        //if current position not offscreen, check which direction we are
        //currently meant to move via array
        if(this.enemy.offsetLeft > window.innerWidth || this.direction[1] == "left")
        {
            this.enemy.style.left = (this.enemy.offsetLeft - 5) + "px";

            //tell to switch direction next time if next location is offscreen
            if(this.enemy.offsetLeft < 0)
            {
                this.direction[1] = "right"
            }
        }
        else
        {
            this.enemy.style.left = (this.enemy.offsetLeft + 5) + "px";

            //tell to switch direction next time if next location is offscreen
            if(this.enemy.offsetLeft > window.innerWidth - (window.innerHeight/5))
            {
                this.direction[1] = "left"
            }
        }
    }
}
//checks is input is within the range
function checkInput()
{
    let valid = false;

    if(numFood.value > 0 && numFood.value <= 20)
    {
        if(numEnemy.value > 0 && numEnemy.value <= 20)
        {
            valid = true;
        }
    }

    return valid;
}
function changeMode(event)
{
    let inputMenus = document.getElementsByClassName("gameInputs");

    //if current clicked is standard, show input blocks, else, hide them
    let changeDisplay = (getChecked("gamemode") == "standard")? "block" : "none";

    //iterate through all input blocks and changes display based on previous else if
    for(let z = 0; z != inputMenus.length; z++)
    {
        inputMenus[z].style.display = changeDisplay;
    }
}
function getChecked(elementName)
{
    let radioOptions = document.getElementsByName(elementName);
    let checkedValue;

    //check each radio to see which one was chosen
    for(let j = 0; j != radioOptions.length; j++)
    {
        if(radioOptions[j].checked)
        {
            checkedValue = radioOptions[j].value;
        }
    }

    return checkedValue;
}
//hides start screen to make room for game
async function gameSetup ()
{
    let gamemode = getChecked("gamemode");
    let keepPlaying = true;

    if (checkInput() || gamemode == "infinite")
    {
        let speed;

        switch(getChecked("speedLevel"))
        {
            case "easy":
                speed = 20;
                break;
            case "medium":
                speed = 15;
                break;
            case "hard":
                speed = 10;
        }

        //create safe area space where start button was so that enemy
        //doesn't insta kill player, since enemy can spawn there
        let safeArea = document.createElement('button');
        let startPositioning = startButton.getBoundingClientRect();

        safeArea.id = "safeArea";
        safeArea.style.top = startPositioning.top + "px";
        safeArea.style.left = startPositioning.left + "px";
        safeArea.innerHTML = "Safe Area";
        main.appendChild(safeArea);

        startMenu.style.display = "none";
        instructions.style.display = "none";

        //main.style.cursor = "url('hippo-solid-full-white\ \(small\).ico'), default";

        while(keepPlaying)
        {
            displayFood(gamemode);
            displayEnemy(gamemode);

            interval = setInterval(moveEnemies, speed);

            //wait until promise is resolved, indicating end of round
            await setPromise;
            keepPlaying = false;
        }
    }
    else
    {
        alert("Please enter a valid number (1-20)");
    }
}
function displayFood(gamemode)
{
    let i = 0;
    let spawnFood = 1;

    //if standard mode, base food number on user input
    if(gamemode == "standard")
    {
        spawnFood = numFood.value;
    }

    while(i < spawnFood)
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

        allFood.push(newFood);
        main.appendChild(newFood);

        //remove food when mouse over (eat)
        newFood.addEventListener("mouseover", function ()
        {
            this.remove();
            eatenCount ++;

            //if player has eaten as much food as was outputted, end game
            //with win
            if(eatenCount == spawnFood)
            {
                gameOver(1);
            }
        })

        i++;
    }
}
function displayEnemy(gamemode)
{
    let spawnEnemy = 1;

    //if standard mode, base enemy number on user input
    if(gamemode == "standard")
    {
        spawnEnemy = numEnemy.value;
    }

    //create as many enemies as indicated
    for(let i = 0; i != spawnEnemy; i++)
    {
        let id = "enemyIcon" + i;
        let enemyOb = new Enemy(id);
        enemyArray[i] = enemyOb;
    }
}
function moveEnemies()
{
    enemyArray.forEach(enemyObject => {
        enemyObject.move();
    });
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

    clearInterval(interval);

    //clear object array and delete html objects
    enemyArray.forEach(enemyObject => {
        enemyObject.enemy.remove();
    });
    enemyArray = [];

    //remove all food html icons
    allFood.forEach(food => {
        food.remove();
    });

    document.getElementById("safeArea").remove();

    //resolves promise, indicates round is over and loop can continue
    promiseRoundOver();
}
