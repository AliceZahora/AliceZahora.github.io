/*
    Alice Zahora
    Class: Web 200
    Assignment: 9
    Date: 10/24/2026
*/

let animalButtons = document.getElementsByClassName("animalButton");
let farmContainer = document.getElementById("farmContainer");

let ownedAnimals = [];

for(let i = 0; i!= animalButtons.length; i++)
{
    animalButtons[i].addEventListener("click", spawnAnimal);
}

function spawnAnimal(event)
{
    let icon = "fa-" + event.target.value.toLowerCase();

    let newAnimal = document.createElement("i");
    newAnimal.classList.add("fa-solid", icon);
    farmContainer.appendChild(newAnimal);
    ownedAnimals.push({type:newAnimal, age:1, icon: icon});
}
