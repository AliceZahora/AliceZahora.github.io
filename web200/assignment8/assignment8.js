/*
    Alice Zahora
    Class: Web 200
    Assignment: 8
    Date: 10/18/2026
*/

let tableSize = 10;
let currentColumn;
let newBlock;
let result;
const rows = document.getElementById("rowContainer");

for(let x = 0; x != tableSize + 1; x++)
{
    //creates new column next to previous and starts appending to
    //that on next loop instead
    currentColumn = document.createElement("div");
    currentColumn.classList.add("column");
    rows.appendChild(currentColumn);

    //create new cube per multiplication and append it to current column
    for(let y = 0; y != tableSize + 1; y++)
    {
        //if header row, adjust values to unqiue, else use standard multiplication
        if(y == 0)
        {
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
            result = (x + 1) * y;
        }
        else
        {
            result = x * y;
        }

        newBlock = document.createElement("p");
        newBlock.innerHTML = result;
        currentColumn.appendChild(newBlock);
    }
}
