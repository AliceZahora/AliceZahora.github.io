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
    let id = "grade";
    const total = 5;
    const pointsPer = 100/total;

    for(let x = 0; x != allQuestions.length; x++)
    {
        if(allQuestions[x].checked && allQuestions[x].value == "correct")
        {
            correct += pointsPer;
            id = "grade" + allQuestions[x].id.charAt(0);
            document.getElementById(id).innerHTML = "&#10003;";

        }
    }

    calculateGrade(correct);
}
function calculateGrade(score)
{
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
