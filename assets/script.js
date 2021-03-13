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
var segments = []
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
        moveSegments();
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
        if ((yPosition <= (pYpos + 10) && yPosition >= (pYpos - 10)) && (xPosition <= (pXpos + 10) && xPosition >= (pXpos - 10))) {
            score++;
            playingArea.removeChild(pellet);
            makePellet();
            upDateScore();
            growSnake();
        }
        if (yPosition <= -5 || yPosition >= 595 || xPosition <= -5 || xPosition >= 595) {
            gameOver();
            clearInterval(gamePlayLoop);
        }
    }, 17);
}

function moveSegments(){
    segmentPositions = segmentPositions.splice(0, segmentPositions.length-1) //remove last item in array
    segmentPositions.unshift([xPosition,yPosition]) //add current player location to index 0 of array
    for (let i = 0; i < segments.length; i++) {
        segments[i].style.top = `${segmentPositions[i][1]}px`;
        segments[i].style.right = `${segmentPositions[i][0]}px`;
    }
}

function makePellet() {
    pXpos = Math.floor(Math.random() * (595 - 5 + 1) + 5);
    pYpos = Math.floor(Math.random() * (595 - 5 + 1) + 5);
    pellet.style = `width: 10px; height: 10px; background-color: green; position: absolute; right: ${pXpos}px; top: ${pYpos}px;`
    playingArea.appendChild(pellet);
}

function upDateScore() {
    scoreDisplay.textContent = `Score: ${score}`
}

function gameOver() {
    console.log('you lose')
}

function growSnake() {
    segments.push(document.createElement('div'))
    segmentPositions.push([xPosition, yPosition])
    segments[score - 1].style = `width: 10px; height: 10px; background-color: grey; position: absolute; right: ${segmentPositions[score - 1][0]}px; top: ${segmentPositions[score - 1][1]}px;`
    playingArea.appendChild(segments[score - 1])
}
