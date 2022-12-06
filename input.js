window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    setTimeout(() => {
        if (k === 37 || k === 65) {
            //left
            pacman.nextDirection = DIRECTION_LEFT;
        } else if (k === 38 || k === 87) {
            //up
            pacman.nextDirection = DIRECTION_UP;
        } else if (k === 39 || k === 68) {
            //right
            pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k=== 40 || k === 83) {
            //down
            pacman.nextDirection = DIRECTION_DOWN;
        }
    }, 1)
})