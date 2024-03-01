// Dom Selectors
const btnStart = document.querySelector('.btn-start button');
const btnExit = document.querySelector('.buttons .quit');
const btnContinue = document.querySelector('.buttons .restart');
const btnNext= document.querySelector('.btn-next');

const infoBox = document.querySelector('.info-box');
const quizBox = document.querySelector('.quiz-box');

const quesText = document.querySelector('.ques-text');
const quesCounter = document.querySelector('.total-ques');

const optionsList = document.querySelector('.option-list');

const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector('.time-line');


let quesCount = 0;
let counter; //timer
const maxTime = 20;

// Icons Html elements
const tickIcon_html = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
const crossIcon_html = `<div class="icon cross"><i class="fas fa-times"></i></div>`;


// Start Game : Start Button
btnStart.onclick = () => {
  infoBox.classList.add('activeInfo'); // Show info Box
}

// Exit Game : Exit Button
btnExit.onclick = () => {  
  infoBox.classList.remove('activeInfo'); // Hide Info box
}

// Continue Game : Continue Button
btnContinue.onclick = () => {  
  infoBox.classList.remove('activeInfo'); // Hide Info box
  quizBox.classList.add('activeQuiz'); // Show Quiz box
  timeCount.innerText= maxTime;
  getQuestion(0);
  startTimer(maxTime);  
}

// Next Question : Next Button
btnNext.onclick= () => {
  if(quesCount < questions.length - 1){
    quesCount++;    
    getQuestion(quesCount); 
    clearInterval(counter);
    startTimer(maxTime);
  }
};


//Getting Questions & Options from Array
function getQuestion(index){
  // Get & Show Question 
  let ques_html =`<span>${questions[index].numb} .${questions[index].question}</span>`;
  quesText.innerHTML = ques_html;
  
  let option_html = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index] .options[2]}</span></div>
  <div class="option"><span>${questions[index] .options[3]}</span></div>`;
  optionsList.innerHTML = option_html; 
  
  let totalQuesCounter_html = `<span><p>${questions[index].numb}</p>of <p>${questions.length}</p> Questions</span>`;
  quesCounter.innerHTML = totalQuesCounter_html;
  
  // Set Event Listener to created Options
  setEventToOptions();
}

//Event listener to Options
function setEventToOptions(){
  // Get Created Options
  const optionsItems = Array.from(optionsList.querySelectorAll(".option"));
  
 for (let i =0; i < optionsItems.length; i++){
   optionsItems[i].setAttribute('onclick', 'optionSelected(this)');
 }
}


function optionSelected(answer){
  clearInterval(counter);
  timeLine.style.width = `0%`;
  let userAnswer = answer.textContent;
  let correctAnswer = questions[quesCount].answer;
  // Check if userAnswer is true
  if(userAnswer == correctAnswer){
    answer.classList.add('correct'); 
    answer.insertAdjacentHTML('beforeend', tickIcon_html);
  }else{
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIcon_html);
    //show the correct answer
    Array.from(optionsList.children).forEach(item => {
      if(item.textContent == correctAnswer){
        item.classList.add('correct'); 
        item.insertAdjacentHTML('beforeend', tickIcon_html);
      }      
    });    
  }
  //Disable options after selection
  Array.from(optionsList.children).forEach(item => {
    item.classList.add('disabled');
  });   
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  let lineTime = -1;
  function timer(){
    timeCount.textContent = time;    
    time--;
    lineTime++;
    if(lineTime <= maxTime && lineTime > 0){
      timeLine.style.width = `${(lineTime / maxTime) * 100}%`;
    }
    
    
    if(time < 9){
      let addZeroText = timeCount.textContent;
      timeCount.textContent = "0" + addZeroText; 
      timeCount.style.background = 'purple';
      timeLine.style.background = 'purple';
    }
    
    if(time < 5){
      timeLine.style.background = 'orangered';
      timeCount.style.background = 'orangered';
    }
    if(time <0){
      clearInterval(counter);
      timeLine.style.background = 'orangered';
      /*timeCount.textContent ="00";*/
    }
  }
}

/* ======================================
  *             Questions Data 
  *=======================================*/
/* Array --> Number, Questions, Options , Answers 
  (improvement: Details correction) */
let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "Extensible Markup Language",
    options: [
      "Extensible Markup Language",
      "Extensible Multiple Language",
      "Extra Multi-Program Language",
      "Examine Multiple Language"
    ]
  }

]

