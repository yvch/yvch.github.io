var dots = [];
var num = 2500;
var R = 80;
var center = [0, 0];


function setup() {

    var width = select("#dynamicBG").width;
    var canvas = createCanvas(width, windowHeight);
    canvas.parent("dynamicBG");
    
    var min = width < windowHeight ? width : windowHeight;
    R = min*1.414;
    center = [width/2, height/2];
    num = width*0.1;

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
    R = min;
    center = [width/2, windowHeight/2];
    num = width*0.1;

    for(var i = 0; i < num; i++){
        dots[i] = new particle();
    }


}

function particle() {
    this.angle = random(-45.0, 45.0);
    this.radius = random(0, R);
    this.alpha = map(this.radius, 0, R, 0.5, 0.3);
    this.pos = createVector(center[0]+this.radius*cos(this.angle), center[1]+this.radius*sin(this.angle));
    var counter = 0.0;

    this.update = function() {


        let theta = noise(this.radius * 0.04, this.angle * 0.04, counter);
        this.radius += 5.0 * cos(theta/10*TWO_PI);
        if (this.radius > R) {
            this.radius = cos(theta*TWO_PI);
        }

        this.angle += 0.01;
        this.pos.x = center[0]+this.radius*cos(this.angle);
        this.pos.y = center[1]+this.radius*sin(this.angle);

        counter += 8;

        colorMode(HSB, 360, 100, 100, 1);
        
        var s = abs(this.pos.x-mouseX) + abs(this.pos.y - mouseY);
        var hue = map(s, 0, 2*R, 20, 24);
        fill(hue, 120, 84, this.alpha);

        noStroke();
        var dist = sqrt((this.pos.x-mouseX) * (this.pos.x-mouseX) + (this.pos.y - mouseY) * (this.pos.y - mouseY));
        s = map(dist, 0, 2*R, 5, 10);
        ellipse(this.pos.x, this.pos.y, s, s);


    }
}