//Javascript for Graded Quiz
//Reference: https://www.youtube.com/watch?v=rCVqQ8NKU2M
function gradedQuiz() {
    const form = document.getElementById('browserQuiz'); //get form elements
    let score = 0; //initialize score

    if (form.q1.value === 'a') score++; //if answer = a add 1 to score


    //Question 2
    //Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox
    const q2 = Array.from(form.querySelectorAll('input[name="q2"]:checked')).map(cb => cb.value);
    if (
        q2.length == 2 && 
        q2.includes('b') && //If there are two answers and both b and c are selected + 1 to score
        q2.includes('c')
    ) score++;

    if (form.q3.value === 'd') score++;

    const q4 = form.q4.value;
    if (q4 === 'mozilla' || q4 === 'Mozilla') score++; //If answer is mozilla or Mozilla + 1 to score

    const q5 = form.q5.value;
    if (q5 === 'Arpa' || q5 === 'arpa') score++;

    document.getElementById('result').textContent = 'Grade: ' + score + '/5' //Displays final score

}


//Function to restart quiz
//Reference: https://stackoverflow.com/questions/3786694/how-to-reset-clear-form-through-javascript
function quizRestart() {
    document.getElementById('browserQuiz').reset();
    document.getElementById('result').textContent = ''; //Resets the quiz selections and final score display
}