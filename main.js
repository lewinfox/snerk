console.log('main.js connected');

let snake;
let food = [];
let scl = 20;

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

    eats_food(f) {
        if (this.body[0][0] == f.x && this.body[0][1] == f.y) {
            console.log('NOM NOM NOM');
            food.pop();
            food.push(new Food());
            this.grow();
            frameRate(frameRate() + 1);  // frameRate ++
        }
    }

    grow() {
        console.log('GROW');        
        let new_segment = this.body[this.body.length - 1];
        this.body.push(new_segment);
        this.update();
    }

    update() {
        // Calculate new head location, add a new segment at that
        // location (at the start of the body array), then
        // remove the last element of the body array
        let new_head_x;
        let new_head_y;
        let current_head_x = this.body[0][0];
        let current_head_y = this.body[0][1];
        
        if (current_head_x < 0 - scl) {
            new_head_x = width;
        } else if (current_head_x > width) {
            new_head_x = 0;
        } else {
            new_head_x = current_head_x + this.x_speed * scl;
        }

        if (current_head_y < 0) {
            new_head_y = height;
        } else if (current_head_y > height) {
            new_head_y = 0;
        } else {
            new_head_y = current_head_y + this.y_speed * scl;
        }        

        this.body.unshift([new_head_x, new_head_y]);
        this.body.pop();
    }

    show() {
        fill(255);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i][0], this.body[i][1], scl, scl);
        }
    }

    hits_itself() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]) {
                return true;
            }
        }
        return false;
    }
}

class Food {

    constructor() {
        this.x = Math.floor(Math.random() * scl) * (width / scl);
        this.y = Math.floor(Math.random() * scl) * (width / scl);
        console.log(`NEW FOOD AT: ${this.x}, ${this.y}`);
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
    if (snake.hits_itself()) {
        background(255, 0, 0)
    } else {
        background(32);
    }

    for (let i = 0; i < food.length; i++) {
        food[i].show();
    }

    for (let i = 0; i < food.length; i++) {
        snake.eats_food(food[i]);
    } 

    snake.update();
    snake.show();
}
