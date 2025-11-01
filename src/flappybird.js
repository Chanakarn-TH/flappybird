
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

//pipe
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;

let velocityX = -2; //pipes moving left speed


let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;

let GAME_STATE;

window.onload = function() 
{
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function() 
    {
        context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    topPipeImg.onload = function() 
    {
        context.drawImage(topPipeImg, pipeX - pipeWidth, pipeY, pipeWidth, pipeHeight);
    }

    requestAnimationFrame(update);

    document.addEventListener("keydown", moveBird);
    window.addEventListener('click', gameState);
    document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.code);
    });
    board.addEventListener('click', () => {
      console.log('Board clicked');
      if (GAME_STATE === 'GAME_OVER') restartGame();
    });
}


function update() 
{
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);  


    //bird
    velocityY += gravity; //0 -> 0.4 -> 0.8 -> 1.2 ...
    birdY += velocityY;
    //console.log("Bird Y Position: " + birdY); For debugging


    pipeX += velocityX; //move pipe to left
    drawPipe(); 
    drawBird(); 
   
    // Clamp to ceiling
    if (birdY < 0) {
      birdY = 0;
    }
     // Clamp to floor
    if (birdY > board.height - birdHeight) {
      birdY = board.height - birdHeight;
      GAME_STATE = 'GAME_OVER';
    }  
  
    if (GAME_STATE === 'GAME_OVER') {
    context.fillStyle = 'red';
    context.font = '24px sans-serif';
    context.fillText('GAME OVER', 100, 100);
    }

   
    draw();
    requestAnimationFrame(update); 
}

// Function to draw the bird at its current position
function drawBird() 
{
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  
}       

function drawPipe()
{
    context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
}



function moveBird(e) 
{
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") 
    {
        //jump
        velocityY = -6;
    }

}



function gameState(e)
{
  if (GAME_STATE === 'RUNNING') flap();
  else restartGame();
}
function restartGame() 
{
  console.log('Restarting game...');
  GAME_STATE = 'RUNNING';
  if (e.code == "keyR")
    {
        birdY = board.height / 2;
        velocityY = 0;
    }
  
}


function flap() {
  console.log('Flap!');
  if (GAME_STATE === 'RUNNING') birdVelocity = -8;
 
}   

