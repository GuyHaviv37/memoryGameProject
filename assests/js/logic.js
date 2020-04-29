//Things I got to do:
// Congratulations when game is over 
// Please Hold while resetting
var panels = document.querySelectorAll(".panel");
var resetBtn = document.querySelector("#resetBtn");
var playBtn = document.getElementById("playBtn");
var scoreADisplay = document.querySelector("#scoreA");
var scoreBDisplay = document.querySelector("#scoreB");
var fakePanel = document.getElementById("fakePanel");
var outputDisplay = document.querySelector("#outputDisplay");
var colors = ["red","blue","cyan","purple","pink","yellow","grey","white","orange","fuchsia","khaki","lime","teal","salmon","red","blue","cyan","purple","pink","yellow","grey","white","orange","fuchsia","khaki","lime","teal","salmon"];
var bgColor = "rgb(61, 60, 60)";
var flippedColor;
const NUM_OF_PANELS = 28;
const NUM_OF_PAIRS = NUM_OF_PANELS /2 ;
//init Game
var firstFlip = true;
var scoreA , scoreB;
var player = "Player A";
resetScore();
randomizeColors();


//add eventListener for fliping squares
for(let i=0;i<panels.length;i++){
    panels[i].addEventListener("click",function(){
        console.log("CLICKED");
        if(!panels[i].classList.contains("matched")){
            if(firstFlip){
                panels[i].style.backgroundColor = colors[i];
                flippedPanel = panels[i];
                firstFlip = false;
            }else{
                panels[i].style.backgroundColor = colors[i];
                firstFlip = true;
                //Setting a timeout so we can see the 2nd panel's color for 0.5s before they flip again.
                setTimeout(function(){
                    if(flippedPanel.style.backgroundColor === colors[i] && flippedPanel!==panels[i]){
                        //Panel colors are a match
                        flippedPanel.classList.add("matched");
                        panels[i].classList.add("matched");
                        player === "Player A" ? scoreADisplay.textContent=(++scoreA) : scoreBDisplay.textContent=(++scoreB); //update score 
                    }else{
                        //Panel colors are not a match - return to hidden
                        flippedPanel.style.backgroundColor = bgColor;
                        panels[i].style.backgroundColor = bgColor;
                    }
                },700);
                setTimeout(togglePlayer,701);

            }
        }
    });
}

//PlayBtn eventListener
playBtn.addEventListener("click",function(){
    this.textContent="";
    this.classList.add("hide");
    setTimeout(resetPanelStyling,500);
    setTimeout(resetGame,1500);
});

//ResetBtn eventListener
resetBtn.addEventListener("click",function(){
    resetGame();
});

function resetGame(){
    resetPanelStyling();
    resetScore();
    randomizeColors();
    for(let i = 0;i<panels.length;i++){
        panels[i].style.backgroundColor = colors[i];
    }
    player = "Player A";
    outputDisplay.classList.remove("winner");
    outputDisplay.classList.remove("alt");
    outputDisplay.textContent=player+" turn";
    setTimeout(function(){
        for(let i = 0;i<panels.length;i++){
            panels[i].style.backgroundColor = bgColor;
        }
    },2000);
}

function resetPanelStyling(){
    for(let i=0;i < panels.length;i++){
        panels[i].classList.add("shownPanel");
        panels[i].classList.remove("matched");
    }
}
function resetScore(){
    scoreA = 0;
    scoreB = 0;
    scoreADisplay.textContent = scoreA;
    scoreBDisplay.textContent = scoreB;
}

function randomizeColors(){
    shuffle(colors); 
}

function togglePlayer(){
    player === "Player A" ? player = "Player B" : player = "Player A";
    outputDisplay.textContent=player+" turn";
    outputDisplay.classList.toggle("alt");
    checkForWinner();

}

function checkForWinner(){
    if(scoreA+scoreB === NUM_OF_PAIRS){
        outputDisplay.classList.remove("alt");
        outputDisplay.classList.add("winner");
        let winner = "";
        scoreA > scoreB ? winner = "Player A" : scoreB > scoreA ? winner = "Player B" : winner = "It's a Tie";
        outputDisplay.textContent = "The Winner is : "+winner;
    }
}


//Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      //swap
      let t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
  }