/*
    Alice Zahora
    Class: Web 200
    Assignment: 9
    Date: 10/24/2026
*/

animalButtons = document.getElementsByClassName("animalButton");

let ownedAnimals = [];

for(let i = 0; i!= animalButtons.length; i++)
{
    animalButtons[i].addEventListener("click", spawnAnimal);
}

function spawnAnimal(event)
{
    ownedAnimals.push(event.target);
    alert(event.target.value);
}
