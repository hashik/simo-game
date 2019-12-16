
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var score = 10;
$(document).keypress(function() {
  if (!started) {
    //$("#level-title").html("<br><br><br><br><br><br><h3> Level " + level+"</h3> <br>");
    nextSequence();
   
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){

         $("#level-title").html("<h3>Greate !! Your score " + score+"</h3>");

        

        setTimeout(function () {
          nextSequence();
         
        }, 1000);

       
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").html("<h3>Game Over,  Score :"+score+" Press Any Key to Restart</h3>");
      
      var high_score = document.cookie;
      high_score = high_score.split("=")[1];

      if(score > high_score){
        document.cookie = "high_score="+score; 
      }
      //
     var high_score = document.cookie;
      high_score = high_score.split("=")[1];

      $(".score").html("High Score : "+ high_score)
      
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  
  if (level < 6){
    score = score +  (10 * level);
  }if (level >= 6 && level < 10){
    score = score + (15 * level);
    
  }if (level > 13){
    score = score + (15 * level);
     $(".box").rotate();
  }

  if( level === 5){
    $(".box").rotate();
  }

  if( level === 8){
    $(".box").rotate({ count:4, duration:0.6, easing:'ease-out' });
  }
  
  var high_score = document.cookie;
  high_score = high_score.split("=")[1];
  
  if(score > high_score ){
    document.cookie = "high_score="+score; 
  }
  var high_score = document.cookie;
  high_score = high_score.split("=")[1];


  $(".score").html("High Score : "+ high_score);
  level++;
  $("#level-title").html("<h3>Level " + level+"</h3>");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function () {
            $("#level-title").html("<h3>Try this </h3>");
            test();
          }, 1000);
    
  }

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function test (){
    $("#game_box").addClass("hide_box")
    $(".btn").addClass("off_shadow");

    setTimeout(function() {
      $("#game_box").removeClass("hide_box");
    $(".btn").removeClass("off_shadow");
  }, 400*gamePattern.length);
    var i = 0;
    var audio = new Audio("sounds/" + gamePattern[i] + ".mp3");
    audio.play();
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    

      audio.addEventListener('ended', function () {
                i++;
                if (i < gamePattern.length) {
                    audio.src = "sounds/" + gamePattern[i] + ".mp3";
                    audio.play();
                     $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                }
                
            }, true);

    

  
    
     
 

   //
   //

}


 var high_score = document.cookie;
  high_score = high_score.split("=")[1];
  
  $(".score").html("High Score : "+ high_score)