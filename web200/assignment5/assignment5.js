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
let yesButton = document.getElementById("answerYes");
let dialogueBox = document.getElementById("dialogueText");

function saidYes()
{
    dialogueBox.innerHTML = "Aw, thank you! I knew you'd be generous :D";
    reset();
    dialogueBox.innerHTML = "Will you give me $100,000?";
}
function saidNo()
{
    attemptNum++;

    if(attemptNum == 1)
    {
        dialogueBox.innerHTML = "Pretty please," +
        "can you give me $100,000";
        noButton.style.backgroundColor = "#ff7272";
        yesButton.style.backgroundColor = "#9fffa2";
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

        yesButton.style.width = (yesButton.offsetWidth * 1.5) + "px";
        yesButton.style.height = (yesButton.offsetHeight * 1.5) + "px";
        yesButton.style.fontSize = parseInt((getComputedStyle(yesButton))
        .getPropertyValue("font-size"))*1.5 + "px";
    }
    else
    {
        noButton.style.position = "absolute";
        relocate();

        noButton.addEventListener("mouseover", relocate);
    }
}
function relocate()
{
    let randomX = Math.random() * 90;
    let randomY = Math.random() * 90;

    noButton.style.left = randomX + "vw";
    noButton.style.top = randomY + "vh";

    attemptNum++;

    if(attemptNum > 7)
    {
        dialogueBox.innerHTML = "I know you want to give me $10,000 :D";
        yesButton.addEventListener("mouseleave", triggerFollow);
    }

    if(attemptNum == 8)
    {
        noButton.style.left = "";
        noButton.style.top = "";
    }
}
function triggerFollow() {
    relocate();
    noButton.removeEventListener("mouseover", relocate);
    yesButton.removeEventListener("mouseleave", triggerFollow);
    window.onmousemove = function follow(event) {
        yesButton.style.position = "absolute";

        let xOffset = yesButton.offsetWidth;
        let yOffset = yesButton.offsetHeight;

        yesButton.style.left = (event.clientX - xOffset) + "px";
        yesButton.style.top = (event.clientY - yOffset) + "px";
    };
}
function reset()
{
    noButton.removeEventListener("mouseover", relocate);
    yesButton.removeEventListener("mouseleave", triggerFollow);
    noButton.removeAttribute('style');
    yesButton.removeAttribute('style');
    window.onmousemove = null;
    attemptNum = 0;
}

