/** IMPORT DATA **/

import { quizData } from './quizData.js';

// Destructure title and questions from imported data
const { quizTitle, questionList } = quizData;

/** CREATE OBJECTS REPRESENTING HTML ELEMENTS **/

const quizTitleHeading = document.getElementById('quiz-title');
const questionDisplay = document.getElementById('question-display');
const choiceButtons = document.querySelectorAll('.choice-button');
const resultDisplay = document.getElementById('result-display');
const nextQuestionButton = document.getElementById('next-question');
// BONUS #5B: Add object for play again button

/** DECLARE GLOBAL VARIABLES NEEDED **/

// BONUS #4A: Declare shuffledQuestionList and initialize to an empty array
let currentQuestionIndex = 0;
// BONUS #2A: Declare a score and initialize to 0;

/** RENDER PAGE AND START QUIZ APP **/

quizTitleHeading.textContent = quizTitle;
// BONUS #5F: Call runQuiz() instead of lines below once encapsulated in that function;
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
	// Render question data on page and reset result area
	questionDisplay.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
		// BONUS #3C: Replace currentQuestion.options with shuffledChoices
		button.textContent = currentQuestion.options[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultDisplay.textContent = '';
	resultDisplay.style.display = 'none';
	nextQuestionButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
	// BONUS #3D: Update currentQuestion below to use shuffled list
	const currentQuestion = questionList[currentQuestionIndex];
	const isCorrect =
		selectedButton.textContent ===
		currentQuestion.options[currentQuestion.correctIndex];
	// BONUS #2B: Add 1 to score if correct
	resultDisplay.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	// BONUS #1B: Swap out correct/incorrect class on body
	choiceButtons.forEach(button => (button.disabled = true));
	resultDisplay.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick(event) {
	currentQuestionIndex++;
	// BONUS #1C: Clear correct/incorrect classes from body
	if (currentQuestionIndex === questionList.length) {
		questionDisplay.textContent = 'Quiz Completed';
		// BONUS #2C: Add score to final statement
		resultDisplay.textContent = `Thank you for playing!`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
		// BONUS #5D: Make play again button visible
	} else {
		renderQuestion();
	}
}

// BONUS #5E: Create a function that hides the Play Again button, shuffles question list,
// resets current question index to 0, resets score to 0, renders the first question

/** HELPER FUNCTIONS **/

// BONUS #3A: Write a function to shuffle a list (re-order elements at random)
