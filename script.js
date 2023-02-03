let questions = [

{'question': 'Wer hat HTML erfunden?',
 'answer_1': 'Robbie Williams',
 'answer_2': 'Lady Gaga',
 'answer_3': 'Tim Berners-Lee',
 'answer_4': 'Justin Bieber',
 'right_answer': 3
},

{'question': 'Was bedeutet das HTML Tag &lt;a&gt',
 'answer_1': 'Text Fett',
 'answer_2': 'Container',
 'answer_3': 'Ein Link',
 'answer_4': 'Kursiv',
 'right_answer': 3
},

{'question': 'Wie bindet man eine Website in eine Webseite ein?',
 'answer_1': '&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;',
 'answer_2': '&lt;iframe&gt;',
 'answer_3': '&lt;frame&gt;',
 'answer_4': '&lt;frameset&gt;',
 'right_answer': 2
},

{'question': 'Welches Attribut kann man NICHT für Textarea verwenden?',
 'answer_1': 'readonly',
 'answer_2': 'max',
 'answer_3': 'from',
 'answer_4': 'spellcheck',
 'right_answer': 1
},

{'question': 'Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem atribut title aus?',
 'answer_1': 'a[title]{...}',
 'answer_2': 'a > title {...}',
 'answer_3': 'a.title {...}',
 'answer_4': 'a=title {...}',
 'right_answer': 1
},

{'question': 'Wie definiert man in JavaScript eine Variable?',
 'answer_1': 'let 100 = rate;',
 'answer_2': '100 = let rate;',
 'answer_3': 'rate = 100;',
 'answer_4': 'let rate = 100;',
 'right_answer': 4
}
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('./audio/correct.mp3');
let audioWrong = new Audio('./audio/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('next-button').disabled = true;
    showQuestion();
}

function showQuestion() {
    if(gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
}
}

function gameIsOver() {                        // Die Funktion validiert die Bedingung und gibt entweder true oder false aus
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('all-questions-end').innerHTML = questions.length;
    document.getElementById('rightQuestions').innerHTML = rightQuestions;
    document.getElementById('headerImage').src = './img/trophy2.jpg';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('currentQuestionNumber').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(selectedQuestionNumber == question['right_answer']){
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioWrong.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;          // Variable wird von 0 auf 1 erhöht
    document.getElementById('next-button').disabled = true;
    resetAnswertButtons();
    showQuestion();
}

function resetAnswertButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame(){
    document.getElementById('headerImage').src = './img/quiztime.jpg'; // Bild ändern
    document.getElementById('endScreen').style = 'display: none'; // endScreen ausblenden
    document.getElementById('questionBody').style = '';  // Quiz Body neu laden

    rightQuestions = 0;   // Variable auf 0 setzen um von vorne zu starten bzw. die Erste Frage aufzurufen.
    currentQuestion = 0;  // Variable auf 0 setzen um von vorne zu starten bzw. die Erste Frage aufzurufen.
    init();  // App neu starten
}







