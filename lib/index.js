var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var list = [];
var colors = ["rgb(255,161,41)", "rgb(0,0,0)"]
var img = document.getElementById("pumpkin");

function Block(x, y) {
  this.x = x;
  this.y = y;
}

function Food(x, y) {
  this.x = x;
  this.y = y;
}

function Snake() {
  this.head = new Block(40, 40);
  this.body = [new Block(20, 40)];
}

var food  = createFood();
var snake = new Snake();
var width = 20;
var height = 20;
var direction = '0';
createSnake(snake);

Snake.prototype.play = function() {
  animate();
}

snake.play();

function animate() {
  var timer = setInterval(function() {
    requestAnimationFrame(function gameLoop() {
      checkDirection()
      context.clearRect(0, 0, canvas.width, canvas.height);
      food.draw();
      snake.head.checkFood();
      snake.draw();
      if (direction != '0') {
        snake.move();
        list.push([snake.head.x, snake.head.y])
        followHead(snake);
      }
      if(!snake.head.checkValidity()){
        window.clearInterval(timer);
      }
    });
  }, 50);
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function followHead(block) {
  if(list.length > snake.body.length){
    list.shift();
  }
  for(i = 0; i < list.length; i++){
    snake.body[i].x = list[i][0]
    snake.body[i].y = list[i][1]
  }
}

function createSnake(snake) {
  for (i=0; i < 10; i++){
    snake.body.push(new Block(snake.body[snake.body.length-1].x - 1, snake.body[snake.body.length-1].y))
  }
}

function createBlock(x, y) {
  var block = new Block(x, y);
  return block;
}

function createFood() {
  var x = Math.floor(Math.random() * (canvas.width - 20 + 1));
  var y = Math.floor(Math.random() * (canvas.height - 20 + 1));
  x = Math.ceil(x/20.0) * 20;
  y = Math.ceil(y/20.0) * 20;
  var food = new Food(x, y);
  return food;
}

Food.prototype.draw = function() {
  context.fillRect(this.x, this.y, width, height);
}

Block.prototype.checkFood = function(){
  var x_diff = Math.abs( this.x - food.x );
  var y_diff = Math.abs( this.y - food.y );
  if(x_diff < 20 && y_diff < 20){
    snake.body.push(new Block(snake.body[snake.body.length-1].x - 1, snake.body[snake.body.length-1].y))
    food = createFood();
  }
}

Snake.prototype.move = function(e) {
  if (direction.keyCode == '38') {
    snake.head.subtractY();
  }
  else if (direction.keyCode == '40') {
    snake.head.addY();
  }
  else if (direction.keyCode == '37') {
    snake.head.subtractX();
  }
  else if (direction.keyCode == '39') {
    snake.head.addX();
  }
}

function checkDirection() {
  document.onkeydown = function(e) {
    if(e){
      direction = e;
    }
  }
}

Block.prototype.checkValidity = function(){
  if(this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height){
    return true
  }
  else{
    return false
  }
}

Snake.prototype.draw = function() {
  for(i = 0; i < snake.body.length; i++){
    snake.body[i].draw();
  }
}

Block.prototype.draw = function() {
  context.fillStyle = colors[Math.floor(Math.random()*colors.length)];
  context.fillRect(this.x, this.y, width, height);
  return this
}

Food.prototype.draw = function() {
  context.drawImage(img,this.x, this.y, width, height);
  return this
}

Block.prototype.addX = function() {
  this.x += 20
}

Block.prototype.addY = function() {
  this.y += 20
}

Block.prototype.subtractX = function() {
  this.x -= 20
}

Block.prototype.subtractY = function() {
  this.y -= 20
}

window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
