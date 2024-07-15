class Boundary {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      let options = { isStatic: true };
      this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
      Composite.add(engine.world, this.body);

      this.isClickable = false;

      this.body.plugin.object = this;
    }
    
    show() {
      push();
      rectMode(CENTER);
      fill("#CF9176");
      stroke(0);
      strokeWeight(2);    
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }