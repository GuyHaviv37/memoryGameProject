//Things I got to do:
// Congratulations when game is over 
// Please Hold while resetting
var panels = document.querySelectorAll(".panel");
var resetBtn = document.querySelector("#resetBtn");
var playBtn = document.getElementById("playBtn");
var scoreDisplay = document.querySelector("#score");
var fakePanel = document.getElementById("fakePanel");
var outputDisplay = document.querySelector("#outputDisplay");
var colors = ["red","blue","cyan","purple","pink","yellow","red","blue","cyan","purple","pink","yellow"];
var bgColor = "rgb(61, 60, 60)";
var flippedColor;
const NUM_OF_PANELS = 12;
const NUM_OF_PAIRS = NUM_OF_PANELS /2 ;
//init Game
var firstFlip = true;
var score = 0;
var matches = 0;
scoreDisplay.textContent=score;
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
                        matches++;
                        if(matches === NUM_OF_PAIRS){
                            console.log("WON");
                            outputDisplay.textContent="Congratulations!";
                        }
                    }else{
                        //Panel colors are not a match - return to hidden
                        flippedPanel.style.backgroundColor = bgColor;
                        panels[i].style.backgroundColor = bgColor;
                    }
                },100);
                scoreDisplay.textContent=(++score);
            }
        }
    });
}

//PlayBtn eventListener
playBtn.addEventListener("click",function(){
    this.textContent="";
    this.classList.add("hide");
    resetPanelStyling();
    setTimeout(resetGame,1000);
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
    outputDisplay.textContent="";
    setTimeout(function(){
        for(let i = 0;i<panels.length;i++){
            panels[i].style.backgroundColor = bgColor;
        }
    },700);
}

function resetPanelStyling(){
    for(let i=0;i < panels.length;i++){
        panels[i].classList.add("shownPanel");
        panels[i].classList.remove("matched");
    }
}
function resetScore(){
    score = 0;
    scoreDisplay.textContent=score;
}


function randomizeColors(){
    shuffle(colors); 
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