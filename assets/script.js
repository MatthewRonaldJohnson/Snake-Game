const playingArea = document.getElementById('playing-area');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
var score = 0;
var direction = "up"
var yPosition = 300;
var xPosition = 300;
var pXpos;
var pYpos;
var pellet = document.createElement('div');
var segments = {}
var segmentPositions = [];

document.addEventListener("keydown", function (e) { 
    switch (e.key) {
        case 'ArrowUp': direction = 'up';
            break;
        case 'ArrowDown': direction = 'down';
            break;
        case 'ArrowRight': direction = 'right';
            break;
        case 'ArrowLeft': direction = 'left';
            break;
    }
})

function playGame() {
    makePellet();
    var gamePlayLoop = setInterval(function () {
        switch (direction) {
            case 'up':
                yPosition -= 4;
                player.style.top = `${yPosition}px`
                break;
            case 'down':
                yPosition += 4;
                player.style.top = `${yPosition}px`
                break;
            case 'right':
                xPosition -= 4;
                player.style.right = `${xPosition}px`
                break;
            case 'left':
                xPosition += 4;
                player.style.right = `${xPosition}px`
                break;
        }
        if((yPosition <= (pYpos+10) && yPosition >= (pYpos-10)) && (xPosition <= (pXpos+10) && xPosition >= (pXpos-10))){
            score++;
            playingArea.removeChild(pellet);
            makePellet();
            upDateScore();
            growSnake();
        }
        if(yPosition <= -5 || yPosition >= 595 || xPosition <= -5 || xPosition >= 595){
            gameOver();
            clearInterval(gamePlayLoop);
        }
    }, 17);
}

function makePellet(){
    pXpos = Math.floor(Math.random()*601);
    pYpos = Math.floor(Math.random()*601);
    pellet.style = `width: 10px; height: 10px; background-color: green; position: absolute; right: ${pXpos}px; top: ${pYpos}px;`
    playingArea.appendChild(pellet);
}

function upDateScore(){
    scoreDisplay.textContent = `Score: ${score}`
}

function gameOver(){
    console.log('you lose')
}

function growSnake(){
    segments[score] = document.createElement('div')
    segments[score].style = `width: 10px; height: 10px; background-color: grey; position: absolute; right: ${xPosition}px; top: ${yPosition}px;`
    playingArea.appendChild(segments[score])
}
