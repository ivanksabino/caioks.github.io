
    // Declare variables
        var canvas = document.getElementById('gameCanvas');
        var canvasContext = canvas.getContext('2d');
        const PADDLE_HEIGHT = 100;
        const PADDLE_WIDTH = 10;
        const BALL_WIDTH = 5;
        const COMPUTER_PADDLE_SPEED = 7;
        const WINNING_SCORE = 3;
        var ballX = canvas.width / 2;
        var ballY = canvas.height / 2;
        var ballSpeedX = 5;
        var ballSpeedY = 4;
        var playerPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2;
        var computerPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2;
        var playerScore = 0;
        var computerScore = 0;
        var gameOver = false;
    
    // Calculate mouse input position
        function calculateMousePos(evt) {
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return {
                x: mouseX,
                y: mouseY
            }
        }
    
    // Will run when the screen is loaded
        window.onload = function () {
            var framesPerSecond = 60;
            setInterval(function () {moveEverything(); drawEverything();}, 1000 / framesPerSecond); // Run this two functions every 1000/framesPerSecond miliseconds
        }
    
    // Communicate mouse position to the player paddle
        canvas.addEventListener('mousemove',
            function (evt) {
                var mousePos = calculateMousePos(evt);
                playerPaddleY = mousePos.y - (PADDLE_HEIGHT / 2);
            });
    
    // Reset the ball when a point is scored
        function ballReset() {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
                ballSpeedX = -ballSpeedX;
                ballSpeedY = 4;
        }
    
    //  Calculate computer paddle movement
        function computerMovement() {
            var computerPaddleCenter = computerPaddleY + (PADDLE_HEIGHT / 2)
            if (computerPaddleCenter < ballY - 35) {
                computerPaddleY = computerPaddleY + COMPUTER_PADDLE_SPEED;
            } else if (computerPaddleCenter > ballY + 35) {
                computerPaddleY = computerPaddleY - COMPUTER_PADDLE_SPEED;
            }
        }
    
    /* Move ball and computer paddle. Makes sure the ball is always inside the boundaries 
    and bounces of the top and bottom walls. Verify if the paddle is in the right position 
    to bounce the ball or if a point is scored */
        function moveEverything() {
            computerMovement();
    
            ballX = ballX + ballSpeedX;
            ballY = ballY + ballSpeedY;
    
            if (ballX >= canvas.width - BALL_WIDTH) {
                if (ballY > computerPaddleY && ballY < computerPaddleY + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
    
                    var angleVariation = ballY - (computerPaddleY + PADDLE_HEIGHT / 2);
                    ballSpeedY = angleVariation * 0.35;
                } else {
                    playerScore++;
                    ballReset();
    
                }
            } else if (ballX <= 0 + BALL_WIDTH) {
                if (ballY > playerPaddleY && ballY < playerPaddleY + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
    
                    var angleVariation = ballY - (playerPaddleY + PADDLE_HEIGHT / 2);
                    ballSpeedY = angleVariation * 0.35;
                } else {
                    computerScore++;
                    ballReset();
                }
            }
            if (ballY >= canvas.height - BALL_WIDTH) {
                ballSpeedY = -ballSpeedY;
            } else if (ballY <= 0 + BALL_WIDTH) {
                ballSpeedY = -ballSpeedY;
            }
        }
    
    // Draw all elements
        function drawEverything() {
    
            //Background
            colorRect(0, 0, canvas.width, canvas.height, 'black');
            //Ball
            colorCircle(ballX, ballY, BALL_WIDTH, 'white');
            //Player Paddle
            colorRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
            //Computer Paddle
            colorRect(canvas.width - PADDLE_WIDTH, computerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT), 'white';
            //Score
            canvasContext.fillText(playerScore, 100, 100);
            canvasContext.fillText(computerScore, canvas.width - 100, 100);
        }
    
    // Generic function to draw a rectangle
        function colorRect(leftX, topY, width, height, drawColor) {
            canvasContext.fillStyle = drawColor;
            canvasContext.fillRect(leftX, topY, width, height);
        }
    
    // Generic function to draw a circle
        function colorCircle(centerX, centerY, radius, color) {
            canvasContext.fillStyle = color;
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            canvasContext.fill();
        }
    
    

    
