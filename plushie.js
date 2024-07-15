class ShelfObject {
    constructor(image, x, y, title, description, vertices, isPlushie) {
        this.w = image.width/6;
        this.h = image.height/6;
        this.image = image;
        this.title = title;
        this.description = description;
        this.vertices = vertices;
        this.isPlushie = isPlushie

        this.isClickable = true;
        this.isClicked = false;
        let options = { restitution: 0.5 };
        this.body = Bodies.fromVertices(x, y, vertices, options);
        
        if (this.isPlushie){
            Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
        }

        Composite.add(engine.world, this.body);

        this.body.plugin.object = this;
    }

    show() {
        let pos = this.body.position;
        const a = this.body.angle;
        push();
        imageMode(CENTER);
        angleMode(RADIANS)

        translate(pos.x, pos.y);
        rotate(a);
        image(this.image, 0, 0, this.w, this.h);
        
        pop();
    }

    showBody() {
        push()
        stroke(0);
        strokeWeight(2);
        noFill();
        beginShape();
            for (let v of this.body.vertices) {
              vertex(v.x, v.y);
            }
        endShape(CLOSE);
        pop()

    }

    showBig(globalClicked, font) {
        if (this.isClicked && globalClicked) {
            push();
            imageMode(CENTER);
            image(this.image, windowWidth/2, windowHeight/2, this.w*2.5, this.h*2.5);
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