//Timer element
var timerEl = document.getElementById('timer');

//start button element
var startButton = document.getElementById('start-button');

//quiz container
var quizBody = document.getElementById('quiz-box');

//start Screen element
var startScreen = document.getElementById('start-screen');

//question screen element
var qScreen = document.getElementById('q-screen');

//question element in question screen
var qQuestion = document.getElementById('question');

// choices element in question screen
var qChoices = document.getElementById('choices');

//end screen element
var endScreen = document.getElementById('end-screen');

//hide screen
var hideScreen = document.getElementsByClassName('hide');

//index of current question
var questionIndex = 0;

//creates header and div elements
var h2El = document.createElement('h2');
var divEl = document.createElement('div');

//creates button elements for questions
var q1 = document.createElement('button');
var q2 = document.createElement('button');
var q3 = document.createElement('button');
var q4 = document.createElement('button');

//creates an array of button creator elements
var q = [q1, q2,q3, q4];


//startButton event Listener
    startButton.addEventListener("click", function(){
    qScreen.removeAttribute("class", "hide");
    startScreen.setAttribute("class", "hide");

    countdown();
    getQuestion();
});

//getQuestion function - retrieves a question from the questions object
function getQuestion() {
    //sets current question to question index
    var currentQuestion = questions[questionIndex];
    console.log(questions[questionIndex].question);
    

    //sets h2 question to question value in questions object
    qQuestion.textContent = currentQuestion.question;
    
    //appends the questions to the question header element
    qQuestion.appendChild(h2El);

    //creates a current options array
    var currentOptions = questions[1].options;

    //creates a button for each question
    for(var i = 0; i < currentOptions.length; i++){
        q[i].textContent = i + 1 + ": " + currentOptions[i];
        qChoices.appendChild(q[i]);
        console.log(currentOptions[i]);
    }
}


//timer function
function countdown() {
    var timeLeft = 5;

    var timeInterval = setInterval(function() {

        timerEl.textContent = timeLeft;
        timeLeft--;

        if(timeLeft === 0){
            clearInterval(timeInterval);
            timerEl.textContent = 0;
            
            //call function to input name to high scores
            //bring to highscores page
            //restart game
        }
    }, 1000);
};

