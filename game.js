


// BG

var bg = function(game) {
    this.game = game;
    this.image = null;
    this.x = 0;
    
    var selt = this;


    this.init = function() {
        this.image = new Image();
        this.image.src = './img/background.png';
    }

    

    this.update = function() {
        if(game.gameOver === true) {
            return;
        }
        selt.x--;
        if(selt.x === -480) {
            selt.x = 0;
        }
    }

    this.draw = function() {
        selt.game.context.drawImage(this.image, selt.x, 0, game.width, game.height - 80);
        selt.game.context.drawImage(this.image, selt.x + game.width - 1, 0, game.width, game.height - 80);
    }
}




// Ground

var ground = function(game) {
    this.game = game;
    this.image = null;
    this.x = null;
    
    var selt = this;


    this.init = function() {
        this.image = new Image();
        this.image.src = './img/ground.png';
    }

    

    this.update = function() {
        if(game.gameOver === true) {
            return;
        }

        selt.x = selt.x - 3;
        if(selt.x < -483) {
            selt.x = 0;
        }
    }

    this.draw = function() {
        for(let i = 0; i < 42; i++) {
            let x = selt.x + 23 * i;
            selt.game.context.drawImage(this.image, x, 560, 23 ,80);
        }
    }
}





// PIPE 


var pipe = function(game) {
    this.game = game;
    this.image = null;
    this.x_1 = 570;
    this.x_2 = 570 + 300;
    this.pipe_1 = Math.floor(Math.random() * 270) + 240;
    this.pipe_2 = Math.floor(Math.random() * 270) + 240;
    
    var selt = this;


    this.init = function() {
        this.image = new Image();
        this.image.src = './img/pipe.png';
    }

    

    this.update = function() {
        if(game.gameOver === true) {
            return;
        }

        if(game.bird.checkFlap) {
            selt.x_1 -= 3;
            selt.x_2 -= 3;
            if(selt.x_2 === 180 + 90) {
                selt.x_1 = 570;
                selt.pipe_1 = Math.floor(Math.random() * 270) + 240;
            }
            if(selt.x_1 === 180 + 90) {
                selt.x_2 = 570;
                selt.pipe_2 = Math.floor(Math.random() * 270) + 240;
            }

        }
    }

    this.draw = function() { 

        //pipe_1
        selt.game.context.save();
        selt.game.context.translate(selt.x_1, selt.pipe_1 - 160);
        selt.game.context.rotate(Math.PI);
        selt.game.context.drawImage(this.image, 0, 0, 90, 513);
        selt.game.context.restore();

        selt.game.context.drawImage(this.image, selt.x_1 - 90 , selt.pipe_1, 90, 513);

        //pipe_2
        selt.game.context.save();
        selt.game.context.translate(selt.x_2, selt.pipe_2 - 160);
        selt.game.context.rotate(Math.PI);
        selt.game.context.drawImage(this.image, 0, 0, 90, 513);
        selt.game.context.restore();

        selt.game.context.drawImage(this.image, selt.x_2 - 90 , selt.pipe_2, 90, 513);


    }
}




// BIRD

var bird = function(game) {
    this.game = game;
    this.image = null;
    this.imgX = 0;
    this.checkFlap = 0;
    this.check = 0;
    this.check_1 = 0;
    this.x = 175
    this.y = 300;
    this.speed = 0;
    this.checkFlap = false;

    var selt = this;

    this.init = function() {
        this.image = new Image();
        this.image.src = './img/bird.png';
    }

    this.flap = function() {
        if(game.gameOver === false) {
            selt.checkFlap = true;
            selt.speed = -8;
        }

    }    

    this.update = function() {

        if(selt.checkFlap === true) {
            selt.check++;
            if(selt.check === 1) {
                selt.imgX = 0;
            } else if (selt.check === 11) {
                selt.imgX = 92;
            } else if (selt.check === 21) {
                selt.imgX = 184;
            } else if (selt.check === 31) {
                selt.imgX = 92;
            }


            // rơi tự do
            if(selt.y < game.height - 40 - 80) {
                selt.speed += 0.5;
                selt.y += selt.speed;
            } else {
                selt.y = game.height - 40 -  80;
                selt.imgX = 92;
                game.gameOver = true;
            }

            // kiểm tra đụng cột

            if (game.gameOver === false) {
                if (
                    ( selt.x > (game.pipe.x_1 - 90 - 57) && selt.x < (game.pipe.x_1) && selt.y < (game.pipe.pipe_1 - 160) ) ||
                    ( selt.x > (game.pipe.x_1 - 90 - 57) && selt.x < (game.pipe.x_1) && selt.y > (game.pipe.pipe_1 - 40) ) ||
                    ( selt.x > (game.pipe.x_2 - 90 - 57) && selt.x < (game.pipe.x_2) && selt.y < (game.pipe.pipe_2 - 160) ) ||
                    ( selt.x > (game.pipe.x_2 - 90 - 57) && selt.x < (game.pipe.x_2) && selt.y > (game.pipe.pipe_2 - 40) )
                ) {
                    game.gameOver = true;
                    selt.speed = 0;
                }
            }


        } else if (selt.checkFlap === false) {
            selt.imgX = 92;
            selt.check_1++;
            if(selt.check_1 <= 20 && selt.check_1 % 2 === 0) {
                selt.y += 1;
            } else if(selt.check_1 > 10 && selt.check_1 <= 40 && selt.check_1 % 2 === 0) {
                selt.y -= 1;
            }
            if(selt.check_1 === 40) {
                selt.check_1 = 0;
            }
        }

        if(selt.check === 40) {
            selt.check = 0;
        }
    }

    this.draw = function() {
        // selt.game.context.save();
        // selt.game.context.translate(-200,100)
        // selt.game.context.rotate(-Math.PI/4);
        // selt.game.context.drawImage(selt.image, selt.imgX, 0, 92, 64, 170, selt.x, 57, 40);
        // selt.game.context.restore();

        selt.game.context.drawImage(selt.image, selt.imgX, 0, 92, 64, selt.x, selt.y, 57, 40);
    }
}



var restart = function(game) {
    this.game = game;
    this.image_restart = null;
    this.image_share = null;
    this.image_add = null;
    this.image_score = null;

    this.score = 0;

    
    var selt = this;


    this.init = function() {
        this.image_restart = new Image();
        this.image_restart.src = './img/restart.png';

        this.image_share = new Image();
        this.image_share.src = './img/share.png';

        this.image_add = new Image();
        this.image_add.src = './img/add-to-leaderboard.png';

        this.image_score = new Image();
        this.image_score.src = './img/score.png';
    }

    

    this.update = function() {
        if(game.gameOver === false) {
            if( (game.bird.x >= (game.pipe.x_1 - 90 - 57) && game.bird.x <= (game.pipe.x_1 - 90 - 57 + 3) ) ||
                (game.bird.x >= (game.pipe.x_2 - 90 - 57) && game.bird.x <= (game.pipe.x_2 - 90 - 57 + 3) )
            ) {
                selt.score++;
            }
        }
        if(selt.score > game.bestScore) {
            game.bestScore = selt.score;
        }
    }

    this.draw = function() {
        
        if(game.gameOver === true) {
            selt.game.context.drawImage(this.image_restart, 90, 360, 138, 46);
            selt.game.context.drawImage(this.image_share, 252, 360, 138, 46);
            selt.game.context.drawImage(this.image_add, 90, 430, 300, 46);
            selt.game.context.drawImage(this.image_score, 185, 180, 110, 145);
            selt.game.context.save();
            selt.game.context.fillStyle = "white";
            selt.game.context.textAlign = "center";
            selt.game.context.font = "800 30px Comic Sans MS";
            selt.game.context.fillText(String(selt.score), 240, 248);
            selt.game.context.fillText(String(game.bestScore), 240, 300);
            selt.game.context.restore();
        } else {
            selt.game.context.save();
            selt.game.context.fillStyle = "white";
            selt.game.context.textAlign = "center";
            selt.game.context.font = "800 45px Comic Sans MS";
            selt.game.context.fillText(String(selt.score), 240, 100);
            selt.game.context.restore();
        }
    }
}





// GAME

var game = function() {
    this.canvas = null;
    this.context = null;
    this.width = 480;
    this.height = 640;
    this.bg = null;
    this.bird = null;
    this.ground = null;
    this.pipe = null;

    this.bestScore = 0;
    this.gameOver = false;
    

    var selt = this;

    this.init = function() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;


        selt.bg = new bg(selt);
        selt.bg.init();

        selt.bird = new bird(selt);
        selt.bird.init();

        selt.ground = new ground(selt);
        selt.ground.init();

        selt.pipe = new pipe(selt);
        selt.pipe.init();

        selt.restart = new restart(selt);
        selt.restart.init();

        selt.clickMouse();

        //document.body.appendChild(this.canvas);
        this.loop();
    }

    this.clickMouse = function() {
        selt.canvas.addEventListener('click', (e) => {
            selt.bird.flap();
            // console.log(e.clientX + '+' + e.clientY);
            // console.log(e.pageX + '+' + e.pageY);
            // console.log(this.canvas.offsetTop);
            // console.log(this.canvas.offsetLeft);

            var top = this.canvas.offsetTop + 360;
            var left = this.canvas.offsetLeft + 90;
            var checkMouse = (e.pageY >= top) && (e.pageY <= (top + 46)) && (e.pageX >= left) && (e.pageX <= (left + 138));
            if(selt.gameOver === true && checkMouse) {
                selt.bg = new bg(selt);
                selt.bg.init();

                selt.bird = new bird(selt);
                selt.bird.init();

                selt.ground = new ground(selt);
                selt.ground.init();

                selt.pipe = new pipe(selt);
                selt.pipe.init();

                selt.restart = new restart(selt);
                selt.restart.init();
                
                selt.gameOver = false;
            }


        });
        window .addEventListener('keydown', (e) => {  
            if(e.keyCode == 32) {
                selt.bird.flap(); 
            }
            if(selt.gameOver === true && e.keyCode == 32) {
                selt.bg = new bg(selt);
                selt.bg.init();

                selt.bird = new bird(selt);
                selt.bird.init();

                selt.ground = new ground(selt);
                selt.ground.init();

                selt.pipe = new pipe(selt);
                selt.pipe.init();

                selt.restart = new restart(selt);
                selt.restart.init();
                
                selt.gameOver = false;
            }
        })
    }

    this.loop = function() {
        selt.update();
        selt.draw();
        window.requestAnimationFrame(selt.loop);
    }

    this.update = function() {
        selt.bg.update();
        selt.bird.update();
        selt.ground.update();
        selt.pipe.update();
        selt.restart.update();
    }

    this.draw = function() {
        selt.bg.draw();
        selt.pipe.draw();
        selt.bird.draw();
        selt.ground.draw();
        selt.restart.draw();
    }

}

var g = new game();
g.init();
