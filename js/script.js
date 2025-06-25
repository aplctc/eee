const questions = [
  { text: "Q: সিমেন্টের প্রধান উপাদান কী ?", answers: ["A) সিলিকা", "B) ক্যালসিয়াম", "C) লোহা", "D) বালি  "] },
  { text: "Q: প্লাস্টারিংয়ের জন্য কোন মিক্স অনুপাতে ব্যবহার হয়?", answers: ["A) 1:6", "B) 1:3 ", "C) 1:4", "D) 1:5 "] },
  { text: "Q: এটির নাম কি ?", image: " img/Image-1.jpeg", answers: ["কনক্রিট মিক্সার", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "রড কাটার মেশিন"] },
  { text: "Q: একটা ইটের স্ট্যান্ডার্ড সাইজ কত?", answers: ["A) 10x5x3 ইঞ্চি ", "B) 9x4.5x3 ইঞ্চি", "C) 8x5x2.5 ইঞ্চি", "D) 9x4x4 ইঞ্চি  "] },
  { text: "Q: রেশিও 1:2:4 মানে কী?", answers: ["A) পানি:সিমেন্ট:বালি ", "B) সিমেন্ট:বালি:স্টোন", "C) সিমেন্ট:বালি:চিপস ", "D) বালি:সিমেন্ট:চুন "] },
  { text: "Q: নিম্নের চিত্রটির নাম কি?", image: " img/Image-2.jpeg", answers: ["কনক্রিট মিক্সার", "ভাইব্রেটর মেশিন", "রড বাঁকানোর মেশিন", "জ্যাক হ্যামার"] },
  { text: "Q: কনক্রিট সেট হতে কত সময় লাগে (প্রাথমিক)?", answers: ["A) ২ ঘণ্টা ", "B) ৩০ মিনিট  ", "C) ৬ ঘণ্টা ", "D) ১ ঘণ্টা "] },
  { text: "Q: ইটের জোড়ায় কোন মেটেরিয়াল ব্যবহার হয়? ", answers: ["A) পানি", "B) চুন", "C) মিক্সড সিমেন্ট", "D) মর্টার "] },
  { text: "Q: ১ ব্যাগ সিমেন্টে কত কেজি থাকে?", answers: ["A) ৪০ কেজি", "B) ৪৫ কেজি", "C) ৫০ কেজি", "D) ৫৫ কেজি"] },
  { text: "Q: ছাদ ঢালার সময় সবচেয়ে জরুরি কী?", answers: ["A) রডের রং ", "B) কাঠের গুণ ", "C) লেবেলিং", "D) ইটের মান"] },
  { text: "Q: এটির নাম কি ?", image: " img/Image-3.jpeg", answers: ["কনক্রিট মিক্সার", "জ্যাক হ্যামার", "টোটাল স্টেশন/লেভেলিং যন্ত্র", "রড কাটার মেশিন"] },
  { text: "Q: ঢালাই করার আগে যে কাঠামো তৈরি করা হয় তার কি?", answers: ["A) মাটি", "B) প্লাস্টার ", "C) শাটারিং", "D) রড "] },
  { text: "Q: নিম্নের চিত্রটির নাম কি?", image: " img/Image-4.jpeg", answers: ["জ্যাক হ্যামার", " লেভেলিং যন্ত্র", "রড বাঁকানোর মেশিন", "রড কাটার মেশিন"] },
  { text: "Q: ছাদ ঢালার পর কতদিন পানি দিতে হয়?", answers: ["A) ৩ দিন ", "B) ৫ দিন", "C) ৭ দিন", "D) ১৪ দিন"] },
  { text: "Q: প্লাম্ব বব কী মাপে/ সল?", answers: ["A) আড়াআড়ি সরলতা ", "B) খাড়াভাবে সোজা", "C) উচ্চতা", "D) প্রস্থ "] }
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
