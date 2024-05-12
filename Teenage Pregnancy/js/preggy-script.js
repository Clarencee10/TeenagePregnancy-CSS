const questions = [
    {
       question: "What is the average age of a teenager when they become sexually active?",
       answers: [
           { text: "16 years old", correct: false},
           { text: "18 years old", correct: true},
           { text: "13 years old", correct: false},
           { text: "15 years old", correct: false},
       ]
   },
   {
       question: " Which of the following factors can contribute to teenage pregnancy?",
       answers: [
           { text: " Lack of sex education", correct: false},
           { text: "Peer pressure", correct: false},
           { text: "Poverty", correct: false},
           { text: "All of the above", correct: true},
       ]
   },
   {
       question: "What percentage of teenage pregnancies are unintended?",
       answers: [
           { text: "55%", correct: true},
           { text: "80%", correct: false},
           { text: "40%", correct: false},
           { text: "35%", correct: false},
       ]  
   },
   {
       question: "Which contraceptive method is most effective at preventing pregnancy?",
       answers: [
           { text: "Condoms", correct: false},
           { text: "Birth Control Pills", correct: true},
           { text: "Intrauterine devices (IUDs)", correct: false},
           { text: "None of the above", correct: false},
       ]
   },
   {
       question: "What are potential consequences of teenage pregnancy?",
       answers: [
           { text: "Health risks for mother and baby", correct: false},
           { text: "Disruption of education", correct: false},
           { text: "Financial challenges", correct: false},
           { text: "All of the above", correct: true},
       ]
   },
   {
       question: "What is the leading cause of death for teenage mothers?",
       answers: [
           { text: "Suicide", correct: false},
           { text: "Complications from childbirth", correct: true},
           { text: "Homicide ", correct: false},
           { text: "Cancer", correct: false},
       ]  
   },
   {
       question: " How does teenage pregnancy impact mental health?",
       answers: [
           { text: "Increased risk of depression", correct: false},
           { text: "Higher likelihood of anxiety disorders", correct: false},
           { text: "Low self-esteem", correct: false},
           { text: "All of the above", correct: true},
       ]
   },
   {
       question: "What is the role of parents in preventing teenage pregnancy?",
       answers: [
           { text: "Open communication about sex and contraception", correct: false},
           { text: " Setting clear expectations and boundaries", correct: false},
           { text: "Providing access to sexual health resources", correct: false},
           { text: "All of the above", correct: true},
       ]
   },
   {
       question: "What is the role of comprehensive sex education in preventing teenage pregnancy?",
       answers: [
           { text: "Provides accurate information about contraception", correct: false},
           { text: " Teaches negotiation and refusal skills", correct: false},
           { text: "Encourages healthy decision-making", correct: false},
           { text: "All of the above", correct: true},
       ]  
   },
   {
       question: "How can healthcare providers support teenage pregnancy prevention?",
       answers: [
           { text: "Offer confidential and non-judgmental care", correct: false},
           { text: "Provide access to contraception", correct: false},
           { text: "Offer counseling and support services", correct: false},
           { text: "All of the above", correct: true},
       ]  
   }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion(){
   resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if(answer.correct){
           button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
   });
}

function resetState(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild) {
       answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e){
   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if(isCorrect){
       selectedBtn.classList.add("correct");
       score++;
   }else{
       selectedBtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct === "true"){
           button.classList.add("correct");
       }
       button.disabled = true;
   });
   nextButton.style.display = "block";
}

function showScore() {
   resetState();
   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
   nextButton.innerHTML = "Try Again";
   nextButton.style.display = "block";
}

function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
       showQuestion();
   }else{
       showScore();
   }
}

nextButton.addEventListener("click", ()=>{
   if(currentQuestionIndex < questions.length){
       handleNextButton();
   }else{
       startQuiz();
   }
});

startQuiz();
