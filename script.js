const quizData = [
  {
    question: "What is the smallest unit of matter?",
    options: ["Molecule", "Atom", "Proton", "Electron"],
    answer: 1,
    explanation: "An atom is the smallest unit of ordinary matter that forms a chemical element."
  },
  {
    question: "Which country has the most natural lakes?",
    options: ["Finland", "Canada", "Russia", "Sweden"],
    answer: 1,
    explanation: "Canada has the most natural lakes of any country in the world, with over 2 million lakes."
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
    explanation: "JavaScript is the programming language that runs inside the browser."
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks Text Management Language",
      "Hyper Transfer Markup Language"
    ],
    answer: 0,
    explanation: "HTML stands for HyperText Markup Language."
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: 2,
    explanation: "React was developed by Facebook (now Meta)."
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const explanationEl = document.getElementById("explanation");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const timeTakenEl = document.getElementById("timeTaken");
const accuracyEl = document.getElementById("accuracy");

let currentQuestion = 0;
let score = 0;
let selected = false;
let startTime = Date.now();

function startTimer() {
  setInterval(() => {
    let seconds = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function loadQuestion() {
  selected = false;
  explanationEl.classList.add("hidden");
  nextBtn.disabled = true;

  let q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, idx) => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectOption(idx, btn);
    optionsEl.appendChild(btn);
  });
}

function selectOption(idx, btn) {
  if (selected) return;
  selected = true;
  let q = quizData[currentQuestion];

  if (idx === q.answer) {
    btn.classList.add("correct");
    score++;
    explanationEl.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
  } else {
    btn.classList.add("wrong");
    document.querySelectorAll(".option")[q.answer].classList.add("correct");
    explanationEl.innerHTML = `<strong>Wrong!</strong> ${q.explanation}`;
  }

  explanationEl.classList.remove("hidden");
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// function showResult() {
//   quizBox.classList.add("hidden");
//   resultBox.classList.remove("hidden");

//   let totalTime = Math.floor((Date.now() - startTime) / 1000);
//   let accuracy = ((score / quizData.length) * 100).toFixed(2);

//   scoreEl.textContent = `Correct Answers: ${score}/${quizData.length}`;
//   timeTakenEl.textContent = `Time Taken: ${totalTime} seconds`;
//   accuracyEl.textContent = `Accuracy: ${accuracy}%`;
// }

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let totalTime = Math.floor((Date.now() - startTime) / 1000);
  let accuracy = ((score / quizData.length) * 100).toFixed(2);

  document.getElementById("score").textContent = `Score: ${score}/${quizData.length}`;
  document.getElementById("timeTaken").textContent = `Time: ${totalTime}s`;
  document.getElementById("accuracy").textContent = `Accuracy: ${accuracy}%`;
}


startTimer();
loadQuestion();
