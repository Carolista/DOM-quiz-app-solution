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

/** DECLARE GLOBAL VARIABLES NEEDED **/

let currentQuestionIndex = 0;

/** RENDER PAGE AND START QUIZ APP **/

quizTitleHeading.textContent = quizTitle;
renderQuestion();

/** EVENT LISTENERS **/

choiceButtons.forEach(button =>
	button.addEventListener('click', handleOptionClick),
);
nextQuestionButton.addEventListener('click', handleNextQuestionClick);

/** TASK FUNCTIONS **/

function renderQuestion() {
    // Prep data
	const currentQuestion = questionList[currentQuestionIndex];
    
    // Render data on page and update styling as needed
	questionArea.textContent = currentQuestion.question;
	choiceButtons.forEach((button, i) => {
		button.textContent = currentQuestion.options[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	resultArea.textContent = '';
    resultArea.style.display = 'none';
	nextQuestionButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
	const isCorrect = selectedButton.textContent === currentQuestion.options[currentQuestion.correctIndex];
	resultArea.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	choiceButtons.forEach(button => (button.disabled = true));
    resultArea.style.display = 'block';
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick(event) {
	event.preventDefault();
	currentQuestionIndex++;
	if (currentQuestionIndex === questionList.length) {
		questionArea.textContent = 'Quiz Completed';
		resultArea.textContent = `Thank you for playing!`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
	} else {
		renderQuestion();
	}
}
