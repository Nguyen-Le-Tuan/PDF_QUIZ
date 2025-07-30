// ui.js
function renderQuestion() {
  console.log("quizData:", quizData);
  console.log("currentIndex:", currentIndex);
  console.log("Câu hỏi hiện tại:", quizData[currentIndex]);
  loadQuiz();
  const q = quizData[currentIndex];
  
  console.log("options:", q.options);
  const qa = document.getElementById("quizArea");
  if (!q) {
    qa.innerHTML = '<p>No questions loaded.</p>';
    return;
  }
  console.log("options trước filter:", q.options);
  const optionsHTML = q.options
  .filter(opt => opt.trim().length > 2 && /^[ABCD]\s*\./.test(opt))
  .map(opt => `<button onclick="selectOption(this, '${opt[0]}')">${opt}</button>`)
  .join('');
  console.log("options sau filter:", optionsHTML);

  qa.innerHTML = `
    <div class="quiz-layout">
      <div class="passage">${q.passage}</div>
      <div class="question-section">
        <div class="question">${q.question}</div>
        <div class="options">${optionsHTML}</div>
      </div>
    </div>
  `;
}

function selectOption(btn, selected) {
  document.querySelectorAll(".options button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  submitAnswer(selected);
}

function renderFeedback(isCorrect, q) {
  const qa = document.getElementById("quizArea");
  qa.innerHTML += `
    <div class="feedback">
      <p style="color:${isCorrect ? 'green' : 'red'}">${isCorrect ? 'Correct!' : 'Incorrect.'}</p>
      <p><b>Correct Answer:</b> ${q.correct}</p>
      <p>${q.explanation}</p>
      <button onclick="currentIndex++; renderQuestion()">Next</button>
    </div>
  `;
}

function renderDashboard() {
  const data = loadFromStorage("quizData") || [];
  const prog = loadFromStorage("progress") || {};
  const dash = document.getElementById("dashboardContent");

  // Thống kê tổng quan
  const totalQuestions = data.length;
  const answeredQuestions = Object.keys(prog).length;
  const correctAnswers = Object.values(prog).filter(r => r.isCorrect).length;
  const accuracy = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;

  // HTML cho thống kê
  const statsHTML = `
    <div class="dashboard-stats">
      <div class="stat-item">
        <span class="stat-number">${totalQuestions}</span>
        <span class="stat-label">Tổng câu hỏi</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${answeredQuestions}</span>
        <span class="stat-label">Đã trả lời</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${correctAnswers}</span>
        <span class="stat-label">Đúng</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">${accuracy}%</span>
        <span class="stat-label">Độ chính xác</span>
      </div>
    </div>
  `;

  // HTML cho danh sách câu hỏi
  const questionsHTML = data.map((q, index) => {
    const res = prog[q.id];
    const status = res ? (res.isCorrect ? '✅' : '❌') : '—';
    const statusClass = res ? (res.isCorrect ? 'correct' : 'incorrect') : 'unanswered';
    const questionPreview = q.question.length > 60 ? q.question.substring(0, 60) + '...' : q.question;
    
    return `
      <div class="dash-item ${statusClass}">
        <div class="question-number">#${index + 1}</div>
        <div class="question-content">
          <div class="question-text">${questionPreview}</div>
          <div class="question-status ${statusClass}">
            ${status === '✅' ? 'Đúng' : status === '❌' ? 'Sai' : 'Chưa làm'}
          </div>
        </div>
        <div class="question-actions">
          <button onclick="goToQuestion(${index})" class="btn-review">Xem lại</button>
        </div>
      </div>
    `;
  }).join('');

  dash.innerHTML = statsHTML + questionsHTML;
}

// Thêm hàm để chuyển đến câu hỏi cụ thể
function goToQuestion(index) {
  currentIndex = index;
  showTab('test');
  renderQuestion();
}