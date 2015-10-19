var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Block(x, y) {
  this.x = x;
  this.y = y;
}

function Food(x, y) {
  this.x = x;
  this.y = y;
}

function Snake(block) {
  this.head = block
  this.body = [block]
}


var block = createBlock(50, 50)
var food  = createFood();
var snake = new Snake(block)
var width = 10;
var height = 10;
var direction = '0';
createSnake(snake);

Snake.prototype.play = function() {
  var i = 1
  requestAnimationFrame(function gameLoop() {
    checkDirection()
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    food.draw();
    snake.head.checkFood();
    snake.draw();
    if (direction != '0') {
      followHead(snake.body[i], i);
      i++;
    }
    if (i >= snake.body.length){
      i = 1;
    }
    if(snake.head.checkValidity()){
      requestAnimationFrame(gameLoop);
    }
  }, 10000000);
}

snake.play();

function followHead(block, i) {
  block.x = snake.body[i - 1].x
  block.y = snake.body[i - 1].y
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
  var x = Math.floor((Math.random() * canvas.width - 1) + 1);
  var y = Math.floor((Math.random() * canvas.height - 1) + 1);
  var food = new Food(x, y);
  return food;
}

Food.prototype.draw = function() {
  context.fillRect(this.x, this.y, width, height);
  return this
}

Block.prototype.checkFood = function(){
  if(this.x == food.x && this.y == food.y){
    console.log('yum')
  }
}

Block.prototype.checkDirection = function(){
  if (e.keyCode == '38') {
    this.subtractY();
  }
  else if (e.keyCode == '40') {
    this.addY();
  }
  else if (e.keyCode == '37') {
    this.subtractX();
  }
  else if (e.keyCode == '39') {
    this.addX();
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
  if(this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height){
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
  context.fillRect(this.x, this.y, width, height);
  return this
}

Block.prototype.addX = function() {
  this.x++
}

Block.prototype.addY = function() {
  this.y++
}

Block.prototype.subtractX = function() {
  this.x--
}

Block.prototype.subtractY = function() {
  this.y--
}

window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
