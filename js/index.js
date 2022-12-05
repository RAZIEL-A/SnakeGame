//Constants and Variables

let inputDir = { x: 0, y: 0 };
const eatSound = new Audio("sounds/eat.mp3");
const turnSound = new Audio("sounds/turn.mp3");
const gameOverSound = new Audio("sounds/game_over.mp3");
const bgSound = new Audio("sounds/bgsound.mp3");
const board = document.querySelector(".board");
const scoretag = document.querySelector("#score");
const hiscoretag = document.querySelector("#hiscoretag");
let speed = 7;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 13, y: 12 };
let score = 0;

//Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
    gameEngine();
  }
}

// Main logic

function isCollide(snake) {
  //if snake eat itself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if collided with wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    console.log("Collided with wall");
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array
  bgSound.play();
  // if collided
  if (isCollide(snakeArray)) {
    bgSound.pause();
    gameOverSound.play();

    //setting highscore and resetting score;
    if (score > hiscore) {
      localStorage.setItem("hiscore", JSON.stringify(score));
    }
    scoretag.innerHTML = "Score : 0";
    hiscoretag.innerHTML = `High Score : ${localStorage.getItem("hiscore")}`;

    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    bgSound.play();
    snakeArray = [{ x: 13, y: 15 }];
    score = 0;
  }
  // if food eaten regenrate food and increment score;
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    eatSound.play();
    score += 1;
    scoretag.innerHTML = `Score : ${score}`;
    snakeArray.unshift({
      x: snakeArray[0].x + inputDir.x,
      y: snakeArray[0].y + inputDir.y,
    });
    food = {
      x: Math.floor(Math.random() * 16 + 2),
      y: Math.floor(Math.random() * 16 + 2),
    };
  }

  //Move the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDir.x;
  snakeArray[0].y += inputDir.y;

  // Part 2: render/display snake and food
  //Display snake
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      e;
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  //Display Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoretag.innerHTML = `High Score : ${hiscore}`;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // inputDir = { x: 0, y: 1 }; // start the game
  turnSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "w":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "a":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "s":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "d":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});
