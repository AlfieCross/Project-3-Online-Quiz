// ============================
// quiz.js — Logic for quiz.html
// ============================

import {
    questions
} from './questions.js';

document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("quiz-page")) return;

    let currentIndex = 0;
    let score = 0;
    let userAnswers = [];

    const questionNumber = document.getElementById("question-number");
    const questionText = document.getElementById("question-text");
    const choicesContainer = document.getElementById("choices");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    const questionCategory = document.getElementById("question-category");

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
            category: shuffledQuestions[currentIndex].category,
            choices: shuffledQuestions[currentIndex].choices,
            selected: selectedIndex,
            correct: correctIndex,
            explanation: shuffledQuestions[currentIndex].explanation
        });

        if (selectedIndex === correctIndex) score++;
    }
});