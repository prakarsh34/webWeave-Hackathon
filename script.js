const questions = [
  {
    question: "1. Write a function that returns the sum of two numbers.",
    answer: `function sum(a, b) {
  return a + b;
}`
  },
  {
    question: "2. Write a function to check if a number is even.",
    answer: `function isEven(num) {
  return num % 2 === 0;
}`
  },
  {
    question: "3. Write a function to reverse a string.",
    answer: `function reverseString(str) {
  return str.split('').reverse().join('');
}`
  },
  {
    question: "4. Write a function that returns the factorial of a number.",
    answer: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`
  },
  {
    question: "5. Write a function to check if a string is a palindrome.",
    answer: `function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}`
  },
  {
    question: "6. Write a function that finds the maximum number in an array.",
    answer: `function findMax(arr) {
  return Math.max(...arr);
}`
  },
  {
    question: "7. Write a function that filters out odd numbers from an array.",
    answer: `function filterOdds(arr) {
  return arr.filter(n => n % 2 === 0);
}`
  },
  {
    question: "8. Write a function to count vowels in a string.",
    answer: `function countVowels(str) {
  return str.split('').filter(c => 'aeiouAEIOU'.includes(c)).length;
}`
  }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
let score = 0;
let timeLeft = 60;
let timerInterval;

const questionEl = document.getElementById("question");
const answerBox = document.getElementById("code-answer");
const submitBtn = document.getElementById("submit-answer");
const feedbackEl = document.getElementById("feedback");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");
const summaryEl = document.getElementById("summary");
const recommendationSection = document.getElementById("recommendations");
const recommendationList = document.getElementById("recommendation-list");
const timeDisplay = document.getElementById("time-left");

function loadQuestion() 
{
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  answerBox.value = "";
  feedbackEl.textContent = "";
  currentEl.textContent = currentQuestionIndex + 1;
  totalEl.textContent = totalQuestions;

  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  document.getElementById("progress-bar-fill").style.width = `${progressPercent}%`;
}

function checkAnswer() 
{
  const userRaw = answerBox.value.trim();
  if (userRaw === "") 
  {
    feedbackEl.textContent = "Warning! Please enter an answer before submitting.";
    return;
  }

  const userAnswer = userRaw.replace(/\s/g, "");
  const correctAnswer = questions[currentQuestionIndex].answer.trim().replace(/\s/g, "");

  if (userAnswer === correctAnswer) 
  {
    score++;
    feedbackEl.textContent = "Wow, Correct!";
  }
  else 
  {
    feedbackEl.innerHTML = `
      Not quite. Here's the correct answer:<br><pre>${questions[currentQuestionIndex].answer}</pre>
    `;
  }

  setTimeout(() => 
  {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) 
    {
      loadQuestion();
    } else 
    {
      clearInterval(timerInterval);
      showRecommendations();
    }
  }, 1500);
}

function showRecommendations() 
{
  document.getElementById("quiz-container").style.display = "none";
  recommendationSection.classList.remove("hidden");
  document.getElementById("progress-bar-fill").style.width = `100%`;
  summaryEl.innerHTML = `
    🎉 You got ${score} out of ${totalQuestions} correct.<br>
    Keep practicing these topics:
  `;
  recommendationList.innerHTML = `
    <li>Functions & Parameters</li>
    <li>Conditionals (if/else)</li>
    <li>Loops & Recursion</li>
    <li>String & Array Methods</li>
  `;
}

function endQuizOnTimeout() 
{
  document.getElementById("quiz-container").style.display = "none";
  recommendationSection.classList.remove("hidden");
  document.getElementById("progress-bar-fill").style.width = `100%`;
  summaryEl.innerHTML = `
    Oops! Time's up!<br>
    You answered ${currentQuestionIndex} out of ${totalQuestions} questions.<br>
    Try again to improve your timing and accuracy!
  `;
  recommendationList.innerHTML = `
    <li>Practice faster coding</li>
    <li>Understand question patterns</li>
    <li>Keep calm under pressure</li>
  `;
}

function startTimer() 
{
  timerInterval = setInterval(() => 
  {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) 
    {
      clearInterval(timerInterval);
      endQuizOnTimeout();
    }
  }, 1000);
}

submitBtn.addEventListener("click", checkAnswer);

answerBox.addEventListener("keydown", (e) => 
{
  if (e.key === "Enter" && !e.shiftKey) 
  {
    e.preventDefault();
    submitBtn.click();
  }
});

loadQuestion();
startTimer();


