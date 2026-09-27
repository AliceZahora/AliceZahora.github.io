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

    -- SOLUTION CHECKLIST --
        1) onclick for no triggers color, size, and text changes
           onclick for yes triggers text changes
        2) mouseover for no triggers element move and text changes (uses addEventListener)
        3) mouseleave for yes triggers element move (uses addEventListener)
        4)
*/

let attemptNum = 0;
let noButton = document.getElementById("answerNo");
let yesButton = document.getElementById("answerYes");
let promptBox = document.getElementById("dialogueText");

function saidYes()
{
    promptBox.innerHTML = "Aw, thank you! I knew you'd be generous :D";
    reset();
    promptBox.innerHTML = "Will you give me $100,000?";
}
function saidNo()
{
    attemptNum++;

    //emphasizes buttons uisng colors on first rejection
    if(attemptNum == 1)
    {
        promptBox.innerHTML = "Pretty please," +
        "can you give me $100,000";
        noButton.style.backgroundColor = "#ff7272";
        yesButton.style.backgroundColor = "#9fffa2";
    }
    //on next couple rejections, emphasizes "yes" button using sizing
    else if(attemptNum <= 3)
    {
        if(attemptNum == 2)
        {
            promptBox.innerHTML = "PRETTY please," +
            "can you give me $100,000";
        }
        else
        {
            promptBox.innerHTML = "PRETTY PLEASE," +
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
    //makes "no" button start running away
    else
    {
        noButton.style.position = "absolute";
        relocate();

        noButton.addEventListener("mouseover", relocate);
    }
}
function relocate()
{
    //picks random coordinate in viewport for button
    let randomX = Math.random() * 90;
    let randomY = Math.random() * 90;

    //moves button to the random coord
    noButton.style.left = randomX + "vw";
    noButton.style.top = randomY + "vh";

    attemptNum++;

    //after a bit, "yes" button becomes a trap and sticks to pointer after mouse enters
    if(attemptNum > 7)
    {
        promptBox.innerHTML = "I know you want to give me $10,000 :D";
        yesButton.addEventListener("mouseleave", triggerFollow);
    }

    //if still hasn't moused over "yes", moves "no" on top of "yes" to trick into trap
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

    //makes "yes" button follow the mouse
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

