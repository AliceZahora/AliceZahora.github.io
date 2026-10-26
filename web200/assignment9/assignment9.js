/*
    Alice Zahora
    Class: Web 200
    Assignment: 9
    Date: 10/24/2026
*/

let buyButtons = document.getElementsByClassName("buyButton");
let sellButtons = document.getElementsByClassName("sellButton");
let farmContainer = document.getElementById("farmContainer");
let arrayHTML = document.getElementById("array");
//5 originally spawned animals
let originalAnimals = farmContainer.children;
let sortButton = document.getElementById("sortButton");
let currentCoins = document.getElementById("currentCoins");

let ownedAnimals = [originalAnimals[0], originalAnimals[1], originalAnimals[2],
                    originalAnimals[3], originalAnimals[4]];
//number of each animal owned
let animalTypes = {crow: 5, cat: 0, fish: 0, cow: 0};

//keep track of total animals spawned number
let animalNumbers = 5;
//output beginning array
updateArray();

for(let i = 0; i!= buyButtons.length; i++)
{
    buyButtons[i].addEventListener("click", buyAnimal);
}
for(let i = 0; i!= sellButtons.length; i++)
{
    sellButtons[i].addEventListener("click", sellAnimal);
}

//move the original animals to random location
ownedAnimals.forEach(animal => {
    randomMove(animal);
});

sortButton.addEventListener("click", sort);

function randomMove(newAnimal)
{
    let animalWidth = newAnimal.offsetWidth;
    let animalHeight = newAnimal.offsetHeight;

    //get location of farm div
    let farmCoord = farmContainer.getBoundingClientRect();
    //get random x coord within farm div
    let maxX = farmCoord.right - animalWidth;
    let x = Math.floor((Math.random() * (maxX - farmCoord.left + 1) + farmCoord.left));
    //get random y coord within farm div
    let maxY = farmCoord.bottom - animalHeight;
    let y = Math.floor((Math.random() * (maxY - farmCoord.top + 1) + farmCoord.top));

    newAnimal.style.left = x + "px";
    newAnimal.style.top = y + "px";
}
function sort()
{
    ownedAnimals.sort(comparePrice);

    updateArray();
}
function updateArray()
{
    //output entire array
    arrayHTML.innerHTML = "[";
    ownedAnimals.forEach(function(animalHTML, index, array){
        arrayHTML.innerHTML += animalHTML.id;
        //add comma if not last element
        if(index < array.length - 1)
        {
            arrayHTML.innerHTML += ", ";
        }
    });
    arrayHTML.innerHTML += "]";

    for (const key in animalTypes) {
        console.log(key + ": " + animalTypes[key] )
    }
}
function buyAnimal(event)
{
    //identify what kind of animal player is buying
    let type = event.target.getAttribute("data-type");
    let icon = "fa-" + type
    let price = parseInt(event.target.getAttribute("data-price"));

    //create icon html element
    let newAnimal = document.createElement("i");
    newAnimal.id = type + animalNumbers;
    newAnimal.setAttribute("data-type", type);

    animalNumbers++;
    newAnimal.classList.add("fa-solid", icon, "farmAnimal");
    newAnimal.setAttribute("data-price", price);
    farmContainer.appendChild(newAnimal);
    randomMove(newAnimal);

    //add animal element and details to array
    ownedAnimals.push(newAnimal);
    animalTypes[type] += 1;

    //output updated array
    updateArray();
    updateCoins(0, price);
}
function sellAnimal(event)
{
    let index = 0;
    let price = 0;

    //find index of animal player is selling
    ownedAnimals.every(animalHTML => {
        //if animal found, delete html element from dom, save index, leave loop
        if(animalHTML.classList[1] == ("fa-" + event.target.getAttribute("data-type")))
        {
            price = parseInt(animalHTML.getAttribute("data-price"));
            animalTypes[animalHTML.getAttribute("data-type")] -= 1;
            animalHTML.remove();

            return false;
        }

        index++;
        return true;
    });

    //remove actual array item
    if(index == 0)
    {
        ownedAnimals.shift();
    }
    else
    {
        ownedAnimals.splice(index, 1);
    }

    //output updated array
    updateArray();
    updateCoins(1, price);
}
//updateType 1 = sell, 0 = buy
function updateCoins(didSell, price)
{
    let newMoney;

    if(didSell)
    {
        newMoney = parseInt(currentCoins.innerHTML) + price;
    }
    else
    {
        newMoney = parseInt(currentCoins.innerHTML) - price;
    }

    currentCoins.innerHTML = newMoney;

    checkBuyButtons(newMoney);
}
function checkBuyButtons(newMoney)
{
    for(let i = 0; i!= buyButtons.length; i++)
    {
        //if button is for item that is in budget
        if(parseInt(buyButtons[i].getAttribute("data-price")) <= newMoney)
        {
            //remove inactive only if button isnt currently active
            if(buyButtons[i].classList.contains("inactive"))
            {
                buyButtons[i].classList.remove("inactive");
            }
        }
        //if button isnt in budget but isnt inactive, deactivate it
        else if(!(buyButtons[i].classList.contains("inactive")))
        {
            buyButtons[i].classList.add("inactive");
        }
        //if button isnt in budget but IS inactive, then all following
        //will also not be in budget and inactive, so can stop loop here
        else
        {
            break;
        }
    }
}
function comparePrice(a, b)
{
    //compare prices to sort elements
    if(parseFloat(a.getAttribute("data-price")) < parseFloat(b.getAttribute("data-price")))
    {
        return 1;
    }
    else if(parseFloat(a.getAttribute("data-price")) > parseFloat(b.getAttribute("data-price")))
    {
        return -1;
    }

    return 0;
}
