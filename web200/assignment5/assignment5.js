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
           onclick for yes triggers text and style (reset) changes
        2) mouseover for no triggers element move and text changes (uses addEventListener)
        3) mouseleave for yes triggers element move (uses addEventListener)
        4) onmousemove for window triggers element move
*/

let attemptNum = 0;

const noButton = document.getElementById("answerNo");
const yesButton = document.getElementById("answerYes");
const promptText = document.getElementById("promptText");
const dialog = document.getElementById("dialogBox");

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const particleArray = [];

function saidYes()
{
    reset();

    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    createFirework(x, y);
    particleArray.sort(compare);

    animate();

    dialog.showModal();
}
class Particle
{
    constructor(x,y)
    {
        this.radius = Math.random() * 2;
        this.randR = Math.random() * 255;
        this.randG = Math.random() * 255;
        this.randB = Math.random() * 255;
        this.opacity = 1;
        this.x = x;
        this.y = y;
    }
    drawCircle()
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

        context.fillStyle = "rgb(" + this.randR + ", " + this.randG + ", " + this.randB + ", " + this.opacity + ")";
        context.fill();

        context.strokeStyle = "rgb(" + this.randR + ", " + this.randG + ", " + this.randB + ", " + this.opacity + ")";
        context.stroke();
    }

}
function createFirework(x, y)
{
    let spaceX = 0;
    let spaceY = 0;

    let particle = new Particle(x,y)
    particleArray.push(particle);

    for(let i = 0; i!=30; i++)
    {
        spaceX = Math.random() * 5;
        spaceY = Math.random() * 5;

        particle = new Particle(x + spaceX, y + spaceY);
        particleArray.push(particle);
    }
}
function animate()
{
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let animationID = requestAnimationFrame(animate);

    let mainParticle = particleArray[Math.floor(particleArray.length/2)];
    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = 0;
    let opacity = mainParticle.opacity;

    for(let i = 0; i != particleArray.length; i++)
    {
        dx = particleArray[i].x - mainParticle.x;
        dy = particleArray[i].y - mainParticle.y;
        particleArray[i].drawCircle();

        particleArray[i].x += (dx/8);
        particleArray[i].y += (dy/8);
        particleArray[i].opacity -= .02;
        opacity = particleArray[i].opacity;
    }

    if(opacity <= 0)
    {
        //cancelAnimationFrame(animationID);
        particleArray.length = 0;

        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;

        createFirework(x, y);
        particleArray.sort(compare);
    }
}
function compare(a, b)
{
    if(a.x < b.x)
    {
        return -1;
    }
    else if(a.x > b.x)
    {
        return 1;
    }

    return 0;
}
function saidNo()
{
    attemptNum++;

    //emphasizes buttons uisng colors on first rejection
    if(attemptNum == 1)
    {
        promptText.innerHTML = "Pretty please," +
        "can you give me $100,000";
        noButton.style.backgroundColor = "#ff7272";
        yesButton.style.backgroundColor = "#9fffa2";
    }
    //on next couple rejections, emphasizes "yes" button using sizing
    else if(attemptNum <= 3)
    {
        if(attemptNum == 2)
        {
            promptText.innerHTML = "PRETTY please," +
            "can you give me $100,000";
        }
        else
        {
            promptText.innerHTML = "PRETTY PLEASE," +
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
        promptText.innerHTML = "I know you want to give me $100,000 :D";
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
    promptText.innerHTML = "Will you give me $100,000?";
}

