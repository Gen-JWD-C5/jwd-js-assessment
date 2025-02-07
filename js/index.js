/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
const startTime = 1 ; // set time (in minutes) for countdown
let quizTime = document.querySelector("#quiztime");
quizTime.innerHTML = `${startTime}`;

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';

    //get button for submit
  let submitBtn = document.querySelector("#btnSubmit");
  // add function to submit button to execute on click
  submitBtn.addEventListener("click", calculateScore);
  
 
  // get button for reset
  let resetBtn = document.querySelector("#btnReset");
  // create function to reset page
  function reset(){
    location.reload();
  }
  // add function to reset button to execute on click
  resetBtn.addEventListener("click", reset);
    
  
  //add timer to display answers after 1 minute
  let time = startTime * 60;
  const countDownTimer = document.querySelector("#time");
    
  let showTimer = setInterval(updateCountdown, 1000);  // call the updateCountdown function every second
  // after 1 minute, trigger calculateScore function
  setTimeout(calculateScore, time*1000);

  // function to create and display countdown timer
  function updateCountdown(){
    if (time > 0) {
   let minutes = Math.floor(time / 60);// return the lowest number without decimals
   let seconds = time % 60; // all seconds remaining after the division
   minutes = minutes < 10 ? `0${minutes}` : `${minutes}`; // if minutes are less than 10, then put a 0 infront if it
   seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
   countDownTimer.innerHTML = `${minutes}:${seconds}`;  // display time
   time--;
    } else {
     countDownTimer.innerHTML = '00:00';     
   }
 }
// add functionality to stop timer
 function stopTimer() {
   clearInterval(showTimer);
 }
 // target submit button to stop timer on click
 submitBtn.addEventListener("click", stopTimer); 

  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the largest continent',
      o: ['Africa', 'South America', 'Asia', 'North America'],
      a: 2,
    },
    {
      q: 'What is the smallest country in the world',
      o: ['Vatican City', 'Monaco', 'Nauru', 'San Marino'],
      a: 0,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <label><li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li></label>
                    <label><li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li></label>
                    <label><li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li></label>
                    <label><li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li></label>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);
        //get container to display score
        let resultsContainer = document.querySelector("#score");

        if (quizItem.a == i) { // if the answer is the same as the options index number
          //change background color of li element here
          liElement.style.background = "lightgreen";
        }

        if (radioElement.checked) {
          // code for task 1 goes here
          if(quizItem.a === i){
          score++;
          } else {
            liElement.style.background = "red";
          }
        }
        resultsContainer.innerHTML = `${score} out of ${quizArray.length}`;
      }
      
    });
   
  };
  
  // call the displayQuiz function
  displayQuiz();
  
  
});





