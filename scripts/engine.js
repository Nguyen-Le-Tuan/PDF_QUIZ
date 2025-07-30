// engine.js
let quizData = [];
let progress = {};
let currentIndex = 0;
let mode = "review";
let timerInterval;
let secondsElapsed = 0;

function loadQuiz() {
  quizData = loadFromStorage("quizData") || [];
  progress = loadFromStorage("progress") || {};
}

function startReviewMode() {
  mode = "review";
  currentIndex = 0;
  loadQuiz();
  clearInterval(timerInterval);
  const timer = document.getElementById("timer");
  if (timer) timer.textContent = "";
  renderQuestion();
}

function startTestMode() {
  mode = "test";
  currentIndex = 0;
  loadQuiz();

  const countSelect = document.getElementById("questionCount");
  let count = 10;
  if (countSelect) {
    const value = countSelect.value;
    count = value === "all" ? quizData.length : parseInt(value);
  }

  quizData = shuffleArray(quizData).slice(0, count);
  progress = {};
  saveToStorage("progress", {});

  secondsElapsed = 0;
  timerInterval = setInterval(updateTimer, 1000);

  renderQuestion();
}

function updateTimer() {
  secondsElapsed++;
  const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
  const secs = (secondsElapsed % 60).toString().padStart(2, '0');
  const timer = document.getElementById("timer");
  if (timer) timer.textContent = `⏱ ${mins}:${secs}`;
}

function submitAnswer(selected) {
  const q = quizData[currentIndex];
  const isCorrect = selected === q.correct;
  progress[q.id] = { selected, isCorrect };
  saveToStorage("progress", progress);

  if (mode === "review") {
    renderFeedback(isCorrect, q);
  } else {
    currentIndex++;
    if (currentIndex < quizData.length) renderQuestion();
    else {
      clearInterval(timerInterval);
      renderSubmitButton();
    }
  }
}

function renderSubmitButton() {
  const qa = document.getElementById("quizArea");
  qa.innerHTML = `<button onclick="showTestResults()">Submit</button>`;
}

function showTestResults() {
  const qa = document.getElementById("quizArea");
  qa.innerHTML = quizData.map((q, i) => {
    const user = progress[q.id]?.selected;
    const correct = q.correct;
    const isCorrect = user === correct;
    return `<div class="result">
      <p><b>Q${i + 1}:</b> ${q.question}</p>
      <p style="color:${isCorrect ? 'green' : 'red'}">Your answer: ${user || '—'}</p>
      <p style="color:green">Correct answer: ${correct}</p>
      <p>${q.explanation}</p>
    </div>`;
  }).join('');
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
