function goTo(id) {
  document.querySelectorAll('.screen').forEach(s => {
    if (s.id !== id) {
      if (s.classList.contains('active')) {
        s.classList.add('exit-left');
        s.classList.remove('active');
        setTimeout(() => s.classList.remove('exit-left'), 500);
      }
    }
  });
  setTimeout(() => {
    const target = document.getElementById(id);
    target.classList.remove('exit-left');
    target.classList.add('active');
  }, 80);
}

document.querySelectorAll('.theory-back-button').forEach(button => {
    let isButtonOut = false;
    button.addEventListener('click', function() {
        if (!isButtonOut) {
            this.classList.add('is-active');
            isButtonOut = true;
        } else {
            goTo('screen-main');
            this.classList.remove('is-active');
            isButtonOut = false;
        }
    });
});

function startQuiz(screen, id) {
  currentQ = 0;
  score = 0;
  userAnswers = [];
  answered = false;
  renderQuestion();
  goTo(screen);
}


const quizzesData = {
  1: {
    title: "Теоретический каркас",
    length: 3,
    questions: [
      {
        text: "Какая черта марксистско-ленинской модели государства прямо отрицает принцип многопартийной демократии?",
        answers: [
          "Централизованное планирование экономики",
          "Диктатура пролетариата как переходная фаза",
          "Партийная однопартийность, при которой партия провозглашается единственным носителем истины",
          "Национализация банков, земли и крупной промышленности"
        ],
        correct: 2
      },
      {
        text: "Какой документ считается первой Конституцией России, дарованной Николаем II?",
        answers: [
          "Манифест 17 октября 1905 года",
          "Основные государственные законы Российской империи (1906 г.)",
          "Декрет о власти (1917 г.)",
          "Конституция РСФСР 1918 года"
        ],
        correct: 1
      },
      {
        text: "Что из перечисленного НЕ является элементом марксистско-ленинской концепции государства?",
        answers: [
          "Диктатура пролетариата",
          "Построение социализма как переходной фазы",
          "Разделение властей и независимая судебная система",
          "Однопартийная система"
        ],
        correct: 2
      }
    ]
  },
  2: {
    title: "Революционный этап",
    length: 3,
    questions: [
      {
        text: "Какая черта марксистско-ленинской модели государства прямо отрицает принцип многопартийной демократии?",
        answers: [
          "Централизованное планирование экономики",
          "Диктатура пролетариата как переходная фаза",
          "Партийная однопартийность, при которой партия провозглашается единственным носителем истины",
          "Национализация банков, земли и крупной промышленности"
        ],
        correct: 2
      },
      {
        text: "Какой документ считается первой Конституцией России, дарованной Николаем II?",
        answers: [
          "Манифест 17 октября 1905 года",
          "Основные государственные законы Российской империи (1906 г.)",
          "Декрет о власти (1917 г.)",
          "Конституция РСФСР 1918 года"
        ],
        correct: 1
      },
      {
        text: "Что из перечисленного НЕ является элементом марксистско-ленинской концепции государства?",
        answers: [
          "Диктатура пролетариата",
          "Построение социализма как переходной фазы",
          "Разделение властей и независимая судебная система",
          "Однопартийная система"
        ],
        correct: 2
      }
    ]
  },
  3: {
    title: "Формирование партии",
    length: 3,
    questions: [
      {
        text: "Какая черта марксистско-ленинской модели государства прямо отрицает принцип многопартийной демократии?",
        answers: [
          "Централизованное планирование экономики",
          "Диктатура пролетариата как переходная фаза",
          "Партийная однопартийность, при которой партия провозглашается единственным носителем истины",
          "Национализация банков, земли и крупной промышленности"
        ],
        correct: 2
      },
      {
        text: "Какой документ считается первой Конституцией России, дарованной Николаем II?",
        answers: [
          "Манифест 17 октября 1905 года",
          "Основные государственные законы Российской империи (1906 г.)",
          "Декрет о власти (1917 г.)",
          "Конституция РСФСР 1918 года"
        ],
        correct: 1
      },
      {
        text: "Что из перечисленного НЕ является элементом марксистско-ленинской концепции государства?",
        answers: [
          "Диктатура пролетариата",
          "Построение социализма как переходной фазы",
          "Разделение властей и независимая судебная система",
          "Однопартийная система"
        ],
        correct: 2
      }
    ]
  }
};

let currentQuizId = null;
let currentQuestionIndex = 0;
let userAnswers = [];

function calculateScore() {
  const quiz = quizzesData[currentQuizId];
  if (!quiz) return 0;
  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correct) correctCount++;
  });
  return correctCount;
}

function saveCurrentAnswer(selectedIndex) {
  userAnswers[currentQuestionIndex] = selectedIndex;
}

function renderCurrentQuestion() {
  const quiz = quizzesData[currentQuizId];
  if (!quiz) return;
  
  const questionData = quiz.questions[currentQuestionIndex];
  if (!questionData) return;
  
  // Используем currentQuizId вместо хардкода '1'
  const quizScreen = document.getElementById(`screen-quiz-${currentQuizId}`);
  if (!quizScreen) return;
  
  const questionContainer = quizScreen.querySelector('.quiz-question');
  const answersContainer = quizScreen.querySelector('.quiz-answers');
  
  if (!questionContainer || !answersContainer) return;
  
  questionContainer.innerHTML = `<p class="gold" style="font-size: 19px;">${questionData.text}</p>`;
  
  answersContainer.innerHTML = '';
  
  questionData.answers.forEach((answer, idx) => {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'quiz-answer';
    
    answerDiv.innerHTML = `<p>${answer}</p>`;
    answerDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      saveCurrentAnswer(idx);
      
      document.querySelectorAll(`#screen-quiz-${currentQuizId} .quiz-answer`).forEach(ans => {
        ans.classList.remove('selected');
      });
      answerDiv.classList.add('selected');
      
      setTimeout(() => {
        const total = quiz.questions.length;
        
        if (currentQuestionIndex + 1 >= total) {
          showResultScreen();
        } else {
          currentQuestionIndex++;
          renderCurrentQuestion();
        }
      }, 300);
    });
    
    answersContainer.appendChild(answerDiv);
  });
}

function showResultScreen() {
  const score = calculateScore();
  const total = quizzesData[currentQuizId].questions.length;
  const title = quizzesData[currentQuizId].title;

  document.querySelector('#screen-quiz-result .title').textContent = title;

  document.querySelector('#screen-quiz-result .quiz-result').innerHTML = `
    <p class="gold" style="font-size: 36px; letter-spacing: 4px; text-align: center;">ИТОГО:</p>
    <p class="gold" style="font-size: 110px; text-align: center; line-height: 1;">${score} / ${total}</p>`;

  goTo('screen-quiz-result');
}

window.startQuiz = function(screenId, quizId) {
  currentQuizId = quizId;
  currentQuestionIndex = 0;
  
  const totalQuestions = quizzesData[quizId]?.questions.length || 0;
  userAnswers = new Array(totalQuestions).fill(undefined);
  
  renderCurrentQuestion();
  goTo(screenId);
};