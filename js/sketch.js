var rects = [];
var num = 48;
var width = 60;



function setup() {

    width = select("#dynamicBG").width;
    if (width <= 60) {
        width = 768;
        num = 0.12 * width;
    } else {
        width -= 10;
        num = 0.16 * width;
        // console.log(num);
    }
        

    var canvas = createCanvas(width, windowHeight);
    canvas.parent("dynamicBG");
    
    

    for(var i = 0; i < num; i++){
        rects[i] = new particle();
    }

}

function draw() {

    clear();
    smooth();

    drawDot();

    for(var i = 0; i < num; i++){
        rects[i].update();
        for (var j = i+1; j < num; j++) {
            if (dist(rects[i].pos.x, rects[i].pos.y, rects[j].pos.x, rects[j].pos.y) < num * 0.6) {
                for (var k = j+1; k < num; k++) {
                    if (dist(rects[j].pos.x, rects[j].pos.y, rects[k].pos.x, rects[k].pos.y) < num * 0.6) {
                        fill(48, 48, 48, 10);
                        beginShape(TRIANGLES);
                        vertex(rects[i].pos.x, rects[i].pos.y);
                        vertex(rects[j].pos.x, rects[j].pos.y);
                        vertex(rects[k].pos.x, rects[k].pos.y);
                        endShape();

                    }
                }
            }
        }
    }

    
}

function windowResized() {
    width = select("#dynamicBG").width;
    if (width <= 60) {
        width = 768;
        num = 0.12 * width;
    } else {
        width -= 10;
        num = 0.16 * width;
        // console.log(num);
    }

    resizeCanvas(width-5, windowHeight-5);
    
    
    for(var i = 0; i < num; i++){
        rects[i] = new particle();
    }
}

function drawDot() {
    blendMode(MULTIPLY);

    var x = 0;
    if (mouseX-windowWidth/4 < 0)
        x = map(mouseX, 0, windowWidth/4, 0, -8);
    else if (mouseX-windowWidth*3/4 < 0)
        x = map(mouseX, windowWidth/4, windowWidth*3/4, -8, 8);
    else
        x = map(mouseX, windowWidth*3/4, windowWidth, 8, 0);

    var y = 0;
    if (mouseY-windowHeight/4 < 0)
        y = map(mouseY, 0, windowHeight/4, 0, -8);
    else if (mouseY-windowHeight*3/4 < 0)
        y = map(mouseY, windowHeight/4, windowHeight*3/4, -8, 8);
    else
        y = map(mouseY, windowHeight*3/4, windowHeight, 8, 0);


    rectMode(CENTER);
    noStroke();
    
}

function particle() {
    this.pos = createVector(random(0, width), random(0, windowHeight));
    
    var direction = createVector(1, 1);
    this.update = function() {

        var speed = createVector(random(0, 0.6), random(0, 0.6));
        var trans = createVector(0, 0);
        trans.x = speed.x * direction.x;
        trans.y = speed.y * direction.y;

        this.pos.add(trans);

        var a = random(50, 80);
        var r = map(a, 50, 80, 3, 1);

        rect(this.pos.x, this.pos.y, r, r);
        fill(232, 97, 29, a);

        if (this.pos.x > width-3) {
            fill(48, 48, 48, a);
            direction.x = -5;
        }
        if (this.pos.x < 3)
            direction.x = 1;
        if (this.pos.y > windowHeight-3) {
            fill(48, 48, 48, a);
            direction.y = -5;
        }
        if (this.pos.y < 3)
            direction.y = 1;

    }
}