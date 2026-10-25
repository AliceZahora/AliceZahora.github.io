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

let ownedAnimals = [originalAnimals[0], originalAnimals[1], originalAnimals[2],
                    originalAnimals[3], originalAnimals[4]];

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

function updateArray()
{
    //output entire array
    arrayHTML.innerHTML = "[ ";
    ownedAnimals.forEach(animalHTML => {
        arrayHTML.innerHTML += animalHTML.id + " ";
    });
    arrayHTML.innerHTML += "]";
}
function buyAnimal(event)
{
    //identify what kind of animal player is buying
    let icon = "fa-" + event.target.getAttribute("data-type");

    //create icon html element
    let newAnimal = document.createElement("i");
    newAnimal.id = event.target.getAttribute("data-type") + animalNumbers;
    animalNumbers++;
    newAnimal.classList.add("fa-solid", icon);
    farmContainer.appendChild(newAnimal);

    //add animal element and details to array
    ownedAnimals.push(newAnimal);

    //output updated array
    updateArray();
}
function sellAnimal(event)
{
    let index = 0;

    //find index of animal player is selling
    ownedAnimals.every(animalHTML => {
        //if animal found, delete html element from dom, save index, leave loop
        if(animalHTML.classList[1] == ("fa-" + event.target.getAttribute("data-type")))
        {
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
}
