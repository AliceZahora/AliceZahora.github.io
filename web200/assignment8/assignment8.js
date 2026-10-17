/*
    Alice Zahora
    Class: Web 200
    Assignment: 8
    Date: 10/18/2026
*/

let tableSize = 10;
let columns = document.getElementById("col1");
const rows = document.getElementById("rowContainer");

for(let x = 0; x != tableSize; x++)
{
    for(let y = 0; y != tableSize; y++)
    {
        var newBlock = document.createElement("p");
        newBlock.innerHTML = (x + 1) * (y + 1);
        columns.appendChild(newBlock);
    }

    columns = document.createElement("div");
    rows.appendChild(columns);
}
