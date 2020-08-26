let scl;
let noiseInc = 0.001;
let cols, rows;
let noiseFactor = 0.25;
let xoff = 0;
let yoff = 10;
let zoff = 30;
let partikkelit = [];
let flowfield = [];
let anglescale;
let alpha = 30;
let timer = 0;
let vw, vh;
let ajastin = 60*60/6;
let magni;
let startangle;
let red = 255;
let green = 255;
let blue = 255;
let slowdown = 1;
let koko = 1;

function setup() {
  vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  createCanvas(vw, vh);
  pixelDensity(1);
  background(0);
  magni = map(noise(random(1000)), 0, 1, 0.05, 0.35);
  anglescale = map(noise(random(1000)), 0, 1, 1, 3);
  noiseInc = map(noise(random(1000)), 0, 1, 0, 0.003);
  startangle = random(0, TWO_PI);
  scl = floor(map(noise(random(1000)), 0, 1, 10, 30));
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (i = 0; i < 500; i++) {
    partikkelit[i] = new Partikkeli();
  }
}

function draw() {
  for (y = 0; y < rows; y++) {
    for (x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = startangle + noise(xoff + x * noiseFactor, yoff + y * noiseFactor, zoff) * TWO_PI * anglescale;
      let v = p5.Vector.fromAngle(angle);
      flowfield[index] = v;
      v.setMag(magni);
    }
  }
  xoff += noiseInc / 2;
  yoff += noiseInc / 3;
  zoff += noiseInc;

  for (i = 0; i < partikkelit.length; i++) {
    partikkelit[i].reunat();
    partikkelit[i].seuraa(flowfield);
    partikkelit[i].update();
    partikkelit[i].show();
  }

  timer++;

  if (floor(((ajastin)-timer)/60) < 7) {
    green = 0;
    blue = 0;
  }

  if (floor(((ajastin)-timer)/60) < 4) {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(min(vh, vw) / 2);
    slowdown = 0.7;
    //text(3, vw/4, vh/2);
  }
  if (floor(((ajastin)-timer)/60) < 3) {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(min(vh, vw) / 2);
    slowdown = 0;
    koko = 2;
    //text(2, vw/2, vh/2);
  }
  if (floor(((ajastin)-timer)/60) < 2) {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(min(vh, vw) / 2);
    //slowdown = 0;
    //text(1, vw/4*3, vh/2);
  }
  if (floor(((ajastin)-timer)/60) < 2) {
    textAlign(CENTER, CENTER);
    fill(255);
    stroke(255);
    textSize(min(vh, vw) / 16);
    text('end.', vw/2, vh/2);
  }
  if (timer > (ajastin)) {
    background(0);
    timer = 0;
    green = 255;
    blue = 255;
    slowdown = 1;
    koko = 1;
    partikkelit = [];
    magni = map(noise(random(1000)), 0, 1, 0.05, 0.35);
    anglescale = map(noise(random(1000)), 0, 1, 1, 3);
    noiseInc = map(noise(random(1000)), 0, 1, 0, 0.003);
    startangle = random(0, TWO_PI);
    scl = floor(map(noise(random(1000)), 0, 1, 10, 30));
    cols = floor(width / scl);
    rows = floor(height / scl);
    flowfield = [];
    flowfield = new Array(cols * rows);
    for (i = 0; i < 500; i++) {
      partikkelit[i] = new Partikkeli();
    }
  }
}
