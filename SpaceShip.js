let ship;
let hit = [];

function setup() {
  createCanvas(800, 600);
  ship = new SpaceShip();
  setInterval(function() {
    new Enemy(createVector(random(20, width - 20), 0));
  }, 1000);


}

function tick() {
  ship.tick();
  for (let i = Bullet.bullets.length - 1; i >= 0; i--) {
    Bullet.bullets[i].tick();
  }
  for (let i = Enemy.enemies.length - 1; i >= 0; i--) {
    Enemy.enemies[i].tick();
  }
  for (let i = Enemy.enemies.length - 1; i >= 0; i--) {
    let enemy = Enemy.enemies[i];
    for (let j = Bullet.bullets.length - 1; j >= 0; j--) {
      let bullet = Bullet.bullets[j];
      if (enemy && bullet) {
        let d = dist(enemy.position.x, enemy.position.y, bullet.position.x, bullet.position.y);
        if (d < 50) {
          bullet.kill();
          enemy.takeDamage(25);
        }
      }

    }
  }
}

function draw() {

  background(0);
  noStroke();
  // fill(color(0, 255, 0, 20));
  // for (i = 0; i < enemies.length; i++) {
  //   let e = enemies[i];
  //   circle(e.x, e.y, 200);
  // }

  for (let i = 0; i < Bullet.bullets.length; i++) {
    Bullet.bullets[i].draw();

  }

  for (let i = 0; i < Enemy.enemies.length; i++) {
    Enemy.enemies[i].draw();
  }



  fill(255);
  textAlign(LEFT, TOP);
  let t = "bullets: " + Bullet.bullets.length + " \nenemies: " + Enemy.enemies.length;
  text(t, 20, 20);
  ship.draw();
  tick();
}

function mousePressed() {
  ship.shoot();
}

function keyPressed() {
  if (key == " ") {
    ship.shootInterval = setInterval(() => {
      ship.shoot();
    }, 200);
  }
}

function keyReleased() {
  if (key == " ") {
    clearInterval(ship.shootInterval);
  }
}
class SpaceShip {
  constructor() {
    this.position = createVector(width / 2, height - 100);
    this.size = createVector(30, 40);
    this.velocity = 0;

  }

  tick() {
    if (keyIsPressed) {
      this.velocity = 10;
      let direction = key == "ArrowRight" ? 1 : (key == "ArrowLeft" ? -1 : 0);
      this.position.x += this.velocity * direction;
    }
    this.position.x = constrain(this.position.x, this.size.x, width - this.size.x);
  }

  shoot() {
    new Bullet(this.position.copy());

  }
  draw() {
    fill(255);
    rect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
  }
}
class Bullet {
  constructor(position) {
    this.position = position;
    this.size = createVector(10, 15);
    Bullet.bullets.push(this);
  }
  tick() {
    this.position.y -= 10;
    if (this.position.y < 0) {
      Bullet.bullets.splice(Bullet.bullets.indexOf(this), 1);
    }
  }
  draw() {
    fill(255);
    rect(this.position.x - this.size.x / 2, this.position.y, this.size.x, this.size.y);
  }
  kill() {
    Bullet.bullets.splice(Bullet.bullets.indexOf(this), 1);
  }
}
Bullet.bullets = [];
class Enemy {
  constructor(position) {
    this.position = position;
    this.size = createVector(15, 20);
    this.health = 100;
    Enemy.enemies.push(this);
  }
  tick() { 
    this.position.y += 2;
    if (this.position.y > height) {
      Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
    }
  }
  takeDamage(damage) {
    this.health -= damage;
    this.drawHit();
    if (this.health <= 0) {
      Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
    }
  }
  draw() {
    fill('cyan');
    triangle(this.position.x - this.size.x, this.position.y - this.size.y, this.position.x + this.size.x, this.position.y - this.size.y, this.position.x, this.position.y + this.size.y);
    fill('green');
    rect(this.position.x - 30, this.position.y - 20, this.size.x - 10, this.health * 0.5);
  }
  drawHit() {
  fill('white');
  triangle(this.position.x - this.size.x, this.position.y - this.size.y, this.position.x + this.size.x, this.position.y - this.size.y, this.position.x, this.position.y + this.size.y);
  }
  kill() {
    Enemy.enemies.splice(Enemy.enemies.indexOf(this), 1);
  }
}
Enemy.enemies = [];
