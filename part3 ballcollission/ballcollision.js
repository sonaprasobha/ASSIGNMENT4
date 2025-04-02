/*
  Name: Sona Bijumon Prasobha
  File: ballcollision.js
  Date: 28-03-2025
  Description: Ball Collision Animation using Canvas
*/

// setupping the canvas 
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// adding Random numbers and color functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor() {
  return "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
}

// construction of balls
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 4. Ball draw method
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
};

// updating the balls
Ball.prototype.update = function () {
  if (this.x + this.size > width || this.x - this.size < 0) {
    this.velX = -this.velX;
  }
  if (this.y + this.size > height || this.y - this.size < 0) {
    this.velY = -this.velY;
  }
  this.x += this.velX;
  this.y += this.velY;
};

// Ball collision detection method
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    const other = balls[j];
    if (this !== other) {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + other.size) {
        this.color = other.color = randomColor();
      }
    }
  }
};

//Create 25 balls
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomColor(),
    size
  );
  balls.push(ball);
}

// Animation loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();

