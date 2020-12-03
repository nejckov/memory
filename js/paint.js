var paint = (function() {

  /*************************************
  ********** PICTURE STORAGE ***********
  *************************************/
  function picture(x) {
    if(x === 'a') {
      return './img/a.svg';
    } else if(x === 'b') {
      return './img/b.svg';
    } else if(x === 'c') {
      return './img/c.svg';
    } else if(x === 'd') {
      return './img/d.svg';
    } else if(x === 'e') {
      return './img/e.svg';
    } else if(x === 'f') {
      return './img/f.svg';
    } else if(x === 'g') {
      return './img/g.svg';
    } else if(x === 'h') {
      return './img/h.svg';
    } else if(x === 'i') {
      return './img/i.svg';
    } else if(x === 'j') {
      return './img/j.svg';
    } else if(x === 'k') {
      return './img/k.svg';
    } else if(x === 'l') {
      return './img/l.svg';
    }
  }


  /********************************************
  ************* DRAWING LIVES FUNC ************
  ********************************************/
  function drawLives(lives) {

    // FOREACH LIVES CREATE ELEMENT -> DEPENDS OF LIVES
    for (var i = 0; i < lives; i++) {
      // CREATION ELEMENT IMG
      var img = document.createElement('img');
      // ADDING TO ELEMENT CLASS WITH NUMBER
      img.classList.add('heart'+ i);
      // ADDING TO ELEMENT PICTURE WITH SRC
      img.src = './img/heart.svg';
      // APENDING ELEMENENT TO PARENT CLASS LIVES
      document.querySelector('.lives').appendChild(img);
    }
  }


  /************************************************
  ***************** DRAWING RANKING FUNC **********
  ************************************************/
  function drawRanking(players) {

    // FOREACH TABLE LINE -> DEPENDS ON PLAYER ARRAY LENGTH
    players.forEach((player, i) => {
      // CREATE ELEMENT LINE -> TR
      var tra = document.createElement('tr');
      // ADDING TO ELEMENT CLASS WITH NUMBER
      tra.classList.add('player' + i);
      // APENDING LINE TO PARENT ELEMENT WITH CLASS DATAINSERT
      document.querySelector('.dataInsert').appendChild(tra);
      // SET HOW LINE WILL LOOK LIKE
      var dec = "<td>" + (i + 1) + "</td><td>" + player.name + "</td><td>" + player.points + "</td>";
      // SET THIS LINE DESIGN TO ITS LINE
      tra.innerHTML = dec;
    });

  }


  /****************************************************
  ********** CREATION OF RANDOM PUZZLE FUNC ***********
  ****************************************************/
  function createPuzzle(stage) {

    // SET INITIAL VALUES
    var randNum; // RANDOM NUMBER
    var content = []; // CONTENT ARRAY FOR RETURN
    var randArr = stage[0].split(""); // SPLIT STAGE STRING TO ARRAY OF EVERY ELEMENT

    // CREATING FOUR LINES
    for (var i = 0; i < 4; i++) {
      var line;
      // CREATION FOUR ITEM IN LINES
      for (var j = 0; j < 4; j++) {
        // SETTING RANDOM NUMBER FROM 0 TO ARRAY LENGTH
        randNum = Math.floor(Math.random() * randArr.length);
        // SELECT RANDOM CARD FROM ARRAY
        var card = randArr.splice(randNum, 1);

        // IF LINE ALLREADY EXIST
        if(!line) {
          // THEN CARD IS LINE
          line = card;
        } else {
          // ELSE ADD CARD TO THE LINE
          line += card;
        }
      }

      // PUSH LINE TO THE SHOWN CONTENT
      content.push(line);
      // LINE SET EMPTY
      line = '';
    }

    // RETURN CONTENT ARRAY
    return content;
  }


  /******************************************************
  **************** STARTING STAGE FUNC ******************
  ******************************************************/
  function startStage() {

    // GET ALL STAGE CARDS
    var elClass = document.querySelectorAll("[class^=card-front]");

    // FOR EVERY CARD DO BELOW
    for (var i = 0; i < elClass.length; i++) {
      // TURN CARD TO FRONT SIDE
      elClass[i].style.transform = "rotateY(180deg)";
      // SET EVERY 3 POINTS OF CLASS ELEMENT
      var el1 = elClass[i].classList[0].substring(0, 5);
      var el2 = elClass[i].classList[0].substring(5, 10);
      var el3 = elClass[i].classList[0].substring(10);

      // SET VALUE FOR BACKCARD
      var backCard = el1 + 'back' + el3;
      // ROTATE THIS
      document.querySelector('.' + backCard).style.transform = "rotateY(0deg)";
    }

    // SET TIMEOUT, WHEN SHOULD TURN CARD BACK
    setTimeout(function () {

      // GET ALL CARDS
      var elClass = document.querySelectorAll("[class^=card-front]");

      // FOR EVERY CARD DO BELOW
      for (var i = 0; i < elClass.length; i++) {

      // ROTATE BACK AFTER SET TIMEOUT FUNCTION
      elClass[i].style.transform = "rotateY(0deg)";
      var el1 = elClass[i].classList[0].substring(0, 5);
      var el2 = elClass[i].classList[0].substring(5, 10);
      var el3 = elClass[i].classList[0].substring(10);

      backCard = el1 + 'back' + el3;
      document.querySelector('.' + backCard).style.transform = "rotateY(180deg)";
      }
    }, 3600);
  }


  /*****************************************************
  ***************** DRAW STAGE FUNC ********************
  *****************************************************/
  function draw(stage) {
    // SET UNIQUE NUMBER TO INITIAL
    var p = 0;

    // CREATE RANDOM STAGE
    content = createPuzzle(stage);

    // FROM RANDOM STAGE CREATE LINES
    content.forEach((item, k) => {

      // SPLIT EACH LINE TO ARRAY OF CARD IN ITS LINE
      var line = item.split("");

      // CREATE ROW ELEMENT DIV
      var row = document.createElement('div');
      // ADD UNIQUE CLASS TO ROW
      row.classList.add('line' + k);
      // SET STYLE TO ITS ROW
      row.style.top = 60 * k + 15 + 'px';
      // APPEND ROW TO ITS PARENT CLASSS GAME-MEMORY
      document.querySelector('.game-memory').appendChild(row);

      // SET VARIABLE INITIAL SRC FOR CARD
      var src;

      // GET EACH CARD ON ITS CREATED ROW
      line.forEach((card, i) => {

        // SET UNIQUE NUMBER FOR CARD
        p++;
        // GET CARD PICUTRE
        src = picture(card);
        // CREATE CARD ELEMENT DIV
        var cardVis = document.createElement('div');
        // ADD TO ELEMENT UNIQUE CLASS WITH ASSIGNED OF CARD
        cardVis.classList.add('card' + p + card);
        // ADD STYLE TO CARD ELEMENT
        cardVis.style.marginLeft = '5px';
        // APPEND CARD TO ITS BELONGING ROW
        row.appendChild(cardVis);

        // SET FRONT IMAGE TO ITS CARD
        var front = document.createElement('img');
        // ADDING FRONT CLASS
        front.classList.add('card-front' + p + card);
        // APPEND IT TO ITS FRONT
        cardVis.appendChild(front);

        // SET BACK IMAGE TO ITS CARD
        var img = document.createElement('img');
        // ADDING BACK CLASS
        img.classList.add('card-back' + p + card);
        // SET IMAGE TO BACK OF CARD
        img.src = src;
        // APPEND IT TO ITS BACK
        cardVis.appendChild(img);
      });
    });
  }


//***************************** RETURN ****************************
  return {
    draw: function(stage) {
      return draw(stage);
    },
    startStage: function() {
      return startStage();
    },
    drawLives: function(lives) {
      return drawLives(lives);
    },
    drawRanking: function(players) {
      return drawRanking(players);
    }
  }
})();


export {
  paint
};
