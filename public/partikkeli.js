function Partikkeli() {
  this.pos = createVector(random(width),random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0,0);
  this.maxspeed = 2;
  this.maxacc = 2;

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(255, alpha);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }

  this.seuraa = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.reunat = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }
}
