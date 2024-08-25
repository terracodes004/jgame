var com = []
var display = {
    canvas : document.createElement("canvas"),
    start : function(width = 480, height = 270) {
        this.canvas.width = width;
        this.frameNo = 0;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 20);
        window.addEventListener('keydown', function (e) {
            display.keys = (display.keys || []);
            display.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            display.keys[e.keyCode] = false; 
        })
        window.addEventListener('mousedown', function (e) {
            display.x = e.pageX;
            display.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            display.x = false;
            display.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            display.x = e.pageX;
            display.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            display.x = false;
            display.y = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },    
    borderStyle : function(borderStyle){
        this.canvas.style.borderStyle = borderStyle
    },
    stop : function() {
        clearInterval(this.interval);
    },
    borderSize : function(borderStyle){
        this.canvas.style.borderSize = borderSize
    },
    backgroundColor : function(color){
        this.canvas.style.backgroundColor = color
    },
    borderColor : function(color){
        this.canvas.style.borderColor = color
    },
    fontColor : function(color){
        this.canvas.style.Color = color
    },
    scale : function(width, height){
        this.canvas.width = width
        this.canvas.height = height
    },
    add : function(x){
        com.push(x)
    }
}
function everyinterval(n) {
    if ((display.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
function component(width = 0, height = 0, color = null, x=0, y = 0, type) {
    this.width = width;
    this.type = type;
    this.color = color
    if (type == "image") {
        this.image = new Image();
        this.image.src = this.color;
      }
    this.height = height;
    this.angle = 0
    this.x = x;
    this.y = y; 
    this.speedX = 0
    this.speedY = 0
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.physics = false
    this.changeAngle = false; 
    this.update = function(){
        ctx = display.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if (this.changeAngle){
            
            if (type == "image") {
                ctx = display.context;
                ctx.save();
                ctx.translate(this.x, this.y); 
                ctx.rotate(this.angle);
                ctx.fillStyle = color;
                ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height); 
                ctx.restore();
            
            } else {
                ctx.fillStyle = color;
                ctx = display.context;
                ctx.save();
                ctx.translate(this.x, this.y); 
                ctx.rotate(this.angle);
                ctx.fillStyle = color;
                ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
                ctx.restore();
            }
        } else{
            if (type == "image") {
                ctx.drawImage(this.image, 
                  this.x, 
                  this.y,
                  this.width, this.height);
              } else {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
              }
        }
    }
    this.move = function(){
        if (this.physics){
            this.gravitySpeed += this.gravity;
            this.x += this.speedX * Math.sin(this.angle);
            this.y += this.speedY * Math.cos(this.angle) + this.gravitySpeed;
        }else{
            this.x += this.speedX
            this.y += this.speedY
            console.log("working")
        }
    }
    this.hitBottom = function() {
        var rockbottom = display.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
     stopMove  = function() {
        this.speedX = 0;
        this.speedY = 0; 
    }
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < display.y) || (mytop > display.y)
         || (myright < display.x) || (myleft > display.x)) {
            clicked = false;
        }
        return clicked;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    }
    

