import { quizData } from "./quizData";

// Destructure title and questions
const { quizTitle, questions } = quizData;

// Objects represent elements on the page
const quizTitleHeading = document.getElementById('quiz-title');
const question = document.getElementById('question');
const choiceButtons = document.querySelectorAll('.choice-buttons');
const result = document.getElementById('result');
const nextQuestionButton = document.getElementById('next-question');

// Any other variables needed
let currentQuestionIndex = 0;
let score = 0;

renderQuestion();

choiceButtons.forEach(button =>
	button.addEventListener('click', handleOptionClick),
);
nextQuestionButton.addEventListener('click', handleNextQuestionClick);

// Functions

// Render Question
function renderQuestion() {
	const currentQuestionData = questions[currentQuestionIndex];
	question.textContent = currentQuestionData.question;
	choiceButtons.forEach((button, i) => {
		button.textContent = currentQuestionData.options[i];
		button.disabled = false;
		button.style.display = 'block';
	});
	result.textContent = '';
	result.classList.remove('correct', 'incorrect');
	nextQuestionButton.style.display = 'none';
}

function handleOptionClick(event) {
	const selectedButton = event.target;
	const selectedIndex = Array.from(choiceButtons).indexOf(selectedButton);
	const isCorrect =
		selectedIndex === questions[currentQuestionIndex].correctIndex;

	if (isCorrect) {
		score++;
	}

	result.textContent = isCorrect
		? 'Correct answer! Great job.'
		: 'Sorry, that is not correct.';
	result.classList.remove('correct', 'incorrect');
	result.classList.add(isCorrect ? 'correct' : 'incorrect');

	choiceButtons.forEach(button => (button.disabled = true));
	nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick(event) {
	event.preventDefault();
	currentQuestionIndex++;
	if (currentQuestionIndex === questions.length) {
		question.textContent = 'Quiz Completed!';
		result.classList.remove('correct', 'incorrect');
		result.textContent = `Thank you for playing. Your final score: ${score}/${questions.length}.`;
		choiceButtons.forEach(button => {
			button.style.display = 'none';
		});
		nextQuestionButton.style.display = 'none';
	} else {
		renderQuestion();
	}
}
