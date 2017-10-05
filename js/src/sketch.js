var weight = 0;
var counter = 0;
var rec = [];
var frame = 0;
var seed = [1, 2, 0];
var def = 0;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    weight = windowWidth/1024 * 10;
    drawBasic();

    def = floor(windowWidth * windowHeight / 24000);
    for (var i = 0; i < def; i++) {
        var x = random(0, windowWidth);
        var y = random(0, windowHeight);
        var kind = random(seed);
        var color = random(seed);

        append(rec, new record(x, y, kind, color));

    }
    //print(rec);

}

function draw() {
    clear();
    drawBasic();


    blendMode(MULTIPLY);

    noFill();
    strokeWeight(weight);

    var x = 0;
    if (mouseX-windowWidth/4 < 0)
        x = map(mouseX, 0, windowWidth/4, 0, -10);
    else if (mouseX-windowWidth*3/4 < 0)
        x = map(mouseX, windowWidth/4, windowWidth*3/4, -10, 10);
    else
        x = map(mouseX, windowWidth*3/4, windowWidth, 10, 0);

    var y = 0;
    if (mouseY-windowHeight/4 < 0)
        y = map(mouseY, 0, windowHeight/4, 0, -10);
    else if (mouseY-windowHeight*3/4 < 0)
        y = map(mouseY, windowHeight/4, windowHeight*3/4, -10, 10);
    else
        y = map(mouseY, windowHeight*3/4, windowHeight, 10, 0);


    //var y = map(mouseY-windowHeight/2, -windowWidth/2, windowWidth/2, -10, 10);

    stroke(76, 255, 255);
    ellipse(windowWidth*3/8-x, windowHeight*7/16-y, windowWidth*3/16);

    stroke(255, 98, 255);
    ellipse(windowWidth*3/8+x, windowHeight*7/16+y, windowWidth*3/16);

    stroke(255, 255, 216);
    ellipse(windowWidth*3/8+y, windowHeight*7/16-x, windowWidth*3/16);

    noStroke();
    fill(76, 98, 216);
    ellipse(windowWidth*5/8+x*2, windowHeight*7/16+y*2, windowWidth*5/32);

    fill(239, 150, 188);
    noStroke();
    counter = 0;
    for (var i = windowWidth*3/4; i < windowWidth; i += 16) {
        for (var j = 0; j < windowHeight/4; j += 16) {
            var factor = Math.PI * 2 * (millis() * 0.0005 + (12.5* (counter/500)));
            var r = (sin(factor) + 1) / 2;
            var r = map(r, 0, 1, 3, 6);
            ellipse(i, j, r);
            counter++;

            // var factor = 50*sin(millis() * 0.000005 * (counter%20)) + 50;
            // var r = map(factor,0,100,2,5);
            // ellipse(i, j, r);
            // counter++;
        }
    }

    blendMode(BLEND);
    var factor = (windowHeight+windowWidth)%20;
    for (var k = windowWidth/32+10; k < windowWidth/32+81+weight*15; k++) {
        ellipse(k, 5*sin(k/5-millis() * 0.005) + windowHeight-150,(weight-1)/2);
        ellipse(k, 5*sin(k/5-millis() * 0.005) + windowHeight-136,(weight-1)/2);
    }

    drawRandom();
    frame++;

    if (frame > 15)
        frame = 0;


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    weight = windowWidth/1024 * 10;
    
    def = floor(windowWidth * windowHeight / 24000);
    for (var i = 0; i < def; i++) {
        rec[i].x = random(0, windowWidth);
        rec[i].y = random(0, windowHeight);
        rec[i].kind = random(seed);
        rec[i].color = random(seed);
    }
    for (var i = def; i < rec[i]; i++) {
        rec.pop();
    }


}

function drawBasic() {
    noFill();
    stroke(76, 98, 216);


    push();
    translate(0, -windowWidth/24);
    arc(windowWidth*3/8, windowHeight*7/16, windowWidth/8, windowWidth/8,radians(45), radians(135));
    pop();


    //strokeWeight(weight/2);
    ellipse(windowWidth*5/8, windowHeight*7/16, windowWidth*3/16);

    push();
    blendMode(BLEND);
    noStroke();
    fill(76, 98, 216);
    translate(windowWidth*3/8, -windowWidth/24+windowHeight*7/16);
    //translate(0, -windowWidth/16);
    rotate(radians(40));
    for (var i = 0; i < 5; i++) {

        var rotation = 16;
        rotate(radians(rotation));
        rect(windowWidth/16, 0, 2*weight, weight, 100);
        //rotation += 45;
    }
    pop();

    noStroke();
    
    blendMode(BLEND);
    fill(239, 150, 188);
    //triangle(windowWidth/8,0, windowWidth, 0, windowWidth,windowHeight/3);
    triangle(0,0, 0, windowHeight/2, windowWidth/3,0);

    fill(76, 98, 216);
    push();
    rotate(60);
    rect(-(windowWidth+windowHeight)/8, -(windowWidth+windowHeight)/8, (windowWidth+windowHeight)/2, (windowWidth+windowHeight)/2);
    pop();

    

    var len = weight * 2 + 4;
    triangle(windowWidth*31/32-len,windowHeight-120, windowWidth*31/32, windowHeight-120, windowWidth*31/32-len/2,windowHeight-120+len);
    triangle(windowWidth*31/32-len,windowHeight-120+len, windowWidth*31/32, windowHeight-120+len, windowWidth*31/32-len/2,windowHeight-120+len*2);
    triangle(windowWidth*31/32-len,windowHeight-120+len*2, windowWidth*31/32, windowHeight-120+len*2, windowWidth*31/32-len/2,windowHeight-120+len*3);

    textSize(weight+8);
    textAlign(LEFT);
    text("陈漪凡", windowWidth/32+10, windowHeight-96);
    textSize(weight+6);
    text("中山大学 交互设计专业 研一", windowWidth/32+10, windowHeight-96+weight+15);
    text("yvonnec7@163.com", windowWidth/32+10, windowHeight-96+weight+weight+24);
    
}


function drawRandom() {
    for (var i = 0; i < rec.length; i++) {
        switch(rec[i].kind) {
            case 0:
                noStroke();
                if (rec[i].color === 0)
                    fill(76, 255, 255);
                else if (rec[i].color === 1)
                    fill(255, 98, 255);
                else
                    fill(255, 255, 84);

                rectMode(CENTER);

                rect(rec[i].x, rec[i].y, (150-frame)/10, (150-frame)/10);
                rectMode(CORNER);
                break;
            case 1:
                noStroke();
                if (rec[i].color === 0)
                    fill(76, 255, 255);
                else if (rec[i].color === 1)
                    fill(255, 98, 255);
                else
                    fill(255, 255, 84);

                push();
                rectMode(CENTER);
                translate(rec[i].x, rec[i].y);
                rotate(radians(frame*6));
                rect(0, 0, 20, 20 * 0.2);
                rect(0, 0, 20 * 0.2, 20);
                pop();

                break;
            case 2:
                noFill();
                strokeWeight((weight-1)/2);
                if (rec[i].color === 0)
                    stroke(255, 255, 84);
                else if (rec[i].color === 1)
                    stroke(76, 255, 255);
                else
                    stroke(255, 98, 255);

                ellipse(rec[i].x, rec[i].y, 24, 24);

                noStroke();
                if (rec[i].color === 0)
                    fill(76, 255, 255);
                else if (rec[i].color === 1)
                    fill(255, 98, 255);
                else
                    fill(255, 255, 84);


                var angle = frame*0.001-millis() * 0.005;
                ellipse(rec[i].x + 12 * cos(angle), rec[i].y + 12 * sin(angle), 6, 6);

                strokeWeight(weight);

                break;
        }
    }

}

function mousePressed() {

    var kind = random(seed);
    var color = random(seed);

    append(rec, new record(mouseX, mouseY, kind, color));
}

function record(x, y, kind, color) {
    this.x = x;
    this.y = y;
    this.kind = kind;
    this.color = color;
}

