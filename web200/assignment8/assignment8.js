/*
    Alice Zahora
    Class: Web 200
    Assignment: 8
    Date: 10/18/2026
*/

let currentColumn;
let newBlock;
let result;

const inputField = document.getElementById("inputField");
const multContainer = document.getElementById("multContainer");
const carContainer = document.getElementById("carContainer");
const carCard = document.getElementById("carCard");
//0 = study, 1 = race
const modeType = document.getElementsByName("modeType");
const raceContainer = document.getElementById("raceContainer");
const carIcons = document.querySelectorAll(".lane .fa-car-side:not(#playerCar)");
const playerCar = document.getElementById("playerCar");
const userAnswer = document.getElementById("mathAnswer");
const submitButton = document.getElementById("submitButton");
const mathQuestion = document.getElementById("mathQuestion");
const racetrack = document.getElementById("racetrack");

inputField.addEventListener("input", loadTable);
modeType[0].addEventListener("change", changeMode);
modeType[1].addEventListener("change", changeMode);
submitButton.addEventListener("click", checkAnswer);
userAnswer.addEventListener("change", checkAnswer);

const muscleCars = [
  {
    make: "Ford",
    model: "Mustang Boss 429",
    year: 1969,
    horsepower: 375,
    engine: "7.0L V8",
    isConvertible: false
  },
  {
    make: "Chevrolet",
    model: "Chevelle SS",
    year: 1970,
    horsepower: 450,
    engine: "7.4L V8",
    isConvertible: false
  },
  {
    make: "Dodge",
    model: "Challenger R/T",
    year: 1970,
    horsepower: 425,
    engine: "7.0L HEMI V8",
    isConvertible: true
  },
  {
    make: "Pontiac",
    model: "GTO",
    year: 1969,
    horsepower: 366,
    engine: "6.6L V8",
    isConvertible: false
  },
  {
    make: "Plymouth",
    model: "Road Runner",
    year: 1970,
    horsepower: 425,
    engine: "7.0L HEMI V8",
    isConvertible: false
  }
];

const colors = ["red", "blue", "orange", "pink", "purple"]
let temp = 0;
let finalAnswer;
//stores intervals of opposition movement
let interval = [];

//output key value pair of all cars' make, model, and year
for (const i of muscleCars) {
    var car = document.createElement('div');
    car.classList.add("car");

    //information about car
    var info = document.createElement('p');
    info.innerHTML = i.make + "<br>" + i.model + "<br>" + i.year;
    info.classList.add("carInfo");
    car.appendChild(info);

    //button for selecting car
    var button = document.createElement('input');
    button.type = "button";
    button.value = "Choose Car";
    button.classList.add("carButton");
    button.addEventListener("click", setupGame);

    car.appendChild(button);

    //car icon
    var icon = document.createElement('i');
    icon.classList.add("fa-solid", "fa-car-side");
    icon.style.color = colors[temp];
    car.appendChild(icon);

    //container for info expansion
    var expansion = document.createElement('div');
    expansion.classList.add("expansion");
    expansion.style.display = "none";

    //output key value pair of first car and all others on subsequent loops
    for (const key in muscleCars[temp]) {
        var extra = document.createElement('p');
        extra.innerHTML = key + ": " + muscleCars[temp][key];
        expansion.appendChild(extra);
    }

    car.appendChild(expansion);

    //expands info on click
    car.addEventListener("click", function () {
        var currentExpansion = this.querySelector(".expansion");

        //if expanded, hide it
        //if not expanded, show it
        if(currentExpansion.style.display == "none")
        {
            currentExpansion.style.display = "block";
        }
        else
        {
            currentExpansion.style.display = "none";
        }
    });

    carCard.appendChild(car);

    temp++;
}

function changeMode()
{
    //study mode
    //hide car screen, open multiplication table
    if(modeType[0].checked)
    {
        multContainer.style.display = "flex";
        carContainer.style.display = "none";
        raceContainer.style.display = "none";
    }
    //race mode
    //hide multiplication table, open car screen
    else
    {
        carContainer.style.display = "flex";
        multContainer.style.display = "none";
        raceContainer.style.display = "none";
    }
}
function loadTable(event)
{
    //if table exists, delete it
    if(document.getElementById("rowContainer"))
    {
        (document.getElementById("rowContainer")).remove();
    }

    //+ 1 is for header row
    let tableSize = parseInt(event.target.value) + 1;

    if(!isNaN(tableSize))
    {
        //create new table container
        let row = document.createElement("div");
        row.id = "rowContainer";
        multContainer.appendChild(row);

        for(let x = 0; x != tableSize; x++)
        {
            //creates new column next to previous and starts appending to
            //that on next loop instead
            currentColumn = document.createElement("div");
            currentColumn.classList.add("column");
            row.appendChild(currentColumn);

            //create new cube per multiplication and append it to current column
            for(let y = 0; y != tableSize; y++)
            {
                newBlock = document.createElement("p");

                //if header row, adjust values to unqiue, else use standard multiplication
                if(y == 0)
                {
                    newBlock.style.backgroundColor = "rgb(198, 164, 213)";

                    if(x == 0)
                    {
                        result = "X";
                    }
                    else
                    {
                        result = x * (y + 1);
                    }
                }
                else if(x == 0)
                {
                    newBlock.style.backgroundColor = "rgb(198, 164, 213)";
                    result = (x + 1) * y;
                }
                //not header/label row
                else
                {
                    result = x * y;

                    //highlight cells to trace back to the two numbers being
                    //multiplied
                    newBlock.addEventListener("mouseover", function ()
                    {
                        var currentNode = this;

                        //keep looping until reach header
                        //creates trace back to multiplicand
                        while(currentNode != this.parentElement.firstElementChild)
                        {
                            currentNode.classList.add("highlighted");
                            currentNode = currentNode.previousElementSibling;
                        }

                        //which row is the main element
                        var countChild = document.querySelectorAll(".highlighted").length;
                        currentNode = this.parentElement.previousElementSibling;

                        //highlight each previous columns nth (that matched main number)
                        //element
                        //creates trace back to multiplier
                        while(currentNode != currentNode.parentElement.firstChild)
                        {
                            currentNode.childNodes[countChild].classList.add("highlighted");
                            currentNode = currentNode.previousElementSibling;
                        }
                    });
                    //remove highlight once not hovering over cell anymore
                    newBlock.addEventListener("mouseout", function ()
                    {
                        var highlighted = document.querySelectorAll(".highlighted");
                        for (const node of highlighted) {
                            node.classList.remove("highlighted");
                        }
                    });
                }

                newBlock.innerHTML = result;
                currentColumn.appendChild(newBlock);
            }
        }
    }
}
function setupGame(event)
{
    let carColor = event.target.nextElementSibling.style.color;
    let setColor = 0;

    //clear car board and set up game board
    carContainer.style.display = "none";
    raceContainer.style.display = "flex";

    userAnswer.focus();

    playerCar.style.color = carColor;

    //store original placement of cars
    racetrack.value = playerCar.getBoundingClientRect().left;

    //set colors of car icons
    for(let k = 0; k != carIcons.length; k++)
    {
        //if current color in array is same as player color, skip it
        if(colors[setColor] == carColor)
        {
            setColor++;
        }

        carIcons[k].style.color = colors[setColor];
        setColor++;

        //start moving opposition
        interval[k] = setInterval(function() {moveOps(carIcons[k], k);}, 1000);
    }

    nextQuestion();
}
function checkAnswer()
{
    //correct answer
    if(userAnswer.value == finalAnswer)
    {
        moveUser(1, playerCar);
    }
    else
    {
        moveUser(0, playerCar);
    }

    //clear input
    userAnswer.value = "";

    nextQuestion();
}
function nextQuestion()
{
    //choose random number for equation
    let num1 = Math.floor(Math.random() * 5);
    let num2 = Math.floor(Math.random() * 5);

    finalAnswer = num1 * num2;
    let questionString = num1 + " x " + num2 + " = ?";

    mathQuestion.innerHTML = questionString;
}
//direction = 1 means correct, move forward
//direction = 0 means wrong, move backward;
function moveUser(direction, person, num)
{
    const finishLine = document.getElementById("finishLine");
    let finishLocation = finishLine.getBoundingClientRect().left;
    let carLocation = person.getBoundingClientRect().left;
    let originalPosition = racetrack.value;

    //amount of questions to be answered before you win
    let numQuestions = 5;
    let raceInterval = finishLocation/numQuestions;

    console.log(num + " curr: " + carLocation);

    //move player forward if correct answer, backwards if not
    if(direction)
    {
        person.style.left = carLocation + raceInterval + "px";
        carLocation = person.getBoundingClientRect().left;
    }
    //dont move backwards if at start
    else if(carLocation > originalPosition)
    {
        person.style.left  = carLocation - raceInterval + "px";
        carLocation = person.getBoundingClientRect().left;
    }

    //if location matching finish, player finished
    if(carLocation >= finishLocation)
    {
        if(person != playerCar)
        {
            clearInterval(interval[num]);
            console.log(num + " done");
        }
        alert("you finished!");
    }
}
function moveOps(op, num)
{
    //is the opponent correct, random
    let randomCorrect = Math.floor(Math.random() * 5);
    isCorrect = (randomCorrect >= 1)? 0 : 1;

    console.log(isCorrect);

    moveUser(isCorrect, op, num);
}
