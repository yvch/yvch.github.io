var dots = [];
var num = 10;
var R = 80;
var center = [0, 0];


function setup() {

    var width = select("#dynamicBG").width;
    var canvas = createCanvas(width, windowHeight);
    canvas.parent("dynamicBG");
    
    var min = width < windowHeight ? width : windowHeight;
    R = min*1.414;
    center = [width/2, height/2];
    num = width*0.005;

    for(var i = 0; i < num; i++){
        dots[i] = new particle();
    }
}

function draw() {
    clear();
    smooth();
    frameRate(12);

    for(var i = 0; i < num; i++){
        dots[i].update();
    }

}

function windowResized() {
    var width = select("#dynamicBG").width;
    var canvas = createCanvas(width, windowHeight);
    canvas.parent("dynamicBG");
    
    var min = width < windowHeight ? width : windowHeight;
    R = min*1.414;
    center = [width/2, height/2];
    num = width*0.005;

    for(var i = 0; i < num; i++){
        dots[i] = new particle();
    }

}

function particle() {
    this.angle = random(-45.0, 45.0);
    this.radius = random(0, R);
    this.alpha = map(this.radius, 0, R, 0.8, 0.5);
    this.pos = createVector(center[0]+this.radius*cos(this.angle), center[1]+this.radius*sin(this.angle));
    this.size = random(40, width/8);
    this.color = random(200, 240);
    var counter = 0.0;

    this.update = function() {


        let theta = noise(this.radius * 0.04, this.angle * 0.04, counter);
        this.radius += 2.0 * cos(theta/10*TWO_PI);
        if (this.radius > R*2/3) {
            this.radius = cos(theta*TWO_PI);
            this.size = random(40, width/8);
            this.color = random(200, 240);
        }

        this.angle += 0.01;
        this.pos.x = center[0]+this.radius*cos(this.angle);
        this.pos.y = center[1]+this.radius*sin(this.angle);

        counter += this.radius/5000;

        // 颜色
        colorMode(HSB, 360, 100, 100, 1);
        
        // var s = abs(this.pos.x-mouseX) + abs(this.pos.y - mouseY);
        // var hue = map(s, 0, 2*R, 20, 24);
        this.color = (sin(counter)+1)*40+180;
        fill(this.color, 96, 84, this.alpha);
        noStroke();

        // 不规则形状
        blob(this.pos.x, this.pos.y, this.size, this.angle+this.radius*0.1);
        blob(center[0]+mouseX/50, center[1]+mouseY/50, this.size, this.angle+this.radius*0.2);

        // var dist = sqrt((this.pos.x-mouseX) * (this.pos.x-mouseX) + (this.pos.y - mouseY) * (this.pos.y - mouseY));
        // s = map(dist, 0, 2*R, 150, 310);
        // ellipse(this.pos.x, this.pos.y, s, s);
        


    }
}


function blob(xCenter, yCenter, radius, angle) {
    beginShape();
    var angleStep = 360 / 8;
    for (var theta = 0; theta <= 360; theta += angleStep) {
      var noiseness = noise(radius * 0.04, angle * 0.04, theta);
      let r = radius * cos(noiseness*TWO_PI);
      let x = xCenter + r * cos(theta);
      let y = yCenter + r * sin(theta);
      curveVertex(x, y);
    }
    endShape();
  }