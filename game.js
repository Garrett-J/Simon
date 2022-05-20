let buttonColours = ["red", "blue", "green", "yellow"]; //Creates an array of the button ids.

let gamePattern = []; //Creates an empty array for the pattern the game will create
let userClickedPattern = []; //Creates an empty array for the pattern the user has clicked


let started = false; //Makes sure the page starts in the New Game position

let level = 0; //Level 0 is the New Game position

$(document).keypress(function(){ //starts the game when the user presses a key
if (!started){ //checks to make sure that started = false (won't do anything if mid-game)

    $("#level-title").text("Level " + level);  //changes Level-title into Level: and changes level from 0 to 1
    nextSequence(); //calls the function that starts each level
    started = true; //changes the game state to started
}
});

$(".btn").click(function(){ //function that is called when the user clicks a button
let userChosenColour = $(this).attr("id"); //calls the button that is clicked userChosenColour
userClickedPattern.push(userChosenColour); //pushed the userChosenColour into the end of the userClickedPattern

playSound(userChosenColour); //plays the sound of the button clicked

animatedPress(userChosenColour); //animates the button clicked
checkAnswer(userClickedPattern.length-1); //runs the function that checks the answer, subtracting one so that it uses the last element of the array since it starts with 0
});

function checkAnswer(currentLevel){ //Checks the user's answer with the game pattern
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //declares a statement if the user's answer matches the game pattern
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){ //and if the arrays of the user's answers and the game pattern are the same length, call the nextSequence function.
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
} else { //if both of these aren't fufilled, do these instead
    console.log("wrong");
    playSound("wrong"); //plays the buzzer sound

    $("body").addClass("game-over"); //Makes the background red
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 800); //removes the red background after 0.8s (matches the sound clip)

    $("#level-title").text("Game Over, Press Any Key to Restart"); //changes the h1 text
    startOver(); //calls the function that resets the game values
}


}

function startOver(){ //function that is called when a user loses the game. Resets everything except for the text, which is changed in the checkAnswer function

    level = 0; //sets the level to 0
    gamePattern = []; //resets the game pattern array
    started = false; //resets the game to the New Game state
}


function nextSequence() { //gets called after a user starts the game or gets the right answer

    userClickedPattern = []; //empties the previous level's user answer
    level++; //adds one level to the level count
    $("#level-title").text("Level " + level); //changes the level text to the next level

    let randomNumber = Math.floor(Math.random()*4); //picks a random number between 0 and 3
    let randomChosenColour = buttonColours[randomNumber]; //picks a random colour from the buttonColours array using the random number
    gamePattern.push(randomChosenColour); //pushes the random colour into the end of the gamePattern array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animates the button that is being added to the gamePattern array
    playSound(randomChosenColour); //plays the audio effect of the same button
    }


function playSound(name){ //the function that plays the audio of a button
    let audio = new Audio("sounds/" + name + ".mp3"); //finds the audio file
    audio.play();//plays the audio
}

function animatedPress(currentColour){ //animates the buttons
    $("#" + currentColour).addClass("pressed"); //adds the pressed class
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed")
    },100) //removes the pressed class after .1 seconds
};

