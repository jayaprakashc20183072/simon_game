var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keypress(function(){
    
    if(!started){
   
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;

    }

});

$(".btn").on("click",function(){
 
    var userChosencolor = $(this).attr("id");
    
    userClickedPattern.push(userChosencolor);

    playSound(userChosencolor);

    animatePress(userChosencolor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){ 

    level++;

    userClickedPattern=[];
    $("#level-title").text("level "+level);
    
    var randomNumber =  Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name) {

    var audio = new Audio('sounds/'+name+'.mp3');

    audio.play();
}

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){

        $("#"+currentColor).removeClass("pressed");

    },100);

}

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){

                nextSequence();

            },1000);
        }
    }else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){

            $("body").removeClass("game-over");

        },200);

        $(`#level-title`).text("Game Over, Press any ket to Restart.");

        startOver();
        
    }
}

function startOver() {

    level = 0;

    started = false;

    gamePattern = [];
}






