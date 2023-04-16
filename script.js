// Game constants
const CANVAS_BORDER_COLOR = "white";
const CANVAS_BACKGROUND_COLOR = "black";
const SNAKE_COLOR = "white";
const FOOD_COLOR = "red";
const SNAKE_SIZE = 10;
const FOOD_SIZE = 10;
const GAME_SPEED = 100;

// Game variables
let snake = [{ x: 150, y: 150 }];
let food = { x: 0, y: 0 };
let dx = SNAKE_SIZE;
let dy = 0;

// Get canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Main game loop
function gameLoop() {
  // Clear canvas
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Update snake position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  // Check collision with walls or self
  if (isCollision()) {
    gameOver();
    return;
  }

  // Draw food
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);

  // Draw snake
  ctx.fillStyle = SNAKE_COLOR;
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
  });

  // Loop game
  setTimeout(gameLoop, GAME_SPEED);
}

// Start game loop
gameLoop();

// Event listener for arrow key presses
document.addEventListener("keydown", changeDirection);

// Change snake direction
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY && dx !== SNAKE_SIZE) {
    dx = -SNAKE_SIZE;
    dy = 0;
  }

  if (keyPressed === UP_KEY && dy !== SNAKE_SIZE) {
    dy = -SNAKE_SIZE;
    dx = 0;
  }

  if (keyPressed === RIGHT_KEY && dx !== -SNAKE_SIZE) {
    dx = SNAKE_SIZE;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && dy !== -SNAKE_SIZE) {
    dy = SNAKE_SIZE;
    dx = 0;
  }
}

// Generate random food position
function generateFood() {
  const FOOD_MIN = 0;
  const FOOD_MAX = (canvas.width / SNAKE_SIZE) * SNAKE_SIZE;
  const foodX =
    Math.floor(Math.random() * (FOOD_MAX - FOOD_MIN + 1) + FOOD_MIN) +
    SNAKE_SIZE;
  const foodY =
    Math.floor(Math.random() * (FOOD_MAX - FOOD_MIN + 1) + FOOD_MIN) +
    SNAKE_SIZE;
  return { x: foodX, y: foodY };
}

// Check collision with walls or self
function isCollision() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true; // collision with self
    }
  }
  const hitLeftWall = head.x < 0;
  const hitRightWall = head.x >= canvas.width;
  const hitTopWall = head.y < 0;
  const hitBottomWall = head.y >= canvas.height;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Game over
function gameOver() {
  alert("Game over! Press OK to restart.");
  snake = [{ x: 150, y: 150 }];
  food = generateFood();
  dx = SNAKE_SIZE;
  dy = 0;
  gameLoop(); // Restart the game loop
}
