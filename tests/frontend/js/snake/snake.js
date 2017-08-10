/* there is a bug if you press down + right for example, you die
 */


// easier if we make this global
var main_interval;

// direction variables
var xv = 0, yv = 0;
// this is also the current direction
var prev_key = 0;

// snake position
// this is actually the box pos in the grid
var snake = new Array();
var start_px = 10, start_py = 10;
snake.unshift({"px": start_px, "py": start_py});
var best_score = 0;

// apple position
var initial_ax = 15, initial_ay = 15;
var ax = initial_ax, ay = initial_ay;

// the canvas size = 400x400
// we take a grid 20x20, each box 20px x 20px
var cols = 20, lines = 20;
var box_width = 20, box_height = 20;
var box_border = 2;

// run main function after document is ready
$(main);

function main(){
    // add keyboard listeners
    // keydown is for any key
    document.addEventListener("keydown", key_push);

    // this also controls the speed of the snake
    var fps = 15;
    // this is in ms
    var refresh_time = 1000 / fps;
    // start the game loop
    main_interval = setInterval(game, refresh_time);
}

function game(){
    new_px = snake[0].px + xv;
    new_py = snake[0].py + yv;

    if (check_collision(new_px, new_py)) {
	alert("You died! Length reached: " + snake.length.toString());
	if (snake.length > best_score) {
	    best_score = snake.length;
	}

	// clear snake
	snake.splice(0, snake.length);
	snake.unshift({"px": start_px, "py": start_py});

	// reset direction
	xv = 0;
	yv = 0;
	prev_key = 0;

	// reset apple
	ax = initial_ax;
	ay = initial_ay;

	// update text
	$("#best-score").html("Best score: " + best_score.toString());
	//clearInterval(main_interval);
	return;
    }

    // add new pos to beginning of array
    snake.unshift({"px": new_px, "py": new_py});

    // check for hit (apple)
    if (new_px == ax && new_py == ay) {
	do {
	    hit = false;
	    ax = Math.floor(Math.random() * (lines - 1));
	    ay = Math.floor(Math.random() * (cols - 1));
	    // TODO improve check for unoccupied space
	    for (var i = 0; i < snake.length; i++) {
		if (ax == snake[i].px && ay == snake[i].py) {
		    hit = true;
		    break;
		}
	    }
	} while(hit == true);
    } else {
	// remove last position
	snake.pop();
    }

    // fill the canvas
    draw_canvas();
    //clearInterval(main_interval);
}

function check_collision(new_px, new_py){
    // check for collision with walls
    if (new_px < 0) {
	return true;
    }
    if (new_px >= cols) {
	return true;
    }
    if (new_py < 0) {
	return true;
    }
    if (new_py >= lines) {
	return true;
    }

    // check for collision with self
    if (snake.length < 2){
	return false;
    }
    for (var i = 0; i < snake.length; i++) {
	if (new_px == snake[i].px && new_py == snake[i].py) {
	    return true;
	}
    }

    return false;
}

function draw_canvas(){
    // easiest way to get rid of old values
    // paint everything black every time
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the snake
    var px, py;
    ctx.fillStyle = "lime";
    for (var i = 0; i < snake.length; i++) {
	px = snake[i].px;
	py = snake[i].py;
	ctx.fillRect(px * box_width, py * box_height,
		     box_width - box_border, box_height - box_border);
    }

    // draw the apple
    ctx.fillStyle = "red";
    ctx.fillRect(ax * box_width, ay * box_height,
		 box_width - box_border, box_height - box_border);
}

// constants for key codes
// keycodes: up = 38, left = 37, right = 39, down = 40
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

function key_push(event){
    if (event.keyCode == LEFT_KEY) {
	if ((prev_key == LEFT_KEY) || (prev_key == RIGHT_KEY)) {
	    return;
	}
	prev_key = LEFT_KEY;
	xv = -1;
	yv = 0;
    } else if (event.keyCode == UP_KEY) {
	if ((prev_key == UP_KEY) || (prev_key == DOWN_KEY)) {
	    return;
	}
	prev_key = UP_KEY;
	xv = 0;
	yv = -1;
    } else if (event.keyCode == RIGHT_KEY) {
	if ((prev_key == RIGHT_KEY) || (prev_key == LEFT_KEY)) {
	    return;
	}
	prev_key = RIGHT_KEY;
	xv = 1;
	yv = 0;
    } else if (event.keyCode == DOWN_KEY) {
	if ((prev_key == DOWN_KEY) || (prev_key == UP_KEY)) {
	    return;
	}
	prev_key = DOWN_KEY;
	xv = 0;
	yv = 1;
    }
}

function playing_around_with_text(){
    // TODO document on this
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "16px Arial";
    ctx.fillText("Use the arrow keys to move", 420, 20);
    ctx.fillText("Best score: " + best_score.toString(), 420, 40);

    // the update didn't work for this
    canvas.width = canvas.width;
}

// test function
function test1(){
    // good ol' javascript
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ff0000";
    // xstart, ystart, totalx, totaly
    // you don't need to set up an initial width/height
    ctx.fillRect(0, 0, 80, 80);
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(20, 20, 40, 40);
}
