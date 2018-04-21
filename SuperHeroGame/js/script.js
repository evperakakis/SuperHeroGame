$(document).ready(function() {

  var counterOfChoice = -1;
  var playerCards = [];
  var botCards = ["resources/hulk.png","resources/superMan.png","resources/captainAmerica.png","resources/batMan.png","resources/spiderMan.png"
,"resources/ironMan.png","resources/greenLantern.png","resources/wolverine.png","resources/theThing.png","resources/thor.png"];
  var previousPicks = [];
  var round = 0;
  var playerWins = 0;

  //adding sound effects
  var sndSword = new Audio("resources/swordSlash.mp3");
  var sndShield = new Audio("resources/energyShield.mp3");
  var sndBattle = new Audio("resources/battleStart.wav");
  var sndHit = new Audio("resources/hit.mp3");
  var sndChoose = new Audio("resources/chooseDing.mp3");
  sndChoose.playbackRate = 4;
  sndChoose.volume = 0.4;


  // hide modal
  $('#myModal').modal({ show: false})



    $(".cardsToPick").bind('click', function () {

      counterOfChoice++;
      var idOfCard = this.id;
      console.log(idOfCard);
      console.log(counterOfChoice);

      var card = document.getElementById(idOfCard);

      $(card).off('click'); //prevents clicking on the same image more than once


      var randomPick = Math.floor(Math.random() * 10) + 1;
      console.log(randomPick);

      do {
        randomPick = Math.floor(Math.random() * 10) + 1;
      } while ($.inArray(randomPick, previousPicks) != -1);

      if (randomPick < 2) {
        $(card).attr("src","resources/hulk.png");
        playerCards[counterOfChoice] = "resources/hulk.png";
      }
      else if (randomPick < 3) {
        $(card).attr("src","resources/superMan.png");
        playerCards[counterOfChoice] = "resources/superMan.png";
      }
      else if (randomPick < 4) {
        $(card).attr("src","resources/captainAmerica.png");
        playerCards[counterOfChoice] = "resources/captainAmerica.png";
      }
      else if (randomPick < 5) {
        $(card).attr("src","resources/batMan.png");
        playerCards[counterOfChoice] = "resources/batMan.png";
      }
      else if (randomPick < 6) {
        $(card).attr("src","resources/spiderMan.png");
        playerCards[counterOfChoice] = "resources/spiderMan.png";
      }
      else if (randomPick < 7) {
        $(card).attr("src","resources/ironMan.png");
        playerCards[counterOfChoice] = "resources/ironMan.png";
      }
      else if (randomPick < 8) {
        $(card).attr("src","resources/greenLantern.png");
        playerCards[counterOfChoice] = "resources/greenLantern.png";
      }
      else if (randomPick < 9) {
        $(card).attr("src","resources/wolverine.png");
        playerCards[counterOfChoice] = "resources/wolverine.png";
      }
      else if (randomPick < 10) {
        $(card).attr("src","resources/theThing.png");
        playerCards[counterOfChoice] = "resources/theThing.png";
      }
      else {
        $(card).attr("src","resources/thor.png");
        playerCards[counterOfChoice] = "resources/thor.png";
      }
      previousPicks[counterOfChoice] = randomPick;

      console.log(playerCards[counterOfChoice]);

      sndChoose.play();

      if (counterOfChoice > 3) {

        $('.getReady').removeAttr('hidden');
        $(".cardsToPick").off('click');

        setTimeout(function() {

          for (var i=0; i<5; i++){
            botCards.splice( $.inArray(playerCards[i], botCards), 1 );
          }

          $("#pickDiv").remove();
          $('.playDiv').removeAttr('hidden');

          //change background
          document.body.style.background = "url('../css/bgVs.jpg') no-repeat center center fixed";
          document.body.style.backgroundSize = "cover";


          $("#playerCard").attr("src",playerCards[0]);
          $("#botCard").attr("src",botCards[0]);

          // hide animations
          $("#animateSword").toggle();
          $("#animateShield").toggle();
          $("#animateShlashPlayer").toggle();
          $("#animateShlashBot").toggle();


          console.log(botCards);


        }, 2000);
        sndBattle.play();


      }


     });


     function battle(playerStrength) {
       //declare winner of round

       botChoose = Math.random();
       console.log("bot choose " + botChoose);


       if (botChoose < 0.5) {
         botStrength = $("#attackValueBot").html();
       }
       else {
         botStrength = $("#defenceValueBot").html();
       }


       if (parseInt(botStrength) > parseInt(playerStrength)) {
         console.log("bot Won");

         $("#animateShlashPlayer").toggle();

         setTimeout(function() {

           $("#animateShlashPlayer").toggle();

        }, 200);

       }
       else {
         console.log("player Won");

         $("#animateShlashBot").toggle();

         setTimeout(function() {

           $("#animateShlashBot").toggle();

        }, 200);
         playerWins++;
       }
       sndHit.play();
       round++;


       // update score
       $("#playerScore").html(playerWins);
       $("#botScore").html(round - playerWins);

       // update cards
       $("#playerCard").attr("src",playerCards[round]);
       $("#botCard").attr("src",botCards[round]);

       //update strengths
       $("#attackValue").html(Math.floor(Math.random() * 50) + 1);
       $("#defenceValue").html(Math.floor(Math.random() * 50) + 1);
       $("#attackValueBot").html(Math.floor(Math.random() * 50) + 1);
       $("#defenceValueBot").html(Math.floor(Math.random() * 50) + 1);


       if (round > 4) {
         console.log("END");
         if (parseInt(playerWins) > 2){
           $("#declareWinner").html("YOU WIN!");
         }
         else {
           $("#declareWinner").html("YOU LOSE...");
         }

         $('#myModal').modal('show');
       }

    }


    //on click funcions
     var attackSword = function () {

       documentWidth = (0.80 * $(document).width());

       $("#attackButton").off('click');
       $("#defendButton").off('click');

       $("#animateSword").toggle();
       $("#swordDiv").animate({left: "+=" +  documentWidth}, 800);
       sndSword.play();

       setTimeout(function() {

         $("#animateSword").toggle();
         $("#swordDiv").animate({left: "-=" +  documentWidth});

       }, 800);

       setTimeout(function() {

         battle($("#attackValue").html());

         if (parseInt(round) < 5) {
           documentWidth = documentWidth + (0.20 * $(document).width());
           $("#attackButton").on('click', attackSword);
           $("#defendButton").on('click', defendShield);
         }

      }, 1300);

     }

     var defendShield = function () {

       $("#defendButton").off('click');
       $("#attackButton").off('click');

       $("#animateShield").toggle();
       sndShield.play();

       setTimeout(function() {

         $("#animateShield").toggle();

      }, 800);

      setTimeout(function() {

        battle($("#defenceValue").html());

        if (parseInt(round) < 5) {
        $("#defendButton").on('click', defendShield);
        $("#attackButton").on('click', attackSword);
        }

     }, 1300);

     }

     $("#attackButton").on('click', attackSword);

     $("#defendButton").on('click', defendShield);

     $("#attackValue").html(Math.floor(Math.random() * 50) + 1);

     $("#defenceValue").html(Math.floor(Math.random() * 50) + 1);

     $("#attackValueBot").html(Math.floor(Math.random() * 50) + 1);

     $("#defenceValueBot").html(Math.floor(Math.random() * 50) + 1);


});
