/*
    Alice Zahora
    Class: Web 200
    Assignment: 10
    Date: 11/03/2026
*/

function Cake(size, layers, flavor, frosting, message)
{
    this.size = size;
    this.layers = layers;
    this.flavor = flavor;
    this.frosting = frosting;
    this.message = message;
}

//premade choices for each section
let sizes = ["small", "medium", "large"];
let layers = [1, 2, 3];
let flavors = ["chocalate", "vanilla", "redVelvet"];
let frosting = ["chocolate", "vanilla", "lemon"];
let message = ["Happy Birthday","Love You", "Congrats!"];

//used to ensure the three premade cakes arent identical
let orderHistory = [];
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
            let rand = Math.floor(Math.random() * 2);
            fullOrder += rand.toString();
        }

    } //if cake already premade, restart loop (prevents repeat cakes)
    while(orderHistory.indexOf(fullOrder) != -1)

    //if cake unique, add it to the premade cakes
    orderHistory[x] = fullOrder;

    //make cake object using random values
    let newCake = new Cake(sizes[fullOrder[0]], layers[fullOrder[1]], flavors[fullOrder[2]],
        frosting[fullOrder[3]], message[fullOrder[4]]);

    console.log(fullOrder);
    console.log(newCake);
}


