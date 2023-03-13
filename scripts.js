var canvas;
var context;
var btn_restart;
var interval;

var bole = {
    x: 0,
    y: 0,
    radius: 2*Math.PI,
    speed: 1,
    horiz_dir: 1,
    verti_dir: 1,
    draw: function(){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, this.radius, false);
        context.fillStyle = '#ffff4d';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#4d4d00';
        context.stroke();
    },
    init: function(x, y){
        this.x = x;
        this.y = y;
        this.draw();
    },
    move: function(){
        this.x += this.speed * this.horiz_dir;
        this.y += this.speed * this.verti_dir;
    },
    checkCollisions: function(){
        pointX = this.radius * 2;
        pointY = this.radius * 2;
        if(this.x+pointX>=canvas.width || this.x-pointX<=0){
            this.horiz_dir *= -1;
            ShowResult();
        }
        if(this.y+pointY>=canvas.height || this.y-pointY<=0){
            this.verti_dir *= -1;
        }
    }
};

var racket1 = {
    y: 100,
    draw: function(){
        context.beginPath();
        context.rect(10, this.y, 10, 100);
        context.fillStyle = '#660066';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#e600e6';
        context.stroke();
    },
    checkBole: function(){
        boleY = bole.y+bole.radius<this.y+100 && bole.y-bole.radius>this.y;
        boleX = bole.x-bole.radius*2 <= 20;
        if(boleY && boleX){
            bole.horiz_dir *= -1;
            bole.speed += 0.5;
        }
    },
    moveUp: function(){
        if(this.y > 0){
            this.y -= 50;
        }
    },
    moveDown: function(){
        if(this.y+100 < canvas.height){
            this.y += 50;
        }
    }
};

var racket2 = {
    y: 100,
    draw: function(){
        context.beginPath();
        context.rect(580, this.y, 10, 100);
        context.fillStyle = '#003300';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#00cc00';
        context.stroke();
    },
    checkBole: function(){
        boleY = bole.y+bole.radius<this.y+100 && bole.y-bole.radius>this.y;
        boleX = bole.x+bole.radius*2 >= 580;
        if(boleY && boleX){
            bole.horiz_dir *= -1;
            bole.speed += 0.5;
        }
    },
    moveUp: function(){
        if(this.y > 0){
            this.y -= 50;
        }
    },
    moveDown: function(){
        if(this.y+100 < canvas.height){
            this.y += 50;
        }
    }
};

function ShowResult(){
    clearInterval(interval);
    document.getElementById('myModal').style.display = "block";
}

function SetUp(){
    btn_start = document.getElementById('btn_start');
    btn_restart = document.getElementById('btn_restart');
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    racket1.draw();
    racket2.draw();
}

function DrawGrid(){
    var c_width = context.canvas.clientWidth;
    var c_height = context.canvas.clientHeight;
    context.lineWidth = 1;
    context.strokeStyle = '#FFF';
    for(i=10; i<c_width; i+=10){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, 300);
        context.stroke();
    }
    for(i=10; i<c_height; i+=10){
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(600, i);
        context.stroke();
    }
}

SetUp();

btn_restart.addEventListener('click', function(){
    location.reload();
});

function StartGame(){
    var c_width = context.canvas.clientWidth/2;
    var c_height = context.canvas.clientHeight/2;
    if(Math.floor(Math.random()*2) == 0){
        bole.horiz_dir = -1;
    }else{
        bole.horiz_dir = 1;
    }
    if(Math.floor(Math.random()*2) == 0){
        bole.verti_dir = -1;
    }else{
        bole.verti_dir = 1;
    }
    bole.init(c_width, c_height);
    interval = window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // DrawGrid();
        bole.move();
        bole.draw();
        racket1.draw();
        racket2.draw();
        bole.checkCollisions();
        racket1.checkBole();
        racket2.checkBole();
    }, 10);
}

function MovePurpleUp(){
    racket1.moveUp();
}

function MovePurpleDown(){
    racket1.moveDown();
}

function MoveGreenUp(){
    racket2.moveUp();
}

function MoveGreenDown(){
    racket2.moveDown();
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        StartGame();
    }else if(e.keyCode == 38){
        e.preventDefault();
        MoveGreenUp();
    }else if(e.keyCode == 40){
        e.preventDefault();
        MoveGreenDown();
    }else if(e.keyCode == 87){
        e.preventDefault();
        MovePurpleUp();
    }else if(e.keyCode == 83){
        e.preventDefault();
        MovePurpleDown();
    }
});

