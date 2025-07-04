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
    if (q5 === 'Arpa' || q5 === 'arpa' || q5 ==='ARPA') score++;

    if (form.q6.value === 'b') score++;

    document.getElementById('result').textContent = 'Grade: ' + score + '/6' //Displays final score

    //Displays correct answers
    document.getElementById('answers').innerHTML = `
    <b>Answer Key:</b><br>
    <b>Q1.</b> Sir Tim Berners-Lee<br>
    <b>Q2.</b> Netscape Navigator ; Internet Explorer<br> 
    <b>Q3.</b> Google Chrome<br>
    <b>Q4.</b> Mozilla<br>
    <b>Q5.</b> ARPA<br>
    <b>Q6.</b> NCSA Mosaic
    `;
}


//Function to restart quiz
//Reference: https://stackoverflow.com/questions/3786694/how-to-reset-clear-form-through-javascript
function quizRestart() {
    document.getElementById('browserQuiz').reset();
    document.getElementById('result').textContent = ''; //Resets the quiz selections and final score display
    document.getElementById('answers').innerHTML = ''; //Removes Answer Key
}