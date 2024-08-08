var startBtn = document.getElementById("startGame");
var startDiv = document.getElementById("start");
var gameDiv = document.getElementById("game");
var quesPosition = document.getElementById("quesPosition");
var finalStats = document.getElementById("final");
var playerName = document.getElementById("userName");
var playerSubmit = document.getElementById("userSubmit");
var playAgainBtn = document.getElementById("pa");
var score = document.getElementById("scoreTitle");
var scoreName = document.getElementById("scoreList");
var submitBtn = document.getElementById("userSubmit");
var CB = document.getElementById("cb");
var inputLabel = document.getElementById("inputlabel");

var currentQuestion;
var correctAnswers;
var numOfQuestions = questions.length;
var counter;

startBtn.addEventListener("click",function(e){
    e.preventDefault();
    beginGame();
    // countdown_init();
});

function beginGame() {
    startDiv.style.display = "none";
    gameDiv.style.display = "block";
    quesPosition.style.display = "block";
    finalStats.style.display = "none";
    playAgainBtn.style.display = "none";
    CB.style.display = "none";
    score.style.display = "none";
    scoreName.style.display = "none";
    inputLabel.style.display = "none";
    counter = 0;
    correctAnswers = 0;
    displayQuestion();
    
    
    
}

function emptyDiv() {
    gameDiv.innerHTML = "";
}

function displayQuestion() {
    emptyDiv();
    currentQuestion = questions[counter];
    var pos = counter + 1;
    quesPosition.textContent = "Question: " + pos + "/" + numOfQuestions;
    var question = document.createElement("h2");
    question.textContent = currentQuestion.ques;
    gameDiv.appendChild(question);

    displayQuestionChoices();

    if (currentQuestion.image) {
        var img = document.createElement("img");
        img.src = currentQuestion.image;
        img.alt = "Question image";
        img.style.width = "30%"; 
        gameDiv.appendChild(img);
    }
    //displayQuestionChoices();
}

function displayQuestionChoices() {
    for (let i = 0; i < currentQuestion.choices.length; i++){
        var choice = document.createElement("h4");
        choice.setAttribute("class", "choiceBG");
        choice.setAttribute("data-value", currentQuestion.choices[i]);
        choice.textContent = currentQuestion.choices[i];
        gameDiv.appendChild(choice);  
    }    
}

gameDiv.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.matches("h4")) {
        var chosenAnswer = e.target.getAttribute("data-value");
        compareAnswers(chosenAnswer);        
    }
  });

  function compareAnswers(chosenAnswer){
      if (chosenAnswer === currentQuestion.answer) {
          correctAnswers++;
          counter++;
          playOrEnd();          
      } else{
          counter++;
          playOrEnd();
      }
  }

  function playOrEnd() {
      if (counter === numOfQuestions) {
          showStats();
          othername();
          hidetimer();
          
      } else {
          displayQuestion();
      }      
  }

  function othername() {
    inputLabel.style.display = "block";
    playerSubmit.style.display = "block";
    playerName.style.display = "block";
    // var input = document.getElementById("userName").value;
    // localStorage.setItem("Highscore", correctAnswers);
    // localStorage.setItem("name", input);
    
};

function highScore() {
    playerSubmit.style.display = "none";
    playerName.style.display = "none";
    score.style.display = "block";
    scoreName.style.display = "block";
    playAgainBtn.style.display = "block";
    CB.style.display = "block";
    finalStats.style.display = "none";
    inputLabel.style.display = "none";
    var input = document.getElementById("userName").value;
    
    localStorage.setItem("Highscore", correctAnswers);
    localStorage.setItem("name", input);
    scoreName.innerHTML = "";
    var h3 = document.createElement(h3);
    h3.textContent = "1." + input + "---" + correctAnswers;
    scoreName.appendChild(h3);
}

  function showStats() {
      gameDiv.style.display = "none";
      quesPosition.style.display = "none";
      finalStats.style.display = "block";
      
      finalStats.innerHTML = "";
      var h2 = document.createElement(h2);
      h2.textContent = "Your final score is " + correctAnswers;
      
      finalStats.appendChild(h2);
      
  }

  function clearscore() {
      localStorage.clear();
      document.getElementById("scoreList").innerHTML = "-------";
    }
  var user_score_list = [];
  function guardarNumeros() {
        boxvalue = document.getElementById("userName").value;
        user_score_list.push(boxvalue);
        user_score_list.push(correctAnswers);
        console.log(user_score_list);
        localStorage.setItem("datakey", JSON.stringify(user_score_list));
        var h3 = document.createElement(h3);

        h3.textContent = user_score_list[0] + " --- " + user_score_list[1];
        scoreName.appendChild(h3);
        

    }

  playAgainBtn.addEventListener("click", function(e){
      e.preventDefault();
      countdown_init();
      beginGame();
      
  });

  submitBtn.addEventListener("click", function(e){
      e.preventDefault();
      highScore();
      
  });

  CB.addEventListener("click", function(e){
      e.preventDefault();
      clearscore();
  });

/*************************************************************/

    var countdown;
    var countdown_number;
   
    function countdown_init() {
        countdown_number = 31;
        countdown_trigger();
    }
   
    function countdown_trigger() {
        if (countdown_number > 0) {
            countdown_number--;
   
            document.getElementById('countdown_text').innerHTML = "Time: " + countdown_number;
   
            if(countdown_number > 0) {
                countdown = setTimeout('countdown_trigger()', 1000);
            }else{
                window.location.href = "timeup.html";
            }
        }
    }


function hidetimer() {
    clearTimeout(countdown);   
    }

/*************************************************************/



