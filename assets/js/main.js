// =============================
// main.js — Entry point script
// =============================

// Load questions globally
import {
    questions
} from "./questions.js";

// Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    if (body.classList.contains("quiz-page")) {
        initQuiz(questions);
    }

    if (body.classList.contains("results-page")) {
        showResults();
    }
});