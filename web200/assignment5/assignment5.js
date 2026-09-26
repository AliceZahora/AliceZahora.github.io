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

function saidYes()
{
    attemptNum = 0;
}
function saidNo(currButton)
{
    attemptNum++;

    let siblingButton = currButton.nextElementSibling;

    if(attemptNum == 1)
    {
        document.getElementById("dialogueText").innerHTML = "Pretty please," +
        "can you give me $100,000";
        currButton.style.backgroundColor = "#ff7272";
        siblingButton.style.backgroundColor = "#9fffa2";
    }
    else if(attemptNum < 3)
    {

    }
    else
    {
        answerNo.addEventListener("mouseover", function moveButton()
        {

        });
    }
}
