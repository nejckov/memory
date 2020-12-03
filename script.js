// IMPORTED MODULES
import { levels } from "./js/levels.js";
import { paint } from "./js/paint.js";
import { events } from "./js/events.js";
import { serverSide } from "./js/serverSide.js";


// ****************** MAIN CONTROLLER ******************//
var controller = (async function(paint, levels, serverSide) {

  // DEFINING VARIABLES
  var countLevel = 1; // CURRENT LEVEL
  var stage = levels.getLevel(countLevel); // SET LEVEL IMAGES
  var clicked = 0; // NUMBER OF CLICKED CARDS -> MAX 2 CLICK
  var clickedArray = []; // CONTAINER OF TWO CARD FOR COMPERATION OF EQUAL
  var totalPoints = 0; // TOTAL POINTS
  var stagePoints = 0; // TOTAL STAGE POINTS
  var lives = 3; // STARTING NUMBER OF LIVES
  var dataAPI = 0; // API CONNECTION -> TRUE(1) -> FALSE(0)
  var data; // DATA RECIEVED FROM EVENT
  var playerName = 'Anonymous'; // DEFAULT PLAYER NAME
  var players = []; // PLAYERS ARRAY FROM SERVER


  // IF NOT CONNECTED TO SERVER -> THEN CONNECT
  if(dataAPI === 0) {
    dataAPI = serverSide.api();
  }

  // SHOW CURRENT LEVEL
  document.querySelector('.stage').innerHTML = 'Težavnost: ' + countLevel;
  // DRAW STAGE
  eventDraw();
  // DRAW LIVES
  paint.drawLives(lives);


  /**************************************************
  *************** CLICKED NEXT LEVEL ****************
  **************************************************/
  document.querySelector('.nx-level').addEventListener('click', function(e) {

    // SHOW CURRENT LEVEL
    document.querySelector('.stage').innerHTML = 'Težavnost: ' + countLevel;
    // REMOVE ACCOMPLISHED STAGE
    document.querySelector('.game-memory').innerHTML = '';
    // REMOVE NEXT LEVEL BLOCK
    document.querySelector('.next-level').style.display = 'none';
    // DRAW STAGE
    eventDraw();
  });


  /**************************************************
  ************ SUBMIT SCORE TO SERVER****************
  **************************************************/
  document.querySelector('.submit-score').addEventListener('click', async function() {

    // REMOVE GAME OVER BLOCK
    document.querySelector('.game-over').style.display = 'none';
    // SHOW SPINNING
    document.querySelector('.loading').style.display = 'flex';

    // GET PLAYER NAME
    playerName = document.querySelector('.playerName').value;
    // SEND PLAYER NAME AND POINTS TO SERVER
    await serverSide.postData(playerName, totalPoints);

    // GET RANKING BOARDS FROM SERVER -> SAVE TO ARRAY
    players =  await serverSide.getData();

    // REMOVE SPINNIG
    document.querySelector('.loading').style.display = "none";
    // SHOW RANKING BLOCK
    document.querySelector('.ranking').style.display = "block";

    // CREATING AND SHOWING RESULT ON LEADER BOARD
    document.querySelector('.dataInsert').innerHTML = '';
    // DRAW PLAYER RANKING TABLE
    paint.drawRanking(players);
  });


  /**************************************************
  ******************** CLICKED PLAY AGAIN ***********
  **************************************************/
  document.querySelector('.playAgain').addEventListener('click', function() {

    // REMOVE RANKING BLOCK
    document.querySelector('.ranking').style.display = 'none';
    // REMOVE MEMORY GAME
    document.querySelector('.game-memory').innerHTML = '';

    // SET VARIABLES TO INITIAL VALUE
    countLevel = 1;
    lives = 3;
    totalPoints = 0;
    playerName = 'Anonymous';
    players = [];

    // DRAWING HEARTS
    paint.drawLives(lives);
    // DRAW STAGE
    eventDraw();

    // SHOW CURRENT LEVEL
    document.querySelector('.stage').innerHTML = 'Težavnost: ' + countLevel;
    // SHOW CURRENT SCORE
    document.querySelector('.points').innerHTML = 'Točke: 0';
  });


  /******************************************************
  ***************** REPEAT DRAW EVENT *******************
  ******************************************************/
  function eventDraw() {

    // GET LEVEL CARDS
    stage = levels.getLevel(countLevel);
    // DRAW RANDOM STAGE
    paint.draw(stage);
    // TURN CARD BACK
    paint.startStage();

    // IF CLICKED A ANY CARD
    var elClass = document.querySelectorAll("[class^=card-front]");

    for (var i = 0; i < elClass.length; i++) {
      elClass[i].addEventListener('click', function(event) {

        // INCREASE CLICKED
        clicked++;

        // EVENT CHECK IF CARDS MATCH
        data = events.turnCard(event, clicked, clickedArray, lives);

        // SET VARIABLE FROM EVENT
        totalPoints += data.points;
        stagePoints += data.points;
        lives = data.lives;

        // SHOW VARIABLE FROM EVENT TO GAME
        document.querySelector('.points').innerHTML = "Točke: " + totalPoints;
        document.querySelector('.stage').innerHTML = "Težavnost: " + countLevel;

        // IF CLICKED TWO CARD -> SET TO INIT
        if(clicked === 2) {
          clicked = 0;
          clickedArray = [];
        }

        // REMOVE LIVES IF TWO CARDS NOT MATCH
        if(lives === 2) {
          document.querySelector('img.heart2').style.display = 'none';
        } else if(lives === 1) {
          document.querySelector('img.heart1').style.display = 'none';
        } else if(lives === 0) {
          document.querySelector('img.heart0').style.display = 'none';
        }

        // IF NO LIVES -> SHOW GAME OVER BLOC
        if(lives === 0) {
          document.querySelector('.game-over').style.display = "block";
        }

        // CHECK IF STAGE IS COMPLED -> GUESSED ALL CARDS
        if(stagePoints === (countLevel + 1)) {
          document.querySelector('.next-level').style.display = 'flex';
          // INCREASE STAGE LEVEL
          countLevel++;
          // SET STAGE POINT TO INIT
          stagePoints = 0;
        }
      });
    }
  }

})(paint, levels, serverSide);
