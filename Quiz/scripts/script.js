const url = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

async function getQuestions(url) {
	var questionsList = [];
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.results);
			for (que of data.results) {
				var element = new Object();
				element.question = que.question;
				element.choices = que.incorrect_answers;
				element.choices.push(que.correct_answer);
				shuffle(element.choices);
				element.correctAnswer = que.correct_answer;
				questionsList.push(element);
			}
		});
	return questionsList;
}
var questions;
async function caller() {
	questions = await this.getQuestions(url);
	console.log(questions);
}
caller();

var currentQuestion = 0;
var score = 0;
var quizOver = 0;
$(document).ready(function () {
	$(this).find(".quizMessage").hide();
	$(this).find(".nextButton").hide();
	$(this).find("h3").text("Welcome To The Quiz");
	$(this)
		.find(".start")
		.on("click", function () {
			$(".start").hide();
			displayCurrentQuestion();
		});
	$(this)
		.find(".nextButton")
		.on("click", function () {
			if (!quizOver) {
				value = $("input[type = 'radio']:checked").val();

				if (value == undefined) {
					$(document).find(".quizMessage").text("Please select an option");
					$(document).find(".quizMessage").show();
				} else {
					$(document).find(".quizMessage").hide();
					if (
						questions[currentQuestion].choices[value.substring(0, 1)] ==
						questions[currentQuestion].correctAnswer
					) {
						score++;
					}
					currentQuestion++;
					if (currentQuestion < questions.length) {
						displayCurrentQuestion();
					} else {
						displayScore();
						$(document).find(".nextButton").text("Play Again?");
						quizOver = true;
					}
				}
			} else {
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}
		});
});
function displayCurrentQuestion() {
	$(".nextButton").show();
	$("h3").text("Your Question Is This");
	console.log(" In Dislay Current Question ");
	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;

	$(questionClass).text(question);
	$(choiceList).find("li").remove();

	var choice;
	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];
		$(
			"<li><input type='radio' value=" +
				i +
				"class = 'radio-option'/>" +
				choice +
				"</li>"
		).appendTo(choiceList);
	}
}

function resetQuiz() {
	currentQuestion = 0;
	score = 0;
	hideScore();
}

function displayScore() {
	$(".choiceList").hide();
	$(".question").hide();
	$("h3").hide();

	$(document)
		.find(".quizContainer > .result")
		.text("your score is: " + score + "/" + questions.length);
	$(document).find(".quizContainer > .result").show();
}

function hideScore() {
	$(document).find(".result").hide();
}
