class Ghost {
    constructor(
        x,
        y,
        width,
        height,
        speed,
        imageX,
        imageY,
        imageWidth,
        imageHeight,
        range
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.range = range;
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        if (this.checkCollision()) {
            this.moveBackwards()
        }
    }

    eat() {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] === 2 &&
                    this.getMapX() === j &&
                    this.getMapY() === i
                ) {
                    map[i][j] = 3;
                    score++;
                }
            }
        }
    }

    moveBackwards() {
        switch(this.direction){
            case DIRECTION_RIGHT:
                this.x -= this.speed
                break
            case DIRECTION_UP:
                this.y += this.speed
                break
            case DIRECTION_LEFT:
                this.x += this.speed
                break
            case DIRECTION_DOWN:
                this.y -= this.speed
                break
        }
    }

    moveForwards() {
        switch(this.direction){
            case DIRECTION_RIGHT:
                this.x += this.speed
                break
            case DIRECTION_UP:
                this.y -= this.speed
                break
            case DIRECTION_LEFT:
                this.x -= this.speed
                break
            case DIRECTION_DOWN:
                this.y += this.speed
                break
        }
    }

    checkCollision() {
        let isCollided = false;
        if(
            map[this.getMapY()][this.getMapX()] === 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] === 1 ||
            map[this.getMapY()][this.getMapXRightSide()] === 1 ||
            map[this.getMapYRightSide()][this.getMapX()] === 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    checkTurnCollision() {

    }

    checkGhostCollision() {
    }

    changeDirectionIfPossible() {
        if (this.direction === this.nextDirection) {
            this.moveForwards()
            if (this.checkCollision()) {
                this.moveBackwards()
            }
            return;
        }

        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards()
        if (this.checkCollision()) {
            this.moveBackwards()
            this.direction = tempDirection;
            this.moveForwards()
        } else {
            this.moveBackwards()
        }
    }

    changeAnimationFrame() {
        if (this.currentFrame === this.frameCount) {
            this.currentFrame = 1;
        } else {
            this.currentFrame = this.currentFrame + 1;
        }
    }

    getMapX() {
        return parseInt((this.x / oneBlockSize).toString());
    }

    getMapY() {
        return parseInt((this.y / oneBlockSize).toString());
    }

    getMapXRightSide() {
        return parseInt(((this.x + 0.999 * oneBlockSize) / oneBlockSize).toString());
    }

    getMapYRightSide() {
        return parseInt(((this.y + 0.999 * oneBlockSize) / oneBlockSize).toString());
    }

    draw() {
        canvasContext.save()

        if (ghostFrames instanceof HTMLImageElement) {
            canvasContext.drawImage(
                ghostFrames,
                this.imageX,
                this.imageY,
                this.imageWidth,
                this.imageHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            console.log("wrong type: pacmanFrames");
        }

        canvasContext.restore();
    }

}



