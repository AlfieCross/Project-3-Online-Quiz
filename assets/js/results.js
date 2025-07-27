// ============================
// results.js — Logic for results.html
// ============================

document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("results-page")) return;

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

        const question = document.createElement("p");
        question.innerHTML = `<strong>Q${index + 1} (${entry.category}):</strong> ${entry.question}`;

        const isCorrect = entry.selected === entry.correct;
        const userChoice = entry.choices[entry.selected] || "No answer selected";
        const correctChoice = entry.choices[entry.correct];

        const userAnswer = document.createElement("p");
        userAnswer.innerHTML = `Your answer: <strong>${userChoice}</strong> ${isCorrect ? "✅" : "❌"}`;

        const correctAnswer = document.createElement("p");
        correctAnswer.innerHTML = `Correct answer: <strong>${correctChoice}</strong>`;

        const explanation = document.createElement("p");
        explanation.textContent = entry.explanation;

        review.appendChild(question);
        review.appendChild(userAnswer);
        review.appendChild(correctAnswer);
        review.appendChild(explanation);
        resultDetails.appendChild(review);
    });

    // Clear stored quiz data after displaying results
    localStorage.clear();
});