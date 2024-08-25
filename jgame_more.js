var move ={
    backward : function(id, steps){
        id.physics = true;
        id.speedX = -steps;
        id.speedY = -steps;
    },
    teleport : function(id, x, y){
        id.x = x
        id.y = y
    },
    setX : function(id, x){
        id.x = x;
    },
    setY : function(id, y){
        id.y = y;
    },
    stamp : function(id){
        const stamped = new component(id.width, id.height, id.color, id.x, id.y, id.type)
        return stamped;
    },
    circle : function(id, speed){
        id.physics = true;
        id.changeAngle = true
        id.angle = speed * Math.PI / 180;
    },
    dot : function(id){
        var ctx = display.context
        ctx.beginPath();
        ctx.arc(id.x,id.y,0,0,2*Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
    },
    clearStamp : function(id){
        id.update = false;
    },
    turnLeft : function(id, steps){
        id.changeAngle = true
        id.angle += steps
    },
    turnLeft : function(id, steps){
        id.changeAngle = true
        id.angle += -steps;
    },
    bound : function(id){
        if (id.x <= 0){
            id.x = 0;
        }
        if (id.x >= display.canvas.width){
            id.x = display.canvas.width;
        }
    },
    hitObject : function(id, otherid){
        id.physics = true;
        if((id.crashWith(otherid)) && (id.y <= otherid)){
            id.gravitySpeed = -(id.gravitySpeed * id.bounce);
        }
    }
}
var state = {
    distance : function(id, otherid){
        dis = Math.sqrt((Math.pow(id.x-otherid.x,2))+(Math.pow(id.y-otherid.y,2)))
        return dis;
    },
    rect : function(id){
        return [id.x, id.y, id.width, id.height]
    },
    physics :  function(id){
        return id.physics
    },
    changeAngle :  function(id){
        return id.changeAngle
    },
    Angle :  function(id){
        return id.angle
    },
    pos :  function(id){
        return id.x+' '+id.y
    }
}