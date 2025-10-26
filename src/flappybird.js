//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//pipes
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;


window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //used for drawing on the board

  //draw flappy bird
  context.fillStyle = "green";
  context.fillRect(birdX, birdY, birdWidth, birdHeight);

  //load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  topPipeImg.onload = function () {
    context.drawImage(topPipeImg, 0, 0, pipeWidth, pipeHeight);
    context.drawImage(topPipeImg, 80, 0, pipeWidth, pipeHeight / 2);
    context.drawImage(topPipeImg, 160, 0, pipeWidth, pipeHeight / 3);
    context.drawImage(topPipeImg, 240, 0, pipeWidth, pipeHeight / 4);
  };

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  bottomPipeImg.onload = function () {
    context.drawImage(bottomPipeImg, 0, 565, pipeWidth, pipeHeight / 4);
    context.drawImage(bottomPipeImg, 80, 425, pipeWidth, pipeHeight / 3);
    context.drawImage(bottomPipeImg, 160, 320, pipeWidth, pipeHeight / 2);
    context.drawImage(bottomPipeImg, 240, 215, pipeWidth, pipeHeight);
  };

   requestAnimationFrame(update);

    
  };


// Function to draw the bird at its current position
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

// Main game loop
function update() {
  console.log("Game updating...");

   // Clears the entire canvas
  context.clearRect(0, 0, board.width, board.height);

   // Updates the bird's position
  birdY = birdY + 1; // Gravity effect: bird falls down each frame

   // Draws the bird at its new position
  drawBird();

  requestAnimationFrame(update);

  // Function to handle the jump
function jump() {
    console.log("Jumping!");
    
    // Apply an upward velocity, overwriting any previous velocity
    birdVelocity = -birdJumpStrength;
}

// Event listener for the spacebar
window.addEventListener('keydown', (event) => {
    // Check if the pressed key is the spacebar
    if (event.code === 'Space') {
       // This line is the key fix: it stops the browser from its default action
        event.preventDefault();
        console.log("Spacebar was pressed!");
        jump();
       
    }
});

    // Apply gravity to the bird's velocity
    birdVelocity += gravity;

    // Update the bird's vertical position
    birdY += birdVelocity;


    // Prevent the bird from going off the bottom of the screen
    if (birdY > canvas.height - birdSize) {
        birdY = canvas.height - birdSize;
        birdVelocity = 0; // Stop vertical movement
    }
    
    // Prevent the bird from going off the top
    if (birdY < birdSize) {
        birdY = birdSize;
        birdVelocity = 0;
    }

    // Draw the bird at its new position
    drawBird();
    
    // Update the status display with the current bird position
    statusDisplay.textContent = `Bird Y: ${Math.round(birdY)}`;

   
// Start the game loop
update();



}
