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
const playAgainButton = document.getElementById('play-again');

/** DECLARE GLOBAL VARIABLES NEEDED **/

let shuffledQuestionList = [];
let currentQuestionIndex = 0;
let score = 0;

/** RENDER PAGE AND START QUIZ APP **/

quizTitleHeading.textContent = quizTitle;
runQuiz();

/** EVENT LISTENERS **/

choiceButtons.forEach(button =>
	button.addEventListener('click', handleOptionClick),
);
nextQuestionButton.addEventListener('click', handleNextQuestionClick);
playAgainButton.addEventListener('click', runQuiz);

/** TASK FUNCTIONS **/

function renderQuestion() {
	// Prep data
	const currentQuestion = shuffledQuestionList[currentQuestionIndex];
	const shuffledChoices = shuffle(currentQuestion.options);

	// Render question data on page and reset result area
	questionDisplay.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
		button.textContent = shuffledChoices[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultDisplay.textContent = '';
	resultDisplay.style.display = 'none';
	nextQuestionButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
	const currentQuestion = shuffledQuestionList[currentQuestionIndex];
	const isCorrect =
		selectedButton.textContent ===
		currentQuestion.options[currentQuestion.correctIndex];
	if (isCorrect) {
		score++;
	}
	resultDisplay.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	document.body.classList.remove('correct', 'incorrect');
	document.body.classList.add(isCorrect ? 'correct' : 'incorrect');
	choiceButtons.forEach(button => (button.disabled = true));
	resultDisplay.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick() {
	currentQuestionIndex++;
	document.body.classList.remove('correct', 'incorrect');
	if (currentQuestionIndex === questionList.length) {
		questionDisplay.textContent = 'Quiz Completed';
		resultDisplay.textContent = `Thank you for playing! Your final score: ${score}/${questionList.length}.`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
		playAgainButton.style.display = 'block';
	} else {
		renderQuestion();
	}
}

function runQuiz() {
	playAgainButton.style.display = 'none';
	shuffledQuestionList = shuffle(questionList);
	currentQuestionIndex = 0;
	score = 0;
	renderQuestion();
}

/** HELPER FUNCTIONS **/

function shuffle(list) {
	const shuffled = [...list];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
