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

//array used to hold all food html, used to delete them all later
const allFood = [];

const iconTypes = ["fa-pizza-slice", "fa-egg", "fa-carrot", "fa-lemon",
                    "fa-ice-cream", "fa-apple-whole"];
const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

//counts how much food eaten to detect when round is over
let eatenCount = 0;

//holds interval so that can be canceled when done using
let interval = 0;

//array used to hold all enemy objects
let enemyArray = [];


//did player survive round
let survived = true;

startButton.addEventListener("click", gameSetup);
document.getElementById("standardMode").addEventListener("change", changeMode);
document.getElementById("infiniteMode").addEventListener("change", changeMode);

//Used AI to explain this concept to me
//create variable for promise
let promiseRoundOver;

//if setPromise is called, it sets up a wait until it is resolved
//however, since we set promiseRoundOver as the resolve(), if THAT
//is called, it instead resolves the promise
//so call setPromise(createPromise) to wait, call promiseRoundOver to end wait
function createPromise()
{
    return new Promise((resolve) => {
        promiseRoundOver = resolve;
    })
}

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
        //rounds to nearest multiple of 5 for enemy location
        let evenFive = (Math.round(this.enemy.offsetTop/5)) * 5;

        //y position of top of screen rounded to nearest 5
        let topScreen = (Math.round((window.innerHeight-(window.innerHeight * .88))/5)) * 5;
        //enemy size based on viewport height
        let enemySize = window.innerHeight * .20;
        //y position of bottom of screen rouned to nearest 5
        let bottomScreen = (Math.round((window.innerHeight-enemySize)/5)) * 5;
        
        if(evenFive == topScreen)
        {
            alert("top");
            if(this.enemy.offsetLeft == bottomScreen)
            {
                alert("corner");
            }
        }
        if(evenFive == bottomScreen)
        {
            alert("bottom");
        }

        //per frame, move enemy five pixels down and right

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
            if(this.enemy.offsetLeft > window.innerWidth - (window.innerHeight/4.8))
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

        let roundNumber = 1;

        let setPromise = createPromise();

        while(survived)
        {
            //set board based on user input or round number for infinite
            displayFood(gamemode, roundNumber);
            displayEnemy(gamemode, roundNumber);

            //move enemies via interval call to moveEnemies
            interval = setInterval(moveEnemies, speed);

            //wait until promise is resolved, indicating end of round
            await setPromise;

            //leave loop if standard mode because its one round only
            if(gamemode == "standard")
            {
                break;
            }

            //reset for next round if survived, else will be reset after
            //loop is left
            if(survived)
            {
                resetGame("partial");
                setPromise = createPromise()
                roundNumber++;
            }
        }

        resetGame("full");
    }
    else
    {
        alert("Please enter a valid number (1-20)");
    }
}
function displayFood(gamemode, roundNumber)
{
    let i = 0;
    let spawnFood = roundNumber;

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
                gameOver(1, roundNumber, gamemode);
            }
        })

        i++;
    }
}
function displayEnemy(gamemode, roundNumber)
{
    let spawnEnemy = roundNumber;

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
function gameOver(didWin, roundNumber, gamemode)
{
    document.getElementById("endScreen").showModal();

    if(didWin)
    {
        if(gamemode == "infinite")
        {
            document.getElementById("endText").innerHTML = "Round " + (roundNumber + 1);
        }
        else
        {
            document.getElementById("endText").innerHTML = "You Win!";
        }

        survived = true;
    }
    else
    {
        document.getElementById("endText").innerHTML = "You Lose!";
        survived = false;
    }

    //resolves promise, indicates round is over and loop can continue
    promiseRoundOver();
}
function resetGame(type)
{
    eatenCount = 0;
    clearInterval(interval);

    //clear object array and delete html objects
    enemyArray.forEach(enemyObject => {
        enemyObject.enemy.remove();
    });
    enemyArray = [];

    if(type == "full")
    {
        startMenu.style.display = "flex";
        instructions.style.display = "block";

        //remove all food html icons
        allFood.forEach(food => {
            food.remove();
        });

        document.getElementById("safeArea").remove();
        survived = true;
    }
}
