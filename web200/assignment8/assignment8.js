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


//output key value pair of all cars' make, model, and year
for (const i of muscleCars) {
    var car = document.createElement('div');
    car.classList.add("car");
    car.innerHTML = "Make: " + i.make + " Model: " + i.model + " Year: " + i.year;
    carCard.appendChild(car);

    //<i class="fa-solid fa-car-side"></i>
}

/*
//output key value pair of first car
for (const key in muscleCars[0]) {
    var car = document.createElement('p');
    car.innerHTML = key + ": " + muscleCars[0][key];
    carCard.appendChild(car);
}
    */

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
function loadCars()
{

}
