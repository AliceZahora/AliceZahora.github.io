let binaryNum = 10;
let joke = "There are " + binaryNum + " types of people in the world. Those who understand binary" +
           ", and those who don't";
const pi = 3.14159;

document.getElementById("binaryJoke").innerHTML = joke;

function reward(radio)
{
    var understandBool = (radio.value === "true");

    if(understandBool)
    {
        window.alert("wha");
        var response = "Congratulations! Here's some pi! --> " + pi;
    }
    else
    {
        var response = "That's ok! Have some pi to cheer you up --> " + pi;
    }

    document.getElementById("consolation").innerHTML = response;
}

