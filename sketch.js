
let background, font;
let avocadoImg, miffyImg, bearyImg, duckImg, cactus1Img, cactus2Img, byunnyGImg, byunnyPImg, milkyImg, miffy2Img, miffy3Img, melonImg;
let pensImg, pencilcaseImg, paintBImg,  paintOImg, paintGImg, booksImg, moviesImg;
let avocado, miffy, beary, duck, cactus1, cactus2, byunnyG, byunnyP, miffy2, miffy3, milky, melon;
let pens, pencilcase, paintB, paintO, paintG, books, movies;
//let flamingo, saySo, songOfStorms, lagtrain, beneath, pursuing;
let chill, deep, hipHop, sloth, study;
let songs = [];
let shelfObjects = [];
let boundaries = [];
const { Engine, World, Bodies, Mouse, MouseConstraint, Composite, Body, Vector, Render, Events }  = Matter;
let engine, world, mConstraint;
let globalClicked = false;
let isPlaying = false;
let showBodies = false;
let songPlaying, fft;
let wolfsongImg, sealoverImg, hgtImg, lovelessImg, enemiesImg, clickbaitImg, meImg;
let abigailImg, legionImg, lifeImg, startrekImg, upgradeImg;
let abigail, legion, life, startrek, upgrade;
let wolfsong, sealover, hgt, loveless, enemies, clickbait;
let medias = [];
let w, h;
let onStartScreen = true;



function preload() {
    importJson();
    importImages();
    importMusic();
    font = loadFont("assets/Cactuss.otf");
}

function setup() {
    w = window.innerWidth;
    h = window.innerHeight;

    if (w > 1920) {
        w = 1920;
    }
    if (h > 953) {
        h = 953
    }
    var canvas = createCanvas(w, h);
    engine = Engine.create();
    world = engine.world;

    setupShelf();
    setupObjects();
    setupMedia();

    const mouse = Mouse.create(canvas.elt);
    const options = {
      mouse: mouse
    };

    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
    Events.on(mConstraint, "mousedown", handleClick)

    button = createImg("assets/images/speaker.png")
    button.position(w - 60, 10);
    button.size(35, 35)
    button.mousePressed(handleSong)

    fft = new p5.FFT();
}

function startScreen() {
    push()
    makeTransparentBackdrop();
    textFont(font);
    textSize(75);
    fill("#61282A");
    noStroke();
    strokeWeight(2);
    textAlign(CENTER);
    text("Welcome to my Desk!", width/2, 100);
    textSize(50);
    text("I filled this desk with items that mean something to me.", width/2, 300);
    text("You can click on and drag a bunch of items on the shelf to the left.", width/2, 400);
    text("You can also turn on some music by clicking the icon in the upper right corner of the screen.", width/2, 500);
    text("If you have any feedback or encounter any bugs, feel free to message me, I'm @iLiibra on instagram :)", width/2, 600);

    textSize(75);
    text("Click anywhere on the screen to continue!", width/2, height - 100);
    pop()
}

function handleSong() {

    if (isPlaying == false) {
        isPlaying = true;
        songPlaying = random(songs);
        songPlaying.setVolume(0.5);
        songPlaying.loop();
    } else {
        songPlaying.stop();
        isPlaying = false;
    }
}

function draw() {
  
    image(background, 0, 0, w, h);
    Engine.update(engine);


    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    for (media of medias) {
        media.show();
    }

    for (let plush of shelfObjects) {
        plush.show();
        if (showBodies) {
            plush.showBody();
        }
    }

    image(meImg, w/2 + 200, h - meImg.height);

    vizualizeMusic();

    if (globalClicked){
        makeTransparentBackdrop();
    }

    for (let plush of shelfObjects) {
        plush.showBig(globalClicked, font);
    }

    for (media of medias) {
        media.showBig(globalClicked, font);
    }

    if(onStartScreen) {
        startScreen();
    }

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);

    redraw();
}
    

function vizualizeMusic() {

    //Colorful Coding, "Code an Audio Visualizer in p5js (from scratch) | Coding Project #17", 
    //unter https://www.youtube.com/watch?v=uk96O7N1Yo0
    push()
    angleMode(DEGREES)
    var wave = fft.waveform();
    noFill();
    stroke(255, 255, 255)
    translate(w/2 + 90, h/2 - 150)

    for (var t = -1; t <= 1; t += 2) {
        beginShape();
        for (let i = 0; i <= 180; i++) {
            let index = floor(map(i, 0, 180, 0, wave.length - 1));

            var r = map(wave[index], -1, 1, 30, 95)

            var x = r * sin(i) * t
            var y = r * cos(i)
            vertex(x, y);
        }
        endShape();
    }
    pop()
}

function handleClick(event) {

    if (onStartScreen) {
        onStartScreen = false;
    }

    if (mConstraint.body != null && globalClicked == false && mConstraint.body.plugin.object.isClickable) {
        let clickedPlushie = mConstraint.body.plugin.object;
        clickedPlushie.isClicked = true;
        globalClicked = true;

    } else if (globalClicked) {
        globalClicked = false;
    }
}

function keyPressed() {
    if (key === 'b' || key === 'B') {
        showBodies = !showBodies;
    }
}

function makeTransparentBackdrop() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, 150);
    rect(w / 2, h / 2, w, h);
    pop();
}

function setupObjects() {

    avocado = new ShelfObject(avocadoImg, 360, 490,
        "A perfectly normal Avocado",
        "I won this at a claw game at a Christmas market.", avocadoJson.vertices, true);
    miffy = new ShelfObject(miffyImg, 360, 490, 
        "A Miffy plush",
        "The biggest in a family of three.", miffyJson.vertices, true
    );
    beary = new ShelfObject(bearyImg, 360, 490, 
        "A little bear companion",
        "Look at him and his little frog bag!", bearyJson.vertices, true
    );
    duck = new ShelfObject(duckImg, 360, 490,
        "A crochet duck",
        "I crocheted this myself!", duckJson.vertices, true
    );

    byunnyG = new ShelfObject(byunnyGImg, 360, 490, " ", " ", byunnyJson.vertices, true);
    byunnyP = new ShelfObject(byunnyPImg, 360, 490, " ", " ", byunnyJson.vertices, true);
    milky = new ShelfObject(milkyImg, 360, 490, " ", " ", milkyJson.vertices, true);
    melon = new ShelfObject(melonImg, 360, 770, " ", " ", melonJson.vertices, true);
    miffy2 = new ShelfObject(miffy2Img, 360, 770, " ", " ", miffy2Json.vertices, true);
    miffy3 = new ShelfObject(miffy3Img, 360, 770, " ", " ", miffy2Json.vertices, true);
    byunnyG.isClickable = false;
    byunnyP.isClickable = false;
    milky.isClickable = false;
    melon.isClickable = false;
    miffy2.isClickable = false;
    miffy3.isClickable = false;

    pens = new ShelfObject(pensImg, 90, 350, " ", " ", pensJson.vertices);
    pens.isClickable = false;
    pencilcase = new ShelfObject(pencilcaseImg, 150, 350, " ", " ", pencilcaseJson.vertices);
    pencilcase.isClickable = false;
    paintB = new ShelfObject(paintBImg, 350, 350, " ", " ", paintJson.vertices);
    paintO = new ShelfObject(paintOImg, 400, 350, " ", " ", paintJson.vertices);
    paintG = new ShelfObject(paintGImg, 400, 350, " ", " ", paintJson.vertices);
    paintB.isClickable = false;
    paintO.isClickable = false;
    paintG.isClickable = false;

    cactus1 = new ShelfObject(cactus1Img, 350, 90, " ", " ", cactus1Json.vertices);
    cactus1.isClickable = false;
    cactus2 = new ShelfObject(cactus2Img, 500, 90, "My green little succulent", "He just kinda kept on growning", cactus2Json.vertices);


    books = new ShelfObject(booksImg, 650, 350, 
        "Some of my favorite books", 
        "I recommend all of these, obviously", booksJson.vertices
    );
    movies = new ShelfObject(moviesImg, 610, 100, 
        "Some of my favorite movies", 
        "Feel free to tell me how bad you think my taste in movies is", moviesJson.vertices
    );

    shelfObjects.push(avocado, miffy, beary, duck, byunnyG, byunnyP, milky, pens, pencilcase, paintB, 
        paintO, paintG, books, movies, cactus1, cactus2, melon, miffy2, miffy3);

}

function setupMedia(){
    wolfsong = new Media(wolfsongImg, 90, 100, "Wolfsong", 
        "This author made me cry and I thanked him for it!", 
        "#1D6967", "white"
    );
    sealover = new Media(sealoverImg, 90, 90, "Sea Lover", 
        "Short, but sweet and with my favorite trope: A language barrier!", 
        "#7FB5BF", "#363D52"
    );
    hgt = new Media(hgtImg, 90, 85, 
        "Home Grown Talent", 
        "I will never forget #PineappleGate", 
        "#9ED9B9", "#CF5398"
    );
    loveless = new Media(lovelessImg, 90, 65, "Loveless", 
        "This book helped me figure out a lot of stuff about myself", 
        "#CE63CD", "black"
    );
    enemies =  new Media(enemiesImg, 145, 55, "Enemies of the State", 
        "Me? Reading a political thriller? It's more likely than you think", 
        "white", "#5F871A"
    );
    clickbait = new Media(clickbaitImg, 350, 120, "Love, Hate & Clickbait", 
        "I guess reading about politics is only fun when they're fictional and there's romance involved", 
        "#ADDAF7", "#BC2749"
    );

    abigail = new Media(abigailImg, 90, 850, "Abigail", 
        "Abigail has done nothing wrong, ever, in her life!", 
        "white", "#951502"
    );
    legion = new Media(legionImg, 90, 830, "Legion", 
        "Everyone says this movie is bad, but I love it!", 
        "#004C57", "white"
    );
    life = new Media(lifeImg, 90, 820, "Life", 
        "This one made me genuinely grip my seat in the movie theater, because I was so tense", 
        "black", "white"
    );
    startrek = new Media(startrekImg, 90, 810, "Star Trek", 
        "The 2009 reboot. I have probably watched this more than 10 times", 
        "white", "black"
    );
    upgrade = new Media(upgradeImg, 90, 800, "Upgrade", 
        "One of the very few movies that can pull off a bad ending", 
        "black", "#E32611"
    );


    medias.push(wolfsong, sealover, hgt, loveless, enemies, clickbait, abigail, legion, life, startrek, upgrade);
}

function setupShelf() {
    boundaries.push(new Boundary(20, h / 2, 15, h + 20));
    boundaries.push(new Boundary(700, h / 2, 15, h + 20));

    boundaries.push(new Boundary(360, 150, 665, 15));
    boundaries.push(new Boundary(360, 400, 665, 15));
    boundaries.push(new Boundary(360, 700, 665, 15));
    boundaries.push(new Boundary(360, h, 665, 15));
}

function importImages() {
    background = loadImage("assets/images/projekt_final_newformat.png");
    avocadoImg = loadImage("assets/images/avocado.png");
    miffyImg = loadImage("assets/images/miffy.png");
    bearyImg = loadImage("assets/images/beary.png");
    duckImg = loadImage("assets/images/duck.png");
    cactus1Img = loadImage("assets/images/cactus1.png");
    cactus2Img = loadImage("assets/images/cactus2.png");
    byunnyGImg = loadImage("assets/images/byunny_g.png");
    byunnyPImg = loadImage("assets/images/byunny_p.png");
    milkyImg = loadImage("assets/images/milky.png");
    melonImg = loadImage("assets/images/melon.png");
    miffy2Img = loadImage("assets/images/miffyP.png");
    miffy3Img = loadImage("assets/images/miffyY.png");

    pensImg = loadImage("assets/images/pens.png");
    pencilcaseImg = loadImage("assets/images/pencilcase.png");
    paintBImg = loadImage("assets/images/color_b.png");
    paintOImg = loadImage("assets/images/color_o.png");
    paintGImg = loadImage("assets/images/color_g.png");

    booksImg = loadImage("assets/images/books.png");
    moviesImg = loadImage("assets/images/movies.png");

    wolfsongImg = loadImage("assets/images/wolfsong.png");
    sealoverImg = loadImage("assets/images/sealover.png");
    hgtImg = loadImage("assets/images/hgt.png");
    lovelessImg = loadImage("assets/images/loveless.png");
    enemiesImg = loadImage("assets/images/enemies.png");
    clickbaitImg = loadImage("assets/images/clickbait.png");

    abigailImg = loadImage("assets/images/abigail.png");
    legionImg = loadImage("assets/images/legion.png");
    lifeImg = loadImage("assets/images/life.png");
    startrekImg = loadImage("assets/images/startrek.png");
    upgradeImg = loadImage("assets/images/upgrade.png");

    meImg = loadImage("assets/images/me_small_new.gif");

}

function importJson() {
    bearyJson = loadJSON("assets/vertices/bearyVertices.json");
    avocadoJson = loadJSON("assets/vertices/avocadoVertices.json");
    duckJson = loadJSON("assets/vertices/duckVertices.json");
    miffyJson = loadJSON("assets/vertices/miffyVertices.json");
    byunnyJson = loadJSON("assets/vertices/byunnyVertices.json");
    milkyJson = loadJSON("assets/vertices/milkyVertices.json");
    melonJson = loadJSON("assets/vertices/melonVertices.json");
    cactus1Json = loadJSON("assets/vertices/cactus1Vertices.json");
    cactus2Json = loadJSON("assets/vertices/cactus2Vertices.json");
    miffy2Json = loadJSON("assets/vertices/miffy2Vertices.json");


    pensJson = loadJSON("assets/vertices/pensVertices.json");
    pencilcaseJson = loadJSON("assets/vertices/pencilcaseVertices.json");
    paintJson = loadJSON("assets/vertices/paintVertices.json");
    booksJson = loadJSON("assets/vertices/booksVertices.json");
    moviesJson = loadJSON("assets/vertices/moviesVertices.json");
}

function importMusic() {
    /*
    //Flamingo by Kero Kero Beats
    flamingo = loadSound("assets/music/Flamingo.mp3");
    //Say So (Japanese Version) by Rainych
    saySo = loadSound("assets/music/SaySo.mp3");
    //Song of Storms Electro Swing Remix by The Musical Ghost
    songOfStorms = loadSound("assets/music/SongOfStorms.mp3");
    //Lagtrain by SOLARIA
    lagtrain = loadSound("assets/music/Lagtrain.mp3");
    //Beneath the Mask from the Persona 5 Soundtrack
    beneath = loadSound("assets/music/Beneath-the-mask.mp3");
    //Pursuing My True Self from the Persona 4 Soundtrack
    pursuing = loadSound("assets/music/Pursuing-my-true-self.mp3");
    */

    chill = loadSound("assets/music/chill.mp3");
    deep = loadSound("assets/music/deep.mp3");
    hipHop = loadSound("assets/music/hip-hop.mp3");
    sloth = loadSound("assets/music/sloth.mp3");
    study = loadSound("assets/music/study.mp3");

    songs.push(chill, deep, hipHop, sloth, study);
}