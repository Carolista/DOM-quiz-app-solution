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
const playAgainButton = document.getElementById('play-again');

/** DECLARE GLOBAL VARIABLES NEEDED **/

let shuffledQuestionList = [];
let currentQuestionIndex = 0;
let currentCorrectAnswer = '';
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
	currentCorrectAnswer = currentQuestion.options[currentQuestion.correctIndex];

    // Render data on page and update styling as needed
	questionArea.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
		button.textContent = shuffledChoices[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultArea.textContent = '';
	resultArea.classList.remove('correct', 'incorrect');
    resultArea.style.display = 'none';
	nextQuestionButton.style.display = 'none';
	playAgainButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
	const isCorrect = selectedButton.textContent === currentCorrectAnswer;
	if (isCorrect) {
		score++;
	}
	resultArea.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	resultArea.classList.remove('correct', 'incorrect');
	resultArea.classList.add(isCorrect ? 'correct' : 'incorrect');

	choiceButtons.forEach(button => (button.disabled = true));
    resultArea.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick(event) {
	// event.preventDefault();
	currentQuestionIndex++;
	if (currentQuestionIndex === questionList.length) {
		questionArea.textContent = 'Quiz Completed';
		resultArea.classList.remove('correct', 'incorrect');
		resultArea.textContent = `Thank you for playing! Your final score: ${score}/${questionList.length}.`;
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
	shuffledQuestionList = shuffle(questionList);
	currentQuestionIndex = 0;
	score = 0;
	choiceButtons.forEach(button => {
		button.style.display = 'block';
	});
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
