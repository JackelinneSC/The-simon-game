var buttonColours = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//check if a keyboard is pressed
$(document).keydown(function(){
  if(!started){
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

//Check which button is pressed
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);

});

//Function to create a new pattern
function nextSequence(){
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  //computer selection of buttons
  //flash effect on button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Sound when a button is clicked
  playSound(randomChosenColour);


}


//play sound of a button
function playSound(nameFile){
  var soundButton = new Audio('sounds/' + nameFile + '.mp3');
  soundButton.play();
}

//Animations to user
function animatePress(currentColour){
  $("#" + currentColour).addClass('pressed');
  setTimeout(function(){
    $('#' + currentColour).removeClass('pressed');
  },100);

}

//Check answer
function checkAnswer(index){
  if(gamePattern[index] === userClickedPattern[index]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("You lose!");
    playSound('wrong');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    $("body").addClass('game-over');
    setTimeout(function(){

      $('body').removeClass('game-over');
    },100);
    startOver();

  }

}

//Restart game
function startOver(){
  gamePattern = [];
  started = false;
  level =0;
}
