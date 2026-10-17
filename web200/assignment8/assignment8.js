/*
    Alice Zahora
    Class: Web 200
    Assignment: 8
    Date: 10/18/2026
*/

let tableSize = 10;
let currentColumn = document.getElementById("col1");
const rows = document.getElementById("rowContainer");

for(let x = 0; x != tableSize; x++)
{
    //create new cube per multiplication and append it to current column
    for(let y = 0; y != tableSize; y++)
    {
        var newBlock = document.createElement("p");
        newBlock.innerHTML = (x + 1) * (y + 1);
        currentColumn.appendChild(newBlock);
    }

    //creates new column next to previous and starts appending to
    //that on next loop instead
    currentColumn = document.createElement("div");
    currentColumn.classList.add("column");
    rows.appendChild(currentColumn);
}
