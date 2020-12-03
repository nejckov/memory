var events = (function() {


  /**********************************************************
  ****************** TURN CARD FUNC *************************
  **********************************************************/
  function turnCard(e, clicked, clickedArray, lives) {

    // SET INITIAL VARIABLE
    var points = 0; // SET POINTS

    // IF THERE IS LESS THEN 3 OPEN CARDS
    if(clicked < 3) {

        // OPEN CARD AND SHOW PICTURE
        e.target.style.transform = "rotateY(180deg)";
        var el1 = e.target.classList[0].substring(0, 5);
        var el2 = e.target.classList[0].substring(5, 10);
        var el3 = e.target.classList[0].substring(10);
        var backCard = el1 + 'back' + el3;

        // ROTATE
        document.querySelector('.' + backCard).style.transform = "rotateY(0deg)";

        // PUSH CARD TO ARRAY FOR LATER COMPERATION
        clickedArray.push(e.target.classList[0]);
        clickedArray.push(backCard);
      }

      // IF THERE IS EXACTLY 2 CARDS OPEN
      if(clicked === 2) {

        // COMPARE THIS 2 CARDS IF THERE ARE EQUAl
        if(clickedArray[0].substring(clickedArray[0].length - 1) === clickedArray[2].substring(clickedArray[2].length - 1))
        {
          // IF THERE ARE INCREASE POINTS AND DO NOTHING ELSE
          points++;

        } else {

          // IF THERE ARE NOT EQUALS DECREASE LIVES
          lives--;
          // SET TIMEOUT TO CLOSE CARDS
          setTimeout(function () {

            // CLOSE CARD
            clickedArray.forEach((item, i) => {
              // ROTATATE TO INITIAL POSITION
              if(i === 0 || i === 2) {
                document.querySelector('.' + item).style.transform = "rotateY(0deg)";
              } else if(i === 1 || i === 3) {
                document.querySelector('.' + item).style.transform = "rotateY(180deg)";
              }
            });
          }, 1000);
        }
      }

    // RETURN POINTS AND LIVES
    return {
      "points": points,
      "lives" : lives,
    }
  }

return {
  turnCard: function(e, clicked, clickedArray, lives) {
    return turnCard(e, clicked, clickedArray, lives);
  }
}
})();

export {
  events
};
