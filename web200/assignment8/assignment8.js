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
const container = document.getElementById("container");

inputField.addEventListener("input", loadTable);

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
        container.appendChild(row);

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
                    newBlock.style.backgroundColor = "#9a81d59f";

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
                    newBlock.style.backgroundColor = "#9a81d59f";
                    result = (x + 1) * y;
                }
                //not header/label row
                else
                {
                    result = x * y;
                }

                newBlock.innerHTML = result;
                currentColumn.appendChild(newBlock);
            }
        }
    }
}
