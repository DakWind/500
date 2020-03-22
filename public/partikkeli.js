function Partikkeli() {
  this.pos = createVector(random(width),random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0,0);
  this.maxspeed = 2;
  this.maxacc = 2;

  this.update = function() {
    //this.acc.limit(this.maxacc);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.varomuita = function() {
    let perception = scl;
    let vaista = createVector();
    let total = 0;
    for (let other of partikkelit) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d < perception && other != this) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(d);
        vaista.add(diff);
        total++;
      }
      if (total > 0) {
        vaista.div(total);
        vaista.sub(this.vel);
      }
    }
    vaista.setMag(1);
    this.applyForce(vaista);
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
