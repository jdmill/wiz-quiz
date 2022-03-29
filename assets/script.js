//Int Vars
var timeLeft = 20;
var questionIndex = 0;
var score = 0;

//Get elements by ID
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var quizBody = document.getElementById("quiz-box");
var startScreen = document.getElementById("start-screen");
var qScreen = document.getElementById("q-screen");
var qQuestion = document.getElementById("question");
var qChoices = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var scoreMessage = document.getElementById("score-message");
var feedbackArea = document.getElementById("feedback-area");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var olEl = document.getElementById("highscores");
var scoreScreen = document.getElementById("high-score-screen");
var highScoresButton = document.getElementById("high-score-button");
var playAgainButton = document.getElementById("play-again");

//get Element that hides windows
var hideScreen = document.getElementsByClassName("hide");

//creates header and div elements
var pEl = document.createElement("p");
var h2El = document.createElement("h2");
var divEl = document.createElement("div");
var liEl =document.createElement("li");

//creates button elements for questions
var q1 = document.createElement("button");
var q2 = document.createElement("button");
var q3 = document.createElement("button");
var q4 = document.createElement("button");

//creates an array of button creator elements
var q = [q1, q2, q3, q4];

//startButton event Listener
startButton.addEventListener("click", function () {
  qScreen.removeAttribute("class", "hide");
  startScreen.setAttribute("class", "hide");

  countdown();
  getQuestion();
});

//adds functionality to the submit button
submitButton.addEventListener("click", function () {
  var initials = initialsEl.value;
  var newScore = {
    userScore: score,
    userInitials: initials,
  };

  //parses the highscores object in local storage
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  console.log(highscores);

  console.log(newScore);
  //pushes the new score object to the highscores object
  highscores.push(newScore);

  
  for (var i = 0; i < highscores.length; i++){
    liEl.textContent = score.userInitials + ": " + score.userScore;
    olEl.appendChild(liEl);
  }
  //sets the updated array to local Storage
  endScreen.setAttribute("class", "hide");
  scoreScreen.removeAttribute("class","hide");

});

highScoresButton.addEventListener("click", function (){
  startScreen.setAttribute("class", "hide");
  endScreen.setAttribute("class", "hide");
  scoreScreen.removeAttribute("class","hide");
});

playAgainButton.addEventListener("click", function(){
  scoreScreen.setAttribute("class", "hide");
  startScreen.removeAttribute("class","hide");
});

//getQuestion function - retrieves a question from the questions object
function getQuestion() {
  //Finishes game if all questions have been answered
  if (questionIndex === Object.keys(questions).length) {
    qScreen.setAttribute("class", "hide");
    endScreen.removeAttribute("class", "hide");
    console.log("Game finished");
    questionIndex = 0;
    score = timeLeft;
    scoreMessage.textContent = "Your Final score is " + score;
    timeLeft = 0;
  }

  //sets current question to question index
  var currentQuestion = questions[questionIndex];
  //creates a current options array
  var currentOptions = questions[questionIndex].options;

  //sets h2 question to question value in questions object
  qQuestion.textContent = currentQuestion.question;

  //appends the questions to the question header element
  qQuestion.appendChild(h2El);

  //creates a button for each question
  for (var i = 0; i < currentOptions.length; i++) {
    q[i].textContent = currentOptions[i];
    qChoices.appendChild(q[i]);

    //adds click event listener to each button
    q[i].onclick = checkAnswer;
  }
}

//checks text content of button and compares to answer in questions object. Then runs appropriate logic
function checkAnswer() {
  var feedback = "";
  var resetTime = 4;

  //creates feedback and deducts points
  if (this.textContent === questions[questionIndex].answer) {
    feedback = "Correct!";
  } else {
    timeLeft -= 10;
    feedback = "Incorrect!";
  }

  //sets feedback area text content
  feedbackArea.textContent = feedback;
  feedbackArea.appendChild(pEl);
  feedbackArea.removeAttribute("class", "hide");
  questionIndex++;

  getQuestion();
  resetFeed(resetTime);
  //console.log(questionIndex);
}

function logHighScores(score) {
  var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
  liEl.textContent = score.initials + ": " + score.score;
  olEl.appendChild(liEl);
  console.log(highScores);
  //highScreen.removeAttribute("class", "hide");
}

//timer function
function countdown() {
  var timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timerEl.textContent = 0;
      qScreen.setAttribute("class", "hide");
      endScreen.removeAttribute("class", "hide");
      console.log("Game finished");
      questionIndex = 0;

      //call function to input name to high scores
      //bring to highscores page
      //restart game
    }
  }, 1000);
}

//Resets feed after interval of time
function resetFeed(time) {
  var resetInterval = setInterval(function () {
    time--;

    if (time === 0) {
      clearInterval(resetInterval);
      feedback = "";
      feedbackArea.setAttribute("class", "hide");
    }
  }, 1000);
}
