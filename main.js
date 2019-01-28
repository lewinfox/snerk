console.log('main.js connected');

let snake;
let food = [];
let scl = 10;

class Snake {
    
    constructor(start_x, start_y, length = 3) {
        this.x = start_x;
        this.y = start_y;
        this.x_speed = 1;
        this.y_speed = 0;
        this.body = [[start_x, start_y]];
        for (let i = 0; i < length - 1; i++) {
            this.body.push([start_x - i, start_y]);
        }
    }

    grow() {
        let new_segment = this.body[this.body.length - 1];
        this.body.push(new_segment);
    }

    update() {
        // Calculate new head location, add a new item at that
        // location (at the start of the body array), then
        // remove the last element of the body array
        let new_head_x = this.body[0][0] + this.x_speed * scl;
        let new_head_y = this.body[0][1] + this.y_speed * scl;
        this.body.unshift([new_head_x, new_head_y]);
        this.body.pop();
    }

    show() {
        fill(255);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i][0], this.body[i][1], scl, scl);
        }
    }
}

class Food {

    constructor() {
        this.x = Math.random() * width * scl;
        this.y = Math.random() * height * scl;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, scl, scl);
    }
}

function keyPressed() {
    snake.x_speed = 0;
    snake.y_speed = 0;
    switch (keyCode) {
        case UP_ARROW:
            snake.y_speed = -1;
            break;
        case DOWN_ARROW:
            snake.y_speed = 1;
            break;
        case RIGHT_ARROW:
            snake.x_speed = 1;
            break;
        case LEFT_ARROW:
            snake.x_speed = -1;
            break;    
        default:
            break;
    }
}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('canvas-container');
    food.push(new Food());
    snake = new Snake(height / 2, width / 2);
    frameRate(5);
}

function draw() {
    background(32);

    for (let i = food.length - 1; i >= 0; i--) {
        food[i].show();
    }

    snake.update();
    snake.show();
}