document.addEventListener("DOMContentLoaded", () => {
  const allQuestions = document.querySelectorAll(".quiz-card");

  allQuestions.forEach((question) => {
    const options = question.querySelectorAll(".option-btn");
    const correctAnswer = question.getAttribute("data-correct");
    const feedback = question.querySelector(".feedback");

    options.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (feedback.textContent !== "") return;

        const selected = btn.getAttribute("data-answer");

        if (selected === correctAnswer) {
          btn.classList.add("correct");
          feedback.textContent = "✅ Correct!";
        } else {
          btn.classList.add("wrong");
          feedback.textContent = "❌ Wrong!";
          options.forEach((b) => {
            if (b.getAttribute("data-answer") === correctAnswer) {
              b.classList.add("actual-answer");
            }
          });
        }
      });
    });
  });
});
