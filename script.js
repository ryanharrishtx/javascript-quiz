const Questions = [{
    q: "Inside which HTML element do we put the JavaScript?",
    a: [{text: "<javascript>", isCorrect: false}, {text: "<js>", isCorrect: false}, {text: "<script>", isCorrect: true}, {text: "<scripting>", isCorrect: false}]
},
{
    q: "What is the correct syntax for referring to an external script called `xxx.js`?",
    a: [{text: `<script src="xxx.js">`, isCorrect: true}, {text: `<script name="xxx.js">`, isCorrect: false}, {text: `<script href="xxx.js">`, isCorrect: true}]
},
{
    q: "How do you create a function?",
    a: [{text: `function:myFunction()`, isCorrect: false}, {text: `function=myFunction()`, isCorrect: false}, {text: `function=myFunction()`, isCorrect: false}, {text: `function myFunction()`, isCorrect: true}]
},
{
    q: `How do you call a function named "myFunction"?`,
    a: [{text: `myFunction()`, isCorrect: true}, {text: `call myFunction()`, isCorrect: false}, {text: `call function myFunction`, isCorrect: false}, {text: `Call.myFunction()`, isCorrect: false}]
},
{
    q: "How do you write an IF statement in JavaScript?",
    a: [{text: `if i = 5 then`, isCorrect: false}, {text: `if (i === 5)`, isCorrect: true}, {text: `if i == 5 then`, isCorrect: false}, {text: `if i = 5 then`, isCorrect: false}]
},
]

let currentQuestion = 0;
let score = 0
let seconds = 60;

var startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    timer(seconds);
});

    function displayQuestion() {
        const question = document.getElementById("question");
        const quiz = document.getElementById("answers");

        question.innerHTML = Questions[currentQuestion].q;
        answers.innerHTML = "";

        for (let i = 0; i < Questions[currentQuestion].a.length; i++) {
            const answerDiv = document.createElement("div");
            const choice = document.createElement("input");
            const answerLabel = document.createElement("label");

            choice.type = "radio";
            choice.name = "answer";
            choice.value = i;

            answerLabel.textContent = Questions[currentQuestion].a[i].text;

            answerDiv.appendChild(choice);
            answerDiv.appendChild(answerLabel);
            quiz.appendChild(answerDiv);
        }
    } displayQuestion();

function loadScore() {
    const scoreDiv = document.getElementById("score");
    scoreDiv.style.display = "flex";
    scoreMessage = `You scored ${score} out of ${Questions.length}`;

    scoreDiv.innerHTML = (scoreMessage);
}

function timer(seconds) {
    const timerDiv = document.getElementById("timer");
    let counter = seconds;

    const interval = setInterval(() => {
        timerDiv.innerText = counter;
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            document.getElementById("quiz").remove();
            loadScore();
        }
    }, 1000);
}

function nextQuestion() {
    if (currentQuestion < Questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        document.getElementById("quiz").remove();
        loadScore();
    }
}

function checkAnswer() {
    const selectedAnswer = parseInt(document.querySelector('input[name="answer"]:checked').value);

    if (Questions[currentQuestion].a[selectedAnswer].isCorrect) {
        score++;
        console.log("Correct");
        nextQuestion();
    } else {
        nextQuestion();
    }
};


// Function to display high scores
function displayHighScores() {
    const highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = ""; // Clear existing high scores
  
    // Retrieve high scores from local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);
  
    // Display high scores in the list
    highScores.forEach((scoreObj) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
      highScoresList.appendChild(listItem);
    });
  }
  
  // Function to save a high score
  function saveHighScore(initials, score) {
    // Retrieve existing high scores or create an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Add the new high score
    highScores.push({ initials, score });
  
    // Store the updated high scores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    // Update the displayed high scores
    displayHighScores();
  }
  
  // Event listener for submitting a score
  const submitScoreButton = document.getElementById("submit-score");
  submitScoreButton.addEventListener("click", () => {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value.trim();
    
    if (initials !== "") {
      // Save the high score
      saveHighScore(initials, score);
      initialsInput.value = ""; // Clear the input field
    }
  });
  
  // Call displayHighScores to initially display any existing high scores
  displayHighScores();  