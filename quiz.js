const quiz =[
{
	q:'which month comes right before june',
	options:['may','june','july','august'],
	answer:0
},

// {q:'what is your name',
// 	options:['jnani','rohi','venkata','sulo'],
// 	answer:0
// },

{
	q:'7+10',
	options:[14,17,13,24],
	answer:1
},


{
	q:'9+10=18',
	options:['true','false'],
	answer:0
},


{
	q:'7+10',
	options:[14,17,13,24],
	answer:1
},
{
	q:'7+2*(3-4)',
	options:[4,3,7,5],
	answer:3
},
{
	q:'If we minus 712 from 1500, how much do we get?',

 	options:[788,778,768,758],
 	answer:0,
},

{
	q:'110 divided by 10 is:',
	options:[12,10,11,15],
	answer:2,

},

]

const questionNumber = document.querySelector('.question-number')
const questionText = document.querySelector('.question-text')
const optionContainer = document.querySelector('.option-container')
const answerIndicatorContainer=document.querySelector('.answer-indicator')
const homeBox=document.querySelector('.home-box')
const quizBox=document.querySelector('.quiz-box')
const resultBox=document.querySelector('.result-box')
// questionNumber.innerHTML='hello'



let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswers=0;
let attempt=0;


function setAvailableQuestion(){
	const totalQuestions=quiz.length;
	for(let i=0;i<totalQuestions;i++){
		availableQuestions.push(quiz[i]);

	}
}

// setAvailableQuestion()
// console.log(availableQuestions)


function getNewQuestion(){
	let availableOptions=[];
	questionNumber.innerHTML=`Question${questionCounter+1} of ${quiz.length}`;
	const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
	currentQuestion=questionIndex;
	questionText.innerHTML=currentQuestion.q;
	const index1=availableQuestions.indexOf(currentQuestion);
	availableQuestions.splice(index1,1);
	const optionlen=currentQuestion.options.length;
	for (let i=0;i<optionlen;i++){
		availableOptions.push(i);
	}
	optionContainer.innerHTML=''
	console.log(availableOptions)
	animationDelay=0.2;
	for (let i=0;i<optionlen;i++){

		const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)]
		currentoption=availableOptions.indexOf(optionIndex)
		availableOptions.splice(currentoption,1)
		const option=document.createElement('div');

		option.innerHTML=currentQuestion.options[optionIndex];
		option.className='option'
		option.id=optionIndex;
		option.style.animationDelay=animationDelay+'s'
		animationDelay+=0.1
		option.setAttribute('onclick','getResult(this)')
		// optionContainer.innerHTML=''
		optionContainer.appendChild(option)

		// option.setAttribute('onclick','getResult(this)')
	}


	questionCounter++



}



// getNewQuestion()



function getResult(element){
		const id=element.id;
		if (id == currentQuestion.answer){
			console.log(id)
			// element.style.backgroundColor('red')
			element.classList.add('correct')
			updateAnswerIndicator('correct');
			// element.classLisrt.remove()
			// element.classlist.pop('option')
			correctAnswers++
			console.log(correctAnswers)
		}
		else{
			element.classList.add('incorrect')	;
			updateAnswerIndicator('incorrect');
			const optionlen=optionContainer.children.length;
			for (let i=0; i<optionlen;i++){
				if(optionContainer.children[i].id==currentQuestion.answer)
		{
			optionContainer.children[i].classList.add('correct');
		}
	}
			
		}

	attempt++
	alreadyAnswered();
	
}


function alreadyAnswered(){
	const optionlen=optionContainer.children.length;
	for (let i=0; i<optionlen;i++){
		
		optionContainer.children[i].classList.add('already-answered');
		
	}
}



function next(){
	if (questionCounter==quiz.length){
		console.log('quiz over')
		quizOver();

	}

	else{
		getNewQuestion()
	}
}

function answersIndicator(){
	answerIndicatorContainer.innerHTML=''
	const totalQuestions=quiz.length;
	for (var i=0;i<totalQuestions;i++){
		const indicator=document.createElement('div');
		indicator.classList.add('a')
		answerIndicatorContainer.appendChild(indicator);

	}
}


// answersIndicator();


function updateAnswerIndicator(marktype){
	// console.log(marktype)
	answerIndicatorContainer.children[questionCounter-1].classList.add(marktype);
}




function quizOver(){

	quizBox.classList.add('hide');
	resultBox.classList.remove('hide');
	quizResult();



}





function quizResult(){
	resultBox.querySelector('.total-questions').innerHTML=quiz.length
	resultBox.querySelector('.attempts').innerHTML=attempt
	resultBox.querySelector('.correct').innerHTML=correctAnswers
	resultBox.querySelector('.incorrect').innerHTML=attempt-correctAnswers
	resultBox.querySelector('.percentage').innerHTML=(correctAnswers/quiz.length)*100 +' %'
	resultBox.querySelector('.total-score').innerHTML=correctAnswers+' / '+quiz.length

}

function resetQuiz(){
questionCounter=0;
currentQuestion;
availableQuestions=[];
availableOptions=[];
correctAnswers=0;
attempt=0;
}

// function startQuiz(){
// 	homeBox.classList.add('hide');
// 	quizBox.classList.remove('hide')
	
// }
function restart(){
	resultBox.classList.add('hide');
	quizBox.classList.remove('hide');
	resetQuiz();
	startQuiz()
}

function goToHome(){
	homeBox.classList.remove('hide');
	resultBox.classList.add('hide');
	resetQuiz()
}

function startQuiz(){
	homeBox.classList.add('hide');
	quizBox.classList.remove('hide')
	setAvailableQuestion();
	getNewQuestion();
	answersIndicator();}
