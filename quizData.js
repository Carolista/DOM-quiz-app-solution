const questions = [
	{
		question: 'What tech are we NOT studying in Unit 1?',
		options: ['React', 'JavaScript', 'Java', 'CSS'],
		correctIndex: 2,
	},
	{
		question: 'What tech are we NOT studying in Unit 2?',
		options: ['Jest', 'JUnit', 'Java', 'SQL'],
		correctIndex: 0,
	},
	{
		question: 'Which tag is best for the main page content?',
		options: ['<div>', '<main>', '<span>', '<label>'],
		correctIndex: 1,
	},
	{
		question: 'Which method adds a class to an element?',
		options: [
			'classList.push()',
			'className.add()',
			'classList.add()',
			'addClass()',
		],
		correctIndex: 2,
	},
	{
		question: 'What does DOM stand for?',
		options: [
			'Document Object Model',
			'Data Output Mode',
			'Display Object Method',
			'Document Order Map',
		],
		correctIndex: 0,
	},
];

export const quizData = {
    quizTitle: "JS & The DOM",
    questions: questions
};