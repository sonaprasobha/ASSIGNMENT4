/*
  Name: Sona Bijumon Prasobha
  File: bouncingball.javascript.js
  Date: 30-03-2025
  Description: Ball Collision Game with EvilCircle and Counter
*/

// Canvas Setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Random number and color functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomRGB() {
  return "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")";
}

// Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class inherits Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (!this.exists) return;
    if (this.x + this.size >= width || this.x - this.size <= 0) this.velX = -this.velX;
    if (this.y + this.size >= height || this.y - this.size <= 0) this.velY = -this.velY;
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const other of balls) {
      if (this !== other && other.exists) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.size + other.size) {
          this.color = other.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class inherits Shape
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.size = 15;
    this.color = 'white';

    window.addEventListener('keydown', (e) => {
      if (e.key === 'a') this.x -= this.velX;
      if (e.key === 'd') this.x += this.velX;
      if (e.key === 'w') this.y -= this.velY;
      if (e.key === 's') this.y += this.velY;
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x - this.size < 0) this.x = this.size;
    if (this.x + this.size > width) this.x = width - this.size;
    if (this.y - this.size < 0) this.y = this.size;
    if (this.y + this.size > height) this.y = height - this.size;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = "Ball count: " + count;
        }
      }
    }
  }
}

// Ball setup
const balls = [];
let count = 0;
const para = document.querySelector("p");

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
}
para.textContent = "Ball count: " + count;

// EvilCircle object
const evil = new EvilCircle(random(0, width), random(0, height));

// Main loop
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();

  requestAnimationFrame(loop);
}
loop();
