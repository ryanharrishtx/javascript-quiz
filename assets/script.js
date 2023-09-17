// Quiz questions and answers
const Questions = [
  {
    q: "Inside which HTML element do we put the JavaScript?",
    a: [
      { text: "<javascript>", isCorrect: false },
      { text: "<js>", isCorrect: false },
      { text: "<script>", isCorrect: true },
      { text: "<scripting>", isCorrect: false },
    ],
  },
  {
    q: "What is the correct syntax for referring to an external script called `xxx.js`?",
    a: [
      { text: `<script src="xxx.js">`, isCorrect: true },
      { text: `<script name="xxx.js">`, isCorrect: false },
      { text: `<script href="xxx.js">`, isCorrect: false },
    ],
  },
  {
    q: "How do you create a function?",
    a: [
      { text: `function:myFunction()`, isCorrect: false },
      { text: `function=myFunction()`, isCorrect: false },
      { text: `function=myFunction()`, isCorrect: false },
      { text: `function myFunction()`, isCorrect: true },
    ],
  },
  {
    q: `How do you call a function named "myFunction"?`,
    a: [
      { text: `myFunction()`, isCorrect: true },
      { text: `call myFunction()`, isCorrect: false },
      { text: `call function myFunction`, isCorrect: false },
      { text: `Call.myFunction()`, isCorrect: false },
    ],
  },
  {
    q: "How do you write an IF statement in JavaScript?",
    a: [
      { text: `if i = 5 then`, isCorrect: false },
      { text: `if (i === 5)`, isCorrect: true },
      { text: `if i == 5 then`, isCorrect: false },
      { text: `if i = 5 then`, isCorrect: false },
    ],
  },
];

// Global variables
let currentQuestion = 0;
let score = 0;
let seconds = 60;
let initialTime = 60;
let timerInterval;

// Start button
var startButton = document.getElementById("start-button");

// Start button event listener - when clicked, the start screen is hidden and the quiz is displayed, and the timer starts
startButton.addEventListener("click", function () {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz").style.display = "flex";
  timer(seconds);
});

// Function to display the questions and answers
function displayQuestion() {
  const question = document.getElementById("question");
  const quiz = document.getElementById("answers");

  question.innerHTML = Questions[currentQuestion].q;
  answers.innerHTML = ""; // Clear the answers div before displaying the next question

  // Loop through the answers array and create a button for each answer
  for (let i = 0; i < Questions[currentQuestion].a.length; i++) {
    const answerButton = document.createElement("button");
    answerButton.textContent = Questions[currentQuestion].a[i].text;

    answerButton.addEventListener("click", function () {
      checkAnswer(i);
    });
    quiz.appendChild(answerButton);
  }
} displayQuestion();

// Function to start the timer
function timer(seconds) {
  const timerDiv = document.getElementById("timer");
  let counter = seconds;

  timerInterval = setInterval(() => {
    timerDiv.innerText = counter;
    counter--;
    if (counter < 10) {
      document.getElementById("timer").style.color = "red";
    }

    if (counter < 0) {
      clearInterval(timerInterval);
      document.getElementById("quiz").remove();
      loadScore();
    }
  }, 1000);
}

// Function to load the score screen
function loadScore() {
  const scoreDiv = document.getElementById("score");
  const finalScore = document.getElementById("final-score");
  scoreDiv.style.display = "flex";
  scoreMessage = `${score} out of ${Questions.length}`;
  finalScore.innerHTML = scoreMessage;
}

// Function to move to the next question
function nextQuestion() {
  if (currentQuestion < Questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    document.getElementById("quiz").remove();
    loadScore();
  }
}

// Function to check if the answer is correct
function checkAnswer(selectedIndex) {
  if (Questions[currentQuestion].a[selectedIndex].isCorrect) {
    score++;
    console.log("Correct");
  } else {
    console.log("Incorrect");
    seconds -= 5;
  }
  nextQuestion();
}