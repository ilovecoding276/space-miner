let canvas =
    document.getElementById("gameCanvas");

let ctx =
    canvas.getContext("2d");



let player = {
    x: 375,
    y: 420,
    width: 50,
    height: 50,
    speed: 7
};



let keys = {};



let minerals = [];

let asteroids = [];



let score = 0;

let lives = 3;

let gameOver = false;



document.addEventListener(
    "keydown",
    function(event) {

        keys[event.key] = true;

    }
);



document.addEventListener(
    "keyup",
    function(event) {

        keys[event.key] = false;

    }
);



function createMineral() {

    let mineral = {

        x:
            Math.random() * 760,

        y: -30,

        width: 30,

        height: 30,

        speed: 4

    };



    minerals.push(mineral);

}



function createAsteroid() {

    let asteroid = {

        x:
            Math.random() * 760,

        y: -40,

        width: 40,

        height: 40,

        speed: 5

    };



    asteroids.push(asteroid);

}



function movePlayer() {

    if (keys["ArrowLeft"]) {

        player.x -= player.speed;

    }



    if (keys["ArrowRight"]) {

        player.x += player.speed;

    }



    if (player.x < 0) {

        player.x = 0;

    }



    if (player.x > 750) {

        player.x = 750;

    }

}



function moveObjects() {

    for (
        let i = 0;
        i < minerals.length;
        i++
    ) {

        minerals[i].y +=
            minerals[i].speed;

    }



    for (
        let i = 0;
        i < asteroids.length;
        i++
    ) {

        asteroids[i].y +=
            asteroids[i].speed;

    }

}



function checkCollisions() {

    for (
        let i = 0;
        i < minerals.length;
        i++
    ) {

        let mineral =
            minerals[i];



        if (

            player.x <
            mineral.x + mineral.width &&

            player.x + player.width >
            mineral.x &&

            player.y <
            mineral.y + mineral.height &&

            player.y + player.height >
            mineral.y

        ) {

            minerals.splice(i, 1);

            score += 1;

        }

    }



    for (
        let i = 0;
        i < asteroids.length;
        i++
    ) {

        let asteroid =
            asteroids[i];



        if (

            player.x <
            asteroid.x + asteroid.width &&

            player.x + player.width >
            asteroid.x &&

            player.y <
            asteroid.y + asteroid.height &&

            player.y + player.height >
            asteroid.y

        ) {

            asteroids.splice(i, 1);

            lives -= 1;

        }

    }

}



function drawPlayer() {

    ctx.fillStyle =
        "deepskyblue";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}



function drawMinerals() {

    ctx.fillStyle =
        "lime";



    for (
        let i = 0;
        i < minerals.length;
        i++
    ) {

        let mineral =
            minerals[i];



        ctx.fillRect(
            mineral.x,
            mineral.y,
            mineral.width,
            mineral.height
        );

    }

}



function drawAsteroids() {

    ctx.fillStyle =
        "red";



    for (
        let i = 0;
        i < asteroids.length;
        i++
    ) {

        let asteroid =
            asteroids[i];



        ctx.fillRect(
            asteroid.x,
            asteroid.y,
            asteroid.width,
            asteroid.height
        );

    }

}



function drawText() {

    ctx.fillStyle =
        "white";

    ctx.font =
        "24px Arial";



    ctx.fillText(
        "Score: " + score,
        20,
        40
    );



    ctx.fillText(
        "Lives: " + lives,
        20,
        80
    );

}



function drawGameOver() {

    ctx.fillStyle =
        "white";

    ctx.font =
        "50px Arial";



    ctx.fillText(
        "GAME OVER",
        240,
        250
    );

}



function updateGame() {

    if (gameOver) {

        drawGameOver();

        return;

    }



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    movePlayer();

    moveObjects();

    checkCollisions();



    drawPlayer();

    drawMinerals();

    drawAsteroids();

    drawText();



    if (lives <= 0) {

        gameOver = true;

    }



    requestAnimationFrame(
        updateGame
    );

}



setInterval(
    createMineral,
    1200
);



setInterval(
    createAsteroid,
    900
);



updateGame();