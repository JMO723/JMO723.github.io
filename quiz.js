function gradedQuiz() {
    const form = document.getElementById('browserQuiz');
    let score = 0;

    if (form.q1.value === 'a') score++;

    const q2 = Array.from(form.querySelectorAll('input[name="q2"]:checked')).map(cb => cb.value);
    if (
        q2.length == 2 && 
        q2.includes('b') &&
        q2.includes('c')
    ) score++;

    if (form.q3.value === 'd') score++;

    const q4 = form.q4.value;
    if (q4 === 'mozilla' || q4 === 'Mozilla') score++;

    const q5 = form.q5.value;
    if (q5 === 'Arpa' || q5 === 'arpa') score++;

    document.getElementById('result').textContent = 'Grade: ' + score + '/5'

}

function quizRestart() {
    document.getElementById('browserQuiz').reset();
    document.getElementById('result').textContent = '';
}