/*
    Alice Zahora
    Class: Web 200
    Assignment: 5
    Date: 09/27/2026

    Build an interactive page that responds to at least four different event types — such as click, mouseover, keypress, and a page load event.
        - Extra credit for the more creative your events are...
    Each event should trigger a function that visibly changes something on the page (text, color, content).
        - Use addEventListener for at least two of them.
        - add "events.html" to your repository in your web200 folder
        - use an external JS file. (I suggest naming it "events.js")
        - Post the public link to your assignment in Blackboard.
*/

let attemptNum = 0;
let noButton = document.getElementById("answerNo");

function saidYes()
{
    attemptNum = 0;
}
function saidNo()
{
    attemptNum++;

    let siblingButton = noButton.nextElementSibling;
    let dialogueBox = document.getElementById("dialogueText");

    if(attemptNum == 1)
    {
        dialogueBox.innerHTML = "Pretty please," +
        "can you give me $100,000";
        noButton.style.backgroundColor = "#ff7272";
        siblingButton.style.backgroundColor = "#9fffa2";
    }
    else if(attemptNum <= 3)
    {
        if(attemptNum == 2)
        {
            dialogueBox.innerHTML = "PRETTY please," +
            "can you give me $100,000";
        }
        else
        {
            dialogueBox.innerHTML = "PRETTY PLEASE," +
            "can you give me $100,000";
        }

        noButton.style.width = noButton.offsetWidth/1.2 + "px";
        noButton.style.height = noButton.offsetHeight/1.2 + "px";
        noButton.style.fontSize = parseInt((getComputedStyle(noButton))
        .getPropertyValue("font-size"))/1.2 + "px";

        siblingButton.style.width = (siblingButton.offsetWidth * 1.5) + "px";
        siblingButton.style.height = (siblingButton.offsetHeight * 1.5) + "px";
        siblingButton.style.fontSize = parseInt((getComputedStyle(siblingButton))
        .getPropertyValue("font-size"))*1.5 + "px";
    }
    else
    {
        noButton.style.position = "absolute";
        relocate();

        answerNo.addEventListener("mouseover", relocate);
    }
}
function relocate()
{
}
