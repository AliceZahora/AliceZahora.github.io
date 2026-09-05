/*
Alice Zahora
Class: Web 200
Assignment: 2
Date: 09/05/2026

Var vs Let vs Const:
    While all of these are used to declare variables, their slight
    differences make them best for different applications. Unlike 
    the other two, 'var' can be redeclared. It is also more global,
    accessible outside functions and brackets where it was originally declared.
    This cannot be said for 'let' or 'const', which can only be used within their
    origin block. While 'let' can be reassigned, it cannot be redeclared.
    'Const', on the other hand, must have one static value and cannot be reassigned.
*/

let binaryNum = 10;
let joke = "There are " + binaryNum + " types of people in the world." +
            "Those who understand binary and those who don't";
const pi = 3.14159;

document.getElementById("binaryJoke").innerHTML = joke;

function reward(radio)
{
    var understandBool = (radio.value === "true");

    if(understandBool)
    {
        var response = "Congratulations! Here's some pi! --> " + pi;
    }
    else
    {
        var response = "That's ok! Have some pi to cheer you up --> " + pi;
    }

    document.getElementById("consolation").innerHTML = response;
}

