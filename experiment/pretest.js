
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "To prevent occurance of excessive brittleness in colder region, the bitumen grade used is",
    answers: {
      a: "30/40",
      b: "60/70",
      c: "80/100",
      d: "180/200"
    },
    correctAnswer: "d"
  },

  {
    question: "Lower penetration grades are preferred in",
    answers: {
      a: "Humid region",
      b: "Warmer region",
      c: "Colder region",
      d: "Anywhere"
    },
    correctAnswer: "c"
  },
  {
    question: "The penetration is measured for every?",
    answers: {
      a: "6 seconds",
      b: "5 seconds",
      c: "3 seconds",
      d: "2 seconds"
    },
    correctAnswer: "b"
  },
  {
    question: "For bituminous macadam, IRC suggests bitumen grades of_____",
    answers: {
      a: "80/100",
      b: "180/100",
      c: "80/180",
      d: "80/200"
    },
    correctAnswer: "a"
  },
  {
    question: "Penetration test on bitumen is used for determining",
    answers: {
      a: "Grade of the bitumen",
      b: "Viscosity of the bitumen",
      c: "Ductility of the bitumen",
      d: "Temperature susceptibility of the bitumen"
    },
    correctAnswer: "a"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
