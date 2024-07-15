class Media {
    constructor(image, x, y, title, description, color, titleColor) {
        this.image = image;
        this.w = 180
        this.h = 25
        this.title = title;
        this.description = description;
        this.color = color;
        this.titleColor = titleColor;

        this.isClickable = true;
        this.isClicked = false;
        let options = {restitution: 0.5};
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);

        Composite.add(engine.world, this.body);

        this.body.plugin.object = this;
    }

    show() {
        let pos = this.body.position;
        const a = this.body.angle;

        push();
        
        angleMode(RADIANS);

        translate(pos.x, pos.y);
        rotate(a);
        fill(this.color);
        stroke(0);
        strokeWeight(1);
        rectMode(CENTER);   
        rect(0, 0, this.w, this.h);
        textAlign(CENTER)
        stroke(this.titleColor)
        strokeWeight(0.5);
        fill(this.titleColor)
        text(this.title, 0, 0);
        pop();
    }

    showBig(globalClicked, font) {
        if (this.isClicked && globalClicked) {
            push();
            imageMode(CENTER);
            image(this.image, windowWidth/2, windowHeight/2, this.image.width/2, this.image.height/2);
            textFont(font);
            textSize(75);
            fill("#61282A");
            noStroke();
            strokeWeight(2);
            textAlign(CENTER);
            text(this.title, width/2, 100);
            textSize(50);
            text(this.description, width/2, height - 100)
            pop();
        } else if (globalClicked == false) {
            this.isClicked = false;
        }
    }
}