const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#idNum');
const inputDiv = document.getElementById("input-div");
const quizStart = document.getElementById("h5");
const userName = document.getElementById("user-name");
const userID = document.getElementById("user-id");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 60; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

startButton.addEventListener("click", function() {
  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    quizStart.textContent='Enter your name and ID.'
    return;
  }
  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0 ) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= 10
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Score", "Your Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ['#f76f51', "rgb(96, 184, 96)"],
      },
    ],
  },
});



      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {
  quizStart.textContent='Quiz started...'
nameField.style.display = 'none';
idField.style.display = 'none';
userName.textContent= `Name:${nameField.value}`
userID.textContent= `ID:${idField.value}`


  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    display.textContent = "Quiz has ended!";
    quizStart.textContent= "Quiz has ended!"

    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
  
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Kumasi", correct: false },
    ],
  },
  {
    question: 'Who is the coach of Manchester City"?',
    answers: [
      { text: "Ronaldino", correct: false },
      { text: "Pep Guardiola", correct: true },
      { text: "Sanchez.", correct: false },
      { text: "Messi", correct: false },
    ],
  },
  {
    question: "What is the name of the Uganda President?",
    answers: [
      { text: " Yoweri Museveni", correct: true },
      { text: "Mahama", correct: false },
      { text: "Nkrumah.", correct: false },
      { text: "Moses Afaa", correct: false },
    ],
  },
  {
    question: 'The name of the richest man?',
    answers: [
      { text: "Jeff Bezos", correct: false },
      { text: "Arnold", correct: false },
      { text: "Bernard Arnault.", correct: true },
      { text: "Mark Junior", correct: false },
    ],
  },
  {
    question: 'Who won Independent for Ghana"?',
    answers: [
      { text: "Charles Darwin", correct: false },
      { text: "Nathaniel", correct: false },
      { text: "Odamtten", correct: false },
      { text: " Kwame Nkrumah", correct: true },
    ],
  },
  {
    question: "When was marked the independent day for Ghana?",
    answers: [
      { text: "6th August 1956", correct: false },
      { text: "6th July 1957", correct: false },
      { text: "6th March 1957.", correct: true },
      { text: "6th June 1957", correct: false },
    ],
  },
  {
    question: "Which one is the largest continent?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which country has the largest population ?",
    answers: [
      { text: "India", correct: false },
      { text: "China", correct: true },
    ],
  },
  {
    question: "Who succeeded Trump as a president?",
    answers: [
      { text: " Joe Biden", correct: true },
      { text: "Obama", correct: false },
    ],
  },
  {
    question: "Name the current vice president of Ghana?",
    answers: [
      { text: "Daniel Akuffo", correct: false },
      { text: "Alex Oduro", correct: false },
      { text: "Pablo Escobar", correct: false },
      { text: "Dr.Mahamudu Bawumia", correct: true },
    ],
  },
];
