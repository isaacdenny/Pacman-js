const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342DCA"
let backgroundColor = "black";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let foodColor = "#FEB897"
let score = 0;
let ghosts = [];
let ghostCount = 4;
let randomTargetsForGhosts = [
    {x: oneBlockSize, y: oneBlockSize},
    {x: oneBlockSize, y: (map.length - 2) * oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize}
]
let lives = 3;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;

let ghostLocations = [
    {x: 0, y: 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x: 176, y: 121}
]

let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
}

let ghostsMove = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
    }
}

const draw = () => {
    createRect(0, 0, canvas.width, canvas.height, backgroundColor);
    drawWalls();
    drawFoods();
    drawScore();
    drawGhosts();
    drawRemainingLives();
    pacman.draw();
};

const update = () => {
    pacman.moveProcess();
    ghostsMove();
    pacman.eat();
};
const gameLoop = () => {
    update();
    draw();
};

const gameInterval = setInterval(gameLoop, 1_000 / fps);

pacman = createNewPacman();
ghosts = createGhosts();
gameLoop();