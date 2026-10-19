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

inputField.addEventListener("input", loadTable);
modeType[0].addEventListener("change", changeMode);
modeType[1].addEventListener("change", changeMode);

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

const colors = ["red", "blue", "orange", "green", "black"]
let temp = 0;

//output key value pair of all cars' make, model, and year
for (const i of muscleCars) {
    var car = document.createElement('div');
    car.classList.add("car");

    //information about car
    var info = document.createElement('p');
    info.innerHTML = i.make + "<br>" + i.model + "<br>" + i.year;
    car.appendChild(info);

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
    }
    //race mode
    //hide multiplication table, open car screen
    else
    {
        carContainer.style.display = "flex";
        multContainer.style.display = "none";
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
