/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores,activePlayer, gamePlaying, previousDiceRoll;

init(); 

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
    // 1. Random Number 
    var dice = Math.floor(Math.random() * 6) + 1; 
    var dice2 = Math.floor(Math.random() * 6) + 1;
        
    // 2. Display result 
        
    //display dice 1     
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + ".png";
        
    // 3. Update the round score IF the rolled number was NOT a 1 
    
    // if either previous dice was 6 and either current dice is 6, lose the whole score
    if (dice === 6 && previousDiceRoll === 6) {
        scores[activePlayer] = 0;  
        document.querySelector('#score-' + activePlayer).textContent = '0'; 
        nextPlayer(); 
    } //if both are not equal to 1 
    else if (dice != 1) {
        roundScore += dice; 
        document.querySelector('#current-' + activePlayer).textContent = roundScore; 
    } 
    else {
        nextPlayer();    
    }
        //update previous vars 
        previousDiceRoll = dice; 
   }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
    //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; 
    
    //update UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var highScore = document.querySelector('.final-score').value; 
        
    //All values of undefined, null, or " are coerced to false 
    //Anything else is coerced to true
    if (!highScore) {
        highScore = 100; 
    }
    
    //Check if player won the game 
    if (scores[activePlayer] >= highScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;   
    } else {
    //next player
    nextPlayer();    
    }       
 }
});

function nextPlayer() {
    //next player 
        activePlayer=== 0 ? activePlayer = 1 : activePlayer = 0; 
        roundScore = 0; 
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0'; 
        
        //use toggle instead of this
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        diceDOM.style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-submit').addEventListener('click', function() {
   highScore = document.getElementById('setScore').value; 
    document.getElementById('setScore').textContent = '';
    console.log(highScore);
    
});

//Initialize game
function init() {
    scores = [0,0];
    activePlayer = 0; 
    roundScore = 0; 
    gamePlaying = true; 
    previousDiceRoll = 0; 
    
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
    
}




































