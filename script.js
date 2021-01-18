var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var innerHeight = canvas.height;
var innerWidth = canvas.width;
var mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

var colorArr = [
    "blue",
    "violet",
    "purple",
    "#318fb5",
    "#1f4068",
    "#6f4a8e",
    "#12cad6",
    "#07031a"
]


function randomIntRange(min, max) {
    return Math.floor(Math.random() *(max - min)) + min;
}

function particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radian = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.dist = randomIntRange(50,120);
  
  
  this.draw = (prev) => {
    
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(prev.x, prev.y);
    c.lineTo(this.x,this.y);
    c.stroke();
    c.closePath();
  };
  this.update = () => {
      var prev = {
          x: this.x, 
          y: this.y
      }
    
    this.radian+=this.velocity;
    this.x = innerWidth/2 + Math.cos(this.radian) * this.dist;
    this.y = innerHeight/2 + Math.sin(this.radian) * this.dist;
    this.draw(prev);
  };
}

var particles = [];
for (var i = 0; i < 100; i++) {
    var color = colorArr[Math.floor(Math.random() *8)];
    var radius = Math.random() *3+1;
  particles.push(new particle(innerWidth/2,innerHeight/2, radius, color));  

}


function animate() {
  requestAnimationFrame(animate);
  c.fillStyle="rgba(255,255,255,0.05)";
  c.fillRect(0,0,innerWidth,innerHeight);
  particles.forEach((particle) => {
    particle.update();
  });
}
animate();
