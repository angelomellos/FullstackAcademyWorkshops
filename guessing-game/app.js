var number = Math.ceil(Math.random() * 1000000);
var guess = 0;
var guesses = 0;
//what they guess in the input field
$(function(){
  $('#guess').change(
    function() {
      guess = parseInt($('#guess').val());
      }
  );
});
function playAgain(){
  $("#count").text("Click to play again.");
  $("#count").click(function(){
    guesses = 0;
    number = Math.ceil(Math.random() * 1000000);
    $("#count").text(guesses + " of 20 guesses");
    $("#count").off("click");
  });
}

function hotOrCold() {
  $('#message').removeClass("hot cold");
  var dir = (number > guess) ? "Guess Higher" : "Guess Lower";
  var diff = Math.abs(number - guess);
  if (guess == 0 || guess > 1000000 || isNaN(guess))
    $("#message").text("Invalid Guess");
  else if (diff == 0){
    $("#message").text("Correct!");
    return playAgain();
  }
  else if (diff > 300000)
    $("#message").text("Cold. " + dir).addClass("cold");
  else if (diff > 200000)
    $("#message").text("Cool. " + dir).addClass("cold");
  else if (diff > 100000)
    $("#message").text("Warm. " + dir).addClass("hot");
  else
    $("#message").text("Hot. " + dir).addClass("hot");
  //count their guesses
  guesses++;
  if (guesses >= 20){
    playAgain();
    $("#message").text("): You lose");
  }
  else
    $("#count").text(guesses + " of 20 guesses");
}

$(function(){
    $("#submit").click(hotOrCold(););
});

$(function(){
    $("#guess").keyup(function(e){
      if(e.which == 13)
        hotOrCold();
    });
});
