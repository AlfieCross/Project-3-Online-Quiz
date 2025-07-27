document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // 1. Quiz Question Data
  // ============================

  const questions = [
    // General Knowledge
    {
      category: "General Knowledge",
      question: "What is the capital city of Australia?",
      choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: 2,
      explanation: "Canberra is the capital of Australia, not Sydney or Melbourne."
    },
    {
      category: "General Knowledge",
      question: "How many sides does a hexagon have?",
      choices: ["5", "6", "7", "8"],
      answer: 1,
      explanation: "A hexagon has 6 sides."
    },
    {
      category: "General Knowledge",
      question: "Which element has the chemical symbol 'O'?",
      choices: ["Gold", "Oxygen", "Osmium", "Oxide"],
      answer: 1,
      explanation: "'O' is the chemical symbol for Oxygen."
    },
    {
      category: "General Knowledge",
      question: "Which language is the most spoken worldwide?",
      choices: ["English", "Spanish", "Hindi", "Mandarin"],
      answer: 3,
      explanation: "Mandarin Chinese is the most spoken language in the world."
    },
    {
      category: "General Knowledge",
      question: "How many continents are there?",
      choices: ["5", "6", "7", "8"],
      answer: 2,
      explanation: "There are 7 continents."
    },

    // Geography
    {
      category: "Geography",
      question: "Which country is home to the ancient city of Petra?",
      choices: ["Egypt", "Jordan", "Greece", "Turkey"],
      answer: 1,
      explanation: "Petra is located in Jordan."
    },
    {
      category: "Geography",
      question: "Mount Everest lies on the border between Nepal and which country?",
      choices: ["India", "China", "Bhutan", "Pakistan"],
      answer: 1,
      explanation: "Mount Everest sits between Nepal and China (Tibet)."
    },
    {
      category: "Geography",
      question: "Which ocean lies between Africa and Australia?",
      choices: ["Atlantic", "Arctic", "Indian", "Pacific"],
      answer: 2,
      explanation: "The Indian Ocean lies between Africa, Asia, and Australia."
    },
    {
      category: "Geography",
      question: "What is the smallest country in the world?",
      choices: ["Monaco", "Vatican City", "San Marino", "Malta"],
      answer: 1,
      explanation: "Vatican City is the smallest by area and population."
    },
    {
      category: "Geography",
      question: "Which desert is the largest in the world?",
      choices: ["Sahara", "Gobi", "Arctic", "Antarctic"],
      answer: 3,
      explanation: "The Antarctic is the world’s largest desert."
    },

    // Sports
    {
      category: "Sports",
      question: "Which country won the FIFA World Cup in 2018?",
      choices: ["Brazil", "Germany", "France", "Argentina"],
      answer: 2,
      explanation: "France won the 2018 FIFA World Cup."
    },
    {
      category: "Sports",
      question: "How many players are on a standard football team on the field?",
      choices: ["9", "10", "11", "12"],
      answer: 2,
      explanation: "Each football team has 11 players on the field."
    },
    {
      category: "Sports",
      question: "Which sport is associated with Wimbledon?",
      choices: ["Golf", "Tennis", "Cricket", "Polo"],
      answer: 1,
      explanation: "Wimbledon is a major tennis tournament."
    },
    {
      category: "Sports",
      question: "What country is known for sumo wrestling?",
      choices: ["South Korea", "China", "Japan", "Thailand"],
      answer: 2,
      explanation: "Sumo wrestling originates from Japan."
    },
    {
      category: "Sports",
      question: "Which Olympic Games were postponed due to COVID-19?",
      choices: ["Rio 2016", "London 2012", "Tokyo 2020", "Beijing 2008"],
      answer: 2,
      explanation: "Tokyo 2020 was postponed to 2021."
    },

    // Music
    {
      category: "Music",
      question: "Which artist released the album '25'?",
      choices: ["Adele", "Taylor Swift", "Beyoncé", "Lady Gaga"],
      answer: 0,
      explanation: "Adele released the album '25' in 2015."
    },
    {
      category: "Music",
      question: "Who is known as the 'King of Pop'?",
      choices: ["Elvis Presley", "Justin Bieber", "Michael Jackson", "Prince"],
      answer: 2,
      explanation: "Michael Jackson is known as the King of Pop."
    },
    {
      category: "Music",
      question: "Which band released 'Bohemian Rhapsody'?",
      choices: ["The Beatles", "Queen", "Pink Floyd", "Rolling Stones"],
      answer: 1,
      explanation: "Queen released 'Bohemian Rhapsody'."
    },
    {
      category: "Music",
      question: "What instrument has 88 keys?",
      choices: ["Violin", "Piano", "Flute", "Guitar"],
      answer: 1,
      explanation: "A standard piano has 88 keys."
    },
    {
      category: "Music",
      question: "Which female artist sang 'Shake It Off'?",
      choices: ["Ariana Grande", "Dua Lipa", "Selena Gomez", "Taylor Swift"],
      answer: 3,
      explanation: "Taylor Swift released 'Shake It Off' in 2014."
    },

    // Film & TV
    {
      category: "Film & TV",
      question: "Who directed the movie 'Inception'?",
      choices: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Tarantino"],
      answer: 0,
      explanation: "Christopher Nolan directed 'Inception'."
    },
    {
      category: "Film & TV",
      question: "Which movie features a snowman named Olaf?",
      choices: ["Frozen", "Moana", "Tangled", "Encanto"],
      answer: 0,
      explanation: "Olaf is the snowman in Frozen."
    },
    {
      category: "Film & TV",
      question: "What’s the name of the wizard school in Harry Potter?",
      choices: ["Durmstrang", "Hogwarts", "Beauxbatons", "Ilvermorny"],
      answer: 1,
      explanation: "Harry attends Hogwarts School of Witchcraft and Wizardry."
    },
    {
      category: "Film & TV",
      question: "Which actor plays Iron Man in the MCU?",
      choices: ["Chris Evans", "Robert Downey Jr.", "Hemsworth", "Ruffalo"],
      answer: 1,
      explanation: "Robert Downey Jr. plays Iron Man."
    },
    {
      category: "Film & TV",
      question: "What’s the highest-grossing film of all time (as of 2025)?",
      choices: ["Avatar", "Endgame", "Titanic", "Jurassic World"],
      answer: 0,
      explanation: "Avatar remains the highest-grossing film."
    }
  ];

  // ============================
  // 2. Quiz Logic
  // ============================

  if (document.body.classList.contains("quiz-page")) {
    let currentIndex = 0;
    let score = 0;
    let userAnswers = [];

    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");
    const questionCategory = document.getElementById("question-category");
    const choicesContainer = document.getElementById("choices");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    displayQuestion();

    function displayQuestion() {
      const current = shuffledQuestions[currentIndex];
      questionNumber.textContent = `Question ${currentIndex + 1} of ${shuffledQuestions.length}`;
      questionCategory.textContent = `Category: ${current.category}`;
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

      nextBtn.style.display = currentIndex < shuffledQuestions.length - 1 ? "inline-block" : "none";
      submitBtn.style.display = currentIndex === shuffledQuestions.length - 1 ? "inline-block" : "none";
    }

    function selectAnswer(e) {
      document.querySelectorAll(".choice-btn").forEach(btn => btn.classList.remove("selected"));
      e.target.classList.add("selected");
    }

    nextBtn.addEventListener("click", () => {
      saveAnswer();
      currentIndex++;
      displayQuestion();
    });

    submitBtn.addEventListener("click", () => {
      saveAnswer();
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizTotal", shuffledQuestions.length);
      localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
      window.location.href = "results.html";
    });

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
  // 3. Results Logic
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

    localStorage.clear();
  }
});
