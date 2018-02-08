var rects = [];
var num = 72;

function setup() {
    var canvas = createCanvas(windowWidth-5, windowHeight-5);

    canvas.parent("dynamicBG");
    for(var i = 0; i < num; i++){
        rects[i] = new particle();
    }

    if (windowWidth < 375)
        num = 144;

}

function draw() {

    clear();
    smooth();

    drawDot();

    for(var i = 0; i < num; i++){
        rects[i].update();
        for (var j = i+1; j < num; j++) {
            if (dist(rects[i].pos.x, rects[i].pos.y, rects[j].pos.x, rects[j].pos.y) < num * 0.8) {
                for (var k = j+1; k < num; k++) {
                    if (dist(rects[j].pos.x, rects[j].pos.y, rects[k].pos.x, rects[k].pos.y) < num * 0.8) {
                        fill(48, 48, 48, 96);
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
    resizeCanvas(windowWidth-10, windowHeight-10);

    for(var i = 0; i < num; i++){
        rects[i] = new particle();
    }

    if (windowWidth < 375)
        num = windowWidth/16;
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

    fill(232, 97, 29, 55);
    rect(windowWidth/2-6-x, windowHeight*7/8-y, 16, 16);

    fill(232, 97, 29, 100);
    rect(windowWidth/2-6+x, windowHeight*7/8+y, 16, 16);

    fill(232, 97, 29, 150);
    rect(windowWidth/2-6+y, windowHeight*7/8-x, 16, 16);

    fill(232, 97, 29, 48);
}

function particle() {
    this.pos = createVector(random(0, windowWidth), random(0, windowHeight));
    
    var direction = createVector(1, 1);
    this.update = function() {

        var speed = createVector(random(0, 0.6), random(0, 0.6));
        var trans = createVector(0, 0);
        trans.x = speed.x * direction.x;
        trans.y = speed.y * direction.y;

        this.pos.add(trans);

        var a = random(50, 120);
        var r = map(a, 50, 120, 4, 2);

        rect(this.pos.x, this.pos.y, r, r);
        fill(232, 97, 29, a);

        if (this.pos.x > windowWidth-10) {
            fill(48, 48, 48, a);
            direction.x = -5;
        }
        if (this.pos.x < 10)
            direction.x = 1;
        if (this.pos.y > windowHeight-10) {
            fill(48, 48, 48, a);
            direction.y = -5;
        }
        if (this.pos.y < 10)
            direction.y = 1;

    }
}