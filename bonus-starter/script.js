/** IMPORT DATA **/

import { quizData } from './quizData.js';

// Destructure title and questions from imported data
const { quizTitle, questionList } = quizData;

/** CREATE OBJECTS REPRESENTING HTML ELEMENTS **/

const quizTitleHeading = document.getElementById('quiz-title');
const questionArea = document.getElementById('question-area');
const choiceButtons = document.querySelectorAll('.choice-button');
const resultArea = document.getElementById('result-area');
const nextQuestionButton = document.getElementById('next-question');
// BONUS #5B: Add object for play again button

/** DECLARE GLOBAL VARIABLES NEEDED **/

// BONUS #4A: Declare shuffledQuestionList and initialize to an empty array
let currentQuestionIndex = 0;
// BONUS #3D: Declare currentCorrectAnswer and initialize to an empty string
// BONUS #2A: Declare a score and initialize to 0;

/** RENDER PAGE AND START QUIZ APP **/

quizTitleHeading.textContent = quizTitle;
// BONUS #5G: Call runQuiz() instead of lines below once encapsulated in that function;
// BONUS #4B: shuffle question list and assign to shuffledQuestionList
renderQuestion();

/** EVENT LISTENERS **/

choiceButtons.forEach(button =>
	button.addEventListener('click', handleOptionClick),
);
nextQuestionButton.addEventListener('click', handleNextQuestionClick);
// BONUS #5C: Add listener for play again button and assign runQuiz as the callback

/** TASK FUNCTIONS **/

function renderQuestion() {
    // Prep data
	// BONUS #4C: Draw currentQuestion from shuffledQuestionList instead of questionList
	const currentQuestion = questionList[currentQuestionIndex];
	// BONUS #3B: Create shuffledChoices array by shuffling options
    // BONUS #3E: Update value of currentCorrectAnswer as string for future comparison
	currentCorrectAnswer = currentQuestion.options[currentQuestion.correctIndex];
    // Render data on page and update styling as needed
	questionArea.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
        // BONUS #3C: Replace currentQuestion.options with shuffledChoices
		button.textContent = currentQuestion.options[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultArea.textContent = '';
    // BONUS #1C: Clear classes from resultArea
    resultArea.style.display = 'none';
	nextQuestionButton.style.display = 'none';
    // BONUS #5D: Hide play again button
}

function handleOptionClick(event) {
	const selectedButton = event.target;
    const currentQuestion = questionList[currentQuestionIndex];
    // BONUS #3F: Update isCorrect below to check against currentCorrectAnswer
	const isCorrect = selectedButton.textContent === currentQuestion.options[currentQuestion.correctIndex];
    // BONUS #2B: Add 1 to score if correct
	resultArea.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
    // BONUS #1B: Clear classes from resultArea then add one based on isCorrect
	choiceButtons.forEach(button => (button.disabled = true));
    resultArea.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick(event) {
	event.preventDefault();
	currentQuestionIndex++;
	if (currentQuestionIndex === questionList.length) {
		questionArea.textContent = 'Quiz Completed';
        // BONUS #1D: Clear classes from resultArea
        // BONUS #2C: Add score to final statement
		resultArea.textContent = `Thank you for playing!`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
        // BONUS #5E: Make play again button visible
	} else {
		renderQuestion();
	}
}

// BONUS #5F: Create function that shuffles question list, resets current 
// question index to 0, resets score to 0,resets choice buttons display to 'block', 
// and renders the first question

/** HELPER FUNCTIONS **/

// BONUS #3A: Write a function to shuffle a list (re-order elements at random)
