const questions = [
  { text: "What is your name?", answers: ["Sakil", "your", "your name", "What is your name"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "Identify the fruit from the image below", image: " img/Image-1.jpeg", answers: ["কনক্রিট মিক্সার", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "রড কাটার মেশিন"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "Identify the landmark", image: " img/Image-2.jpeg", answers: ["কনক্রিট মিক্সার", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "জ্যাক হ্যামার"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "What is your hobby?", answers: ["Reading", "Writing", "Coding", "Gaming"] },
  { text: "What is your name?", answers: ["Sakil", "your", "your name", "What is your name"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "Identify the fruit from the image below", image: " img/Image-3.jpeg", answers: ["কনক্রিট মিক্সার", "জ্যাক হ্যামার", "টোটাল স্টেশন/লেভেলিং যন্ত্র", "রড কাটার মেশিন"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "Identify the landmark", image: " img/Image-4.jpeg", answers: ["জ্যাক হ্যামার", " লেভেলিং যন্ত্র", "রড বাঁকানোর মেশিন", "রড কাটার মেশিন"] },
  { text: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
  { text: "What is your hobby?", answers: ["Reading", "Writing", "Coding", "Gaming"] }
];

let currentQuestion = 0;
const answersStorage = Array(questions.length).fill(null);
const questionText = document.getElementById('questionText');
const questionImage = document.getElementById('questionImage');
const answerBox = document.getElementById('answerBox');
const progressBar = document.getElementById('progressBar');
const questionNav = document.getElementById('questionNav');

function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.text;
  questionImage.style.display = q.image ? 'block' : 'none';
  questionImage.src = q.image || '';
  answerBox.innerHTML = '';

  q.answers.forEach((ans, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    if (answersStorage[index] === i) div.classList.add('selected');
    div.onclick = () => {
      answersStorage[index] = i;
      updateNavStatus();
      renderQuestion(index);
    };
    div.textContent = ans;
    answerBox.appendChild(div);
  });

  progressBar.style.width = ((index + 1) / questions.length * 100) + '%';
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

function updateNavStatus() {
  [...questionNav.children].forEach((btn, idx) => {
    btn.classList.remove('active', 'answered');
    if (idx === currentQuestion) btn.classList.add('active');
    if (answersStorage[idx] !== null) btn.classList.add('answered');
  });
}

questions.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.textContent = (i + 1).toString().padStart(2, '0');
  btn.onclick = () => {
    currentQuestion = i;
    renderQuestion(i);
    updateNavStatus();
  };
  questionNav.appendChild(btn);
});

let totalTime = 600;
const timerDisplay = document.getElementById('timer');
function startTimer() {
  const interval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(interval);
      alert("Time's up!");
    } else {
      totalTime--;
      const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
      const seconds = String(totalTime % 60).padStart(2, '0');
      timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
    }
  }, 1000);
}

renderQuestion(currentQuestion);
updateNavStatus();
startTimer();
