/*
    Alice Zahora
    Class: Web 200
    Assignment: 6
    Date: 10/04/2026
*/

document.getElementById("turnIn").addEventListener("click", checkAnswers);

function checkAnswers()
{
    let allQuestions = document.getElementsByClassName("quizQuestion");
    let correct = 0;
    const total = 4;
    const pointsPer = 100/total;

    for(let x = 0; x != allQuestions.length; x++)
    {
        if(allQuestions[x].checked && allQuestions[x].value == "correct")
        {
            correct += pointsPer;
        }
    }

    calculateGrade(correct);
}
function calculateGrade(score)
{
    console.log(score);
    let gradeLetter = document.getElementById("finalGradeLetter");

    switch(Math.floor(score/10))
    {
        case 10:
        case 9:
            gradeLetter.innerHTML = "A";
            break;
        case 8:
            gradeLetter.innerHTML = "B";
            break;
        case 7:
            gradeLetter.innerHTML = "C";
            break;
        case 6:
            gradeLetter.innerHTML = "D";
            break;
        default:
            gradeLetter.innerHTML = "F";
    }

}
