// ============================
// Quiz Game Script
// ============================

// Wait until all DOM content is loaded before running any JS
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // 1. Quiz Question Data
  // ============================

  const questions = [
    {
      question: "Which year did the first iPhone release?",
      choices: ["2005", "2007", "2008", "2010"],
      answer: 1,
      explanation: "The first iPhone was released in 2007."
    },
    {
      question: "Which country is home to the ancient city of Petra?",
      choices: ["Egypt", "Jordan", "Greece", "Turkey"],
      answer: 1,
      explanation: "Petra is located in Jordan and is one of the New Seven Wonders of the World."
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      choices: ["Brazil", "Germany", "France", "Argentina"],
      answer: 2,
      explanation: "France won the 2018 FIFA World Cup in Russia."
    },
    {
      question: "Which artist released the album '25'?",
      choices: ["Adele", "Taylor Swift", "Beyoncé", "Lady Gaga"],
      answer: 0,
      explanation: "Adele released the album '25' in 2015."
    },
    {
      question: "Who directed the movie 'Inception'?",
      choices: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
      answer: 0,
      explanation: "Christopher Nolan directed 'Inception' in 2010."
    }
  ];

  // ============================
  // 2. Quiz Logic (quiz.html)
  // ============================

  if (document.body.classList.contains("quiz-page")) {
    let currentIndex = 0;
    let score = 0;
    let userAnswers = [];

    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    // Shuffle the question order for each game
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    displayQuestion();

    // Show current question and answer buttons
    function displayQuestion() {
      const current = shuffledQuestions[currentIndex];
      questionNumber.textContent = `Question ${currentIndex + 1} of ${shuffledQuestions.length}`;
      questionText.textContent = current.question;
      choicesContainer.innerHTML = "";

      current.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.classList.add("choice-btn");
        btn.textContent = choice;
        btn.dataset.index = index;
        btn.addEventListener("click", selectAnswer);
        choicesContainer.appendChild(btn);
      });

      // Only show "Next" if not the last question
      nextBtn.style.display = currentIndex < shuffledQuestions.length - 1 ? "inline-block" : "none";
      submitBtn.style.display = currentIndex === shuffledQuestions.length - 1 ? "inline-block" : "none";
    }

    // Add "selected" style to clicked choice
    function selectAnswer(e) {
      document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.remove("selected"));
      e.target.classList.add("selected");
    }

    // Move to next question
    nextBtn.addEventListener("click", () => {
      saveAnswer();
      currentIndex++;
      displayQuestion();
    });

    // Finish quiz and go to results
    submitBtn.addEventListener("click", () => {
      saveAnswer();
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizTotal", shuffledQuestions.length);
      localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
      window.location.href = "results.html";
    });

    // Save selected answer
    function saveAnswer() {
      const selectedBtn = document.querySelector(".choice-btn.selected");
      if (!selectedBtn) return;

      const selectedIndex = parseInt(selectedBtn.dataset.index);
      const correctIndex = shuffledQuestions[currentIndex].answer;

      userAnswers.push({
        question: shuffledQuestions[currentIndex].question,
        choices: shuffledQuestions[currentIndex].choices,
        selected: selectedIndex,
        correct: correctIndex,
        explanation: shuffledQuestions[currentIndex].explanation
      });

      if (selectedIndex === correctIndex) score++;
    }
  }

  // ============================
  // 3. Results Logic (results.html)
  // ============================

  if (document.body.classList.contains("results-page")) {
    const scoreText = document.getElementById("score-text");
    const resultDetails = document.getElementById("result-details");

    const storedScore = localStorage.getItem("quizScore");
    const storedTotal = localStorage.getItem("quizTotal");
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));

    if (!storedScore || !storedTotal || !storedAnswers) {
      scoreText.textContent = "Error loading results. Please take the quiz again.";
      return;
    }

    scoreText.textContent = `You scored ${storedScore} out of ${storedTotal}!`;

    storedAnswers.forEach((entry, index) => {
      const review = document.createElement("div");
      review.classList.add("result-card");

      const q = document.createElement("p");
      q.innerHTML = `<strong>Q${index + 1}:</strong> ${entry.question}`;

      const isCorrect = entry.selected === entry.correct;
      const userText = entry.choices[entry.selected] || "No answer selected";
      const correctText = entry.choices[entry.correct];

      const userAnswer = document.createElement("p");
      userAnswer.innerHTML = `Your answer: <strong>${userText}</strong> ${isCorrect ? "✅" : "❌"}`;

      const correctAnswer = document.createElement("p");
      correctAnswer.innerHTML = `Correct answer: <strong>${correctText}</strong>`;

      const explanation = document.createElement("p");
      explanation.textContent = entry.explanation;

      review.appendChild(q);
      review.appendChild(userAnswer);
      review.appendChild(correctAnswer);
      review.appendChild(explanation);
      resultDetails.appendChild(review);
    });

    // Clear quiz data after showing results
    localStorage.clear();
  }
});
