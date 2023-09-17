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
  
  let currentQuestion = 0;
  let score = 0;
  let seconds = 60;
  let initialTime = 60;
  let timerInterval;
  
  var startButton = document.getElementById("start-button");
  
  startButton.addEventListener("click", function () {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
    timer(seconds);
  });
  
  function displayQuestion() {
    const question = document.getElementById("question");
    const quiz = document.getElementById("answers");
  
    question.innerHTML = Questions[currentQuestion].q;
    answers.innerHTML = ""; // clears out previous answers
  
    for (let i = 0; i < Questions[currentQuestion].a.length; i++) {
      const answerButton = document.createElement("button");
      answerButton.textContent = Questions[currentQuestion].a[i].text;
  
      answerButton.addEventListener("click", function () {
        checkAnswer(i);
      });
      quiz.appendChild(answerButton);
    }
  }
  displayQuestion();
  
  function loadScore() {
    const scoreDiv = document.getElementById("score");
    scoreDiv.style.display = "flex";
    scoreMessage = `You scored ${score} out of ${Questions.length}`;
    scoreDiv.innerHTML = scoreMessage;
  }
  
  function timer(seconds) {
    const timerDiv = document.getElementById("timer");
    let counter = seconds;
  
    timerInterval = setInterval(() => {
      timerDiv.innerText = counter;
      counter--;
      if (counter <= 10) {
        document.getElementById("timer").style.color = "red";
      }

      if (counter < 0) {
        clearInterval(timerInterval);
        document.getElementById("quiz").remove();
        loadScore();
      }
    }, 1000);
  }
  
  function decrementTimer() {
    seconds -= 5;
    if (seconds < 0) {
      seconds = 0;
    }
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
  
  function checkAnswer(selectedIndex) {
    if (Questions[currentQuestion].a[selectedIndex].isCorrect) {
      score++;
      console.log("Correct");
    } else {
      console.log("Incorrect");
      decrementTimer(); // Decrement the timer by 5 seconds
    }
  
    nextQuestion();
  }
  