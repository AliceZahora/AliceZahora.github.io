/*
    Alice Zahora
    Class: Web 200
    Assignment: 10
    Date: 11/03/2026
*/

let premadeCakes = document.getElementById("premadeCakes");
let cakeObjects = [];

//premade choices for each section
const allSize =
{
    "small" : "20%",
    "medium" : "30%",
    "large" : "40%"
};
const allLayer = [1, 2, 3];
const allFlavor =
{
    "chocolate" : "#583821",
    "vanilla" : "#fbf6e1",
    "red velvet" : "#7e3437"
};
const allFrosting =
{
    "chocolate" : "#412714",
    "vanilla" : "#fff7d2",
    "lemon" : "#fff879"
};
const allMessage = ["Happy Birthday","Love You", "Congrats!"];

const wholeCard = document.getElementsByClassName("wholeCard")
randomCake();

function Cake(size, layers, flavor, frosting, message)
{
    this.size = size;
    this.layers = layers;
    this.flavor = flavor;
    this.frosting = frosting;
    this.message = message;
}
//creates detail card for cake
function createCard(object, wholeCard)
{
    //retrieve all cake visuals from this card
    //0 = frosting, 1 = frosting drip, 2 = flavor
    const wholeCake = wholeCard.children[0].children;

    const cakeTable = document.createElement("table");
    cakeTable.classList.add("precakeTable");

    const backCard = document.createElement("div");
    backCard.classList.add("backCard");

    //iterates over all key value pairs for single cake object
    for (let key in object)
    {
        if(key == "frosting")
        {
            wholeCake[0].style.backgroundColor = allFrosting[object[key]];
            wholeCake[1].style.backgroundColor = allFrosting[object[key]];
        }
        else if(key == "flavor")
        {
            wholeCake[2].style.backgroundColor = allFlavor[object[key]];
        }
        else if(key == "size")
        {
            //change size of each part of cake graphic
            for(let i = 0; i != wholeCake.length; i++)
            {
                wholeCake[i].style.width = allSize[object[key]];
            }
        }
        let newRow = document.createElement("tr")
        newRow.classList.add("precakeRow");

        let tableHead = document.createElement("th");
        tableHead.innerHTML = key;
        tableHead.classList.add("precakeHead");
        newRow.appendChild(tableHead);

        let newCell = document.createElement("td");
        newCell.innerHTML = object[key];
        newCell.classList.add("precakeCell");
        newRow.appendChild(newCell);

        cakeTable.appendChild(newRow);
    }

    //add info sheet to back of card
    backCard.appendChild(cakeTable);
    //combine card front and back in one div
    wholeCard.appendChild(backCard);
}
function randomCake()
{
    //used to ensure the three premade cakes arent identical
    let orderHistory = [];
    //0 = size, 1 = layers, 2 = flavors, 3 = frosting, 4 = message
    let fullOrder;

    //make three cake objects
    for(let x = 0; x != 3; x++)
    {
        do
        {
            //reset order string
            fullOrder = "";

            //set each detail for the order using random
            for(let i = 0; i != 5; i++)
            {
                //each random number will represent item in array for each section
                let rand = Math.floor(Math.random() * 3);
                fullOrder += rand.toString();
            }

        } //if cake already premade, restart loop (prevents repeat cakes)
        while(orderHistory.indexOf(fullOrder) != -1)

        //if cake unique, add it to the premade cakes
        orderHistory[x] = fullOrder;

        //make cake object using random values
        //uses fullOrder to find index for each section, so fullOrder[0] = index num for size array
        //then takes that index and finds it key, passes THAT to Cake constructor
        let newCake = new Cake(Object.keys(allSize)[(fullOrder[0])], allLayer[fullOrder[1]], Object.keys(allFlavor)[(fullOrder[2])],
            Object.keys(allFrosting)[(fullOrder[3])], allMessage[fullOrder[4]]);

        createCard(newCake, wholeCard[x]);
    }
}
