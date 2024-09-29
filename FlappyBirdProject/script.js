// Specifies resources
let resources ={images:[{id:"day", src:"images/day.png"},
                {id:"bird", src:"images/bird.png"},
                {id:"bar", src:"images/bar.png"},
                {id:"ring", src:"images/ring2.png"},
                {id:"pipetop", src:"images/pipe_top.png"},
                {id:"pipebot", src:"images/pipe_bot.png"},
                {id:"gameover",src:"images/flappybird_end.png"},
                {id:"logo",src:"images/logo.png"}
                
                  ],
                 audios:[{id:"hit", src:"audios/hit.ogg"},
                         {id:"point", src:"audios/point.ogg"},
                         {id:"wing", src:"audios/wing.ogg"}
                
                
                  ]
                };

// Load resources and starts the game loop
function preload(){
    game = new Game("game");
    game.preload(resources);
    game.state = init;
    gameloop();
}
document.onload = preload();

// Controls the state of the game
function gameloop(){
  game.processInput()
  if(game.ready){
    game.state();
  }
  game.update()
  setTimeout(gameloop,20);
}

// Create game objects and perform any game initialization
function init(){
  day = new Sprite(game.images.day, game)
  game.setBackground(day)
  bird = new Animation(game.images.bird,3,game,132 / 3, 34)
  bar = new Animation(game.images.bar,3,game,700,110)
  bar.y = game.height - 50
  ring = new Animation(game.images.ring,64,game,512/8,512/8)
  ring.framerate = 1
  ring.x = game.width + 50
  ring.y = randint(175,325)
  ring.setVector(2,90)

  scorering = new Animation(game.images.ring,64,game,512/8,512/8)
  scorering.framerate = 1
  scorering.x = 40
  scorering.y = game.height - 40

  scorefont = new Font("30px","Comic Sans MS","brown","black")
 
  pipetop = new Sprite(game.images.pipetop,game)
  pipebot = new Sprite(game.images.pipebot,game) 
  
  logo = new Sprite(game.images.logo,game)
  logo.y -= 100
  gameover = new Sprite(game.images.gameover,game)

  hit = new Sound(game.audios.hit)
  point = new Sound(game.audios.point)
  wing = new Sound(game.audios.wing)

  game.state = startscreen;
}

// Game logic
function main(){
  game.scrollBackground("left",1)
  bird.draw()
  pipetop.moveTo(ring.x, ring.y - 175)
  ring.move()
  pipebot.moveTo(ring.x, ring.y + 175)
  bar.draw()
  scorering.draw()
  game.drawText(` X ${game.score}`,scorering.right + 5, scorering.y + 7, scorefont)

  if(key.pressed[key.space]){
    bird.y -= 2
    wing.play()
  }else{
    bird.y += 2
  }
  if(bird.collidedWith(bar)||bird.collidedWith(pipetop)||bird.collidedWith(pipebot)){
    hit.play()
    game.state = gameoverscreen;
  }
  if(bird.collidedWith(ring)){
    point.play()
    game.score +=1
    ring.visible = false
 }
 if(ring.x < -20){
  ring.x = game.width + 70
  ring.y = randint(175,325)
  ring.speed += 1
  ring.visible = true
 }

}
function startscreen(){
  game.scrollBackground("left",1)
  bird.draw()
  logo.draw()
  bar.draw()
  if(key.pressed[key.space]){
    game.state = main 
  }
  game.drawText(`press [Space] to begin`,game.width / 2 - 165,game.height - 40, scorefont)
}
function gameoverscreen(){
   gameover.draw()
   if(key.pressed[key.space]){
    game.state = main 
  }
  game.drawText()
  if(key.pressed[key.Y]){
    game.score = 0
    bird.x = game.width / 2
    bird.y = game.height / 2
    ring.x = game.width + 50
    ring.y = randint(175,325)
    ring.speed = 2
    ring.visible = true
    game.state = main 
  }
  game.drawText(`Play Again? [Y/N]`,game.width / 2 - 150,game.height - 40, scorefont)
}
 
