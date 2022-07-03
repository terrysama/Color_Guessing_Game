var numSquares = 6;
var colors = [];
var targetColor;                                   // create variable for color goal

var h1 = document.querySelector("h1");
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorCode');        // select RGB display for H1
var messageDisplay = document.querySelector("#message");     // select message display from div
var resetButton = document.querySelector("#reset");
var difficultyMode = document.querySelectorAll(".mode");


initial();

function initial(){
    setUpModeButtons();
    setUpSquareListeners();
    reset();
}


function setUpModeButtons(){
    for(var i = 0; i < difficultyMode.length; i++){
        difficultyMode[i].addEventListener("click", function(){
            difficultyMode[0].classList.remove("selected");
            difficultyMode[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy"? numSquares= 3: numSquares= 6;      // TERNARY OPERATOR
            // if(this.textContent === "Easy"){
            //     numSquares = 3;
            // }   else{
            //     numSquares = 6;
            // }

            reset();
        });
    }
}

function setUpSquareListeners(){
    for(var i = 0; i < squares.length; i++){
        //STEP 5. Add logic for click events
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;   
            //compare clicked square color to goal   
            if(clickedColor === targetColor){                    
                //if Correct, display correct behaviour
                changeSquareColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                messageDisplay.textContent = "Correct!"
                resetButton.textContent = "Play Again?"
            } else{
                //else wrong, square fades to background color
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset(){
    resetButton.textContent= "New Colors"
    //define color array
    colors = generateRandonmColors(numSquares);
    //loop through squares and colors
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";    
        }  else{
            squares[i].style.display = "none";
        }
    }

    //pick a new target color from array
    targetColor = pickColor();

    //display the target color in the h1 color code
    colorDisplay.textContent = targetColor;

    //revert h1 background color to default
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent= "";
}

resetButton.addEventListener("click", function(){
    reset();
});

//Create function for changing all squares to goal color
function changeSquareColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//Create function to randomly select goal color from color array
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Create a function that makes an array for random colors
function generateRandonmColors(num){
    //make an array
    var arr= [];
    //repeat generated colors a number of times
    for(var i = 0; i < num; i++){
        //add colors into the array
        arr.push(randomRgb());
    }
    //return the array
    return arr;
}

//Create a function that generates random rgb colors
function randomRgb(){
    //generate random red
    var red = Math.floor(Math.random() * 256);
    //generate random green
    var green = Math.floor(Math.random() * 256);
    //generate random blue
    var blue = Math.floor(Math.random() * 256);
    
    //return rgb string
    return "rgb(" + red + ", " + green + ", " + blue + ")";     //return `rgb(${red}, ${green}, ${blue})`
}



// **** JAVASCRIPT DESIGN PATTERNS -- for code structuring
// ** MODULE DESIGN PATTERN

