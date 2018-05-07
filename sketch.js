var score;
var canvas;
var canvasHeight;
var canvasWidth;
var circleSize;
var countdown;
var button;
var circles = [];
var scoreElement; 
var score; 
var explosion = []; 
var timeBetweenCircles;
var timer;
var lastTime; 

//setup of p5 objects and events
function setup() {
  canvasHeight = windowHeight - 50;
  canvasWidth = windowWidth;
  circleSize = 30;
  score = 0;
  lastTime = 0;
  timeBetweenCircles = 500;
  timer = 0; 
  noStroke();
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.mouseClicked(checkForCircles);
  // button = createButton('Play');
  // button.mousePressed(createCircle);
  scoreElement= createElement("p", "Score = 0");
}

function makeCanvas(){

}


//draws to the canvas
function draw() {
  background(color(230, 230, 230));

  timer = millis() - lastTime;
  if (timer >= timeBetweenCircles){
    createCircle();
    timer = 0; 
    lastTime = millis();
  }
  
  for(var i = 0; i<circles.length; i++){
    var workingCircle = circles[i]; 
    if(workingCircle.lifespan <= 0.001){
      removeCircle(i, workingCircle);
    }
    else{ 
      fill(color(hslaColor(workingCircle.hue, workingCircle.lifespan)));
      animateCircle(workingCircle); 
      ellipse(workingCircle.X, workingCircle.Y, circleSize, circleSize);
    }
    workingCircle.lifespan = workingCircle.lifespan - 0.01.toFixed(2);   
  }

}

//creates a new circle and adds it to the list
function createCircle(){
  var hue = randomHue();
  var lifespan = 1;
  c = color(hslaColor(hue, lifespan));  
  var x = randomX();
  var y = randomY();
  var newCircle = {X:x, Y:y, color:c, hue:hue, lifespan:lifespan};
  circles.push(newCircle);
}

//removes circle from list of circles
function removeCircle(index, circle){
  circles.splice(index, 1);
}

//returns a string to represent the hsla color
function hslaColor(hue, lifespan){
  var str1 = "hsla(";
  var colorString = str1.concat(hue, ", 60%, 70%,", lifespan, ")");
  return colorString;
}

function animateCircle(circle){
  circle.X = circle.X + random(-1, 1);
  circle.Y = circle.Y + random(-1, 1);
}

//checks if there are warm colored circles
function checkForCircles(){
  for(var i = 0; i<circles.length; i++){
    var workingCircle = circles[i];
    if(circleHit(workingCircle) && warmColor(workingCircle)){
      removeCircle(i, workingCircle);
      addPoints(workingCircle);

    }
  }  
}

//checks if there is a given circle where the mouse is clicked
function circleHit(workingCircle){
  var r = circleSize/2; 
    if(mouseX > (workingCircle.X + r) || mouseX < (workingCircle.X - r)){
      //window.alert("no x hit!");
      return false;
    }
    else if(mouseY > (workingCircle.Y + r) || mouseY < (workingCircle.Y - r)){
      //window.alert("no y hit!");
      return false;
    }
    else if(Math.pow(mouseX - workingCircle.X, 2)+ 
            Math.pow(mouseY - workingCircle.Y, 2) > 
            Math.pow(r, 2)){
      return false; 
    }
    else{
      return true;
    }
}

//checks if the given circle is a warm color
function warmColor(workingCircle){
  if (workingCircle.hue > 121 && workingCircle.hue < 302){
    //window.alert("cool");
    return false;
  }
  else{
    //window.alert("warm");
    return true;
  }
}

//adds points for each correct circle clicked
function addPoints(circle){
  score = Math.trunc(score + circle.lifespan * 10);
  scoreElement.html("Score: " + score);
}

//generates a random x coordinate on the canvas
function randomX(){
  var x = random(0+circleSize/2, canvasWidth-circleSize/2);
  //window.alert("X coord: " + x);
  return x;
}

//generates a random y coordinate on the canvas
function randomY(){
  var y = random(0+circleSize/2, canvasHeight-circleSize/2);
  //window.alert("Y coord: " + y);
  return y;
}

//generates a random hue for an HSL color value
function randomHue(){
  var h;
  do {
      h = random(360);
  }
  while(h > 85 && h < 150);
  return Math.trunc(h);
}

// //generates a random circle size
// function randomSize(){

// }



 












