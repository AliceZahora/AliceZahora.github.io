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
    "Chocolate" : "#583821",
    "Vanilla" : "#fbf6e1",
    "Red Velvet" : "#7e3437"
};
const allFrosting =
{
    "Chocolate" : "#412714",
    "Vanilla" : "#fff7d2",
    "Lemon" : "#fff879"
};
const allMessage = ["Happy Birthday!","Love You!", "Congrats!"];
const wholeCard = document.getElementsByClassName("wholeCard")
const allInputs = document.getElementsByTagName("input");

randomCake();
customCake();

for(let y = 0; y != allInputs.length; y++)
{
    allInputs[y].addEventListener("input", function () {
        console.log("hi");
    });
}
function Cake(size = "small", layers = 1, flavor = "chocolate", frosting = "chocolate", message)
{
    this.size = size;
    this.layers = layers;
    this.flavor = flavor;
    this.frosting = frosting;
    this.message = message;

    //changes any one object key to a new value
    this.changeOne = function (keyName, value)
    {
        this[keyName] = value;
    }
    //returns full name of cake
    this.fullFlavor = function ()
    {
        return this.frosting + " Frosted " + this.flavor + " Cake"
    }
}
//creates detail card for cake
function createCard(object, wholeCard)
{
    const cakeTable = document.createElement("table");
    cakeTable.classList.add("precakeTable");

    const backCard = document.createElement("div");
    backCard.classList.add("backCard");

    //iterates over all key value pairs for single cake object
    for (let key in object)
    {
        //ignore methods
        if(typeof(object[key]) != "function")
        {
            setStyles(wholeCard, object, key, object[key]);

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
    }

    //add info sheet to back of card
    backCard.appendChild(cakeTable);
    //combine card front and back in one div
    wholeCard.appendChild(backCard);
}
function setStyles(wholeCard, object, key, value)
{
    //retrieve all cake visuals from this card
    //0 = frosting, 1 = frosting drip, 2 = flavor, 3 = name
    const wholeCake = wholeCard.children[0].children;
    wholeCake[3].innerHTML = object.fullFlavor();

    if(key == "frosting")
    {
        wholeCake[0].style.backgroundColor = allFrosting[value];
        wholeCake[1].style.backgroundColor = allFrosting[value];
    }
    else if(key == "flavor")
    {
        wholeCake[2].style.backgroundColor = allFlavor[value];
    }
    else if(key == "size")
    {
        //change size of each part of cake graphic
        for(let i = 0; i != wholeCake.length - 1; i++)
        {
            wholeCake[i].style.width = allSize[value];
        }
    }
    else if(key == "layers")
    {
        wholeCake[2].style.height = value * 20 + "%";
    }
    //change message on cake
    else
    {
        wholeCake[0].children[0].innerHTML = value;
    }
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
function customCake()
{
    let custom = new Cake();
    console.log(custom);

}
