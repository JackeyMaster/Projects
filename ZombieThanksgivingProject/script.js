// Specifies resources
let resources = {images:[
                         {id:"bk", src:"images/Zbk.jpg"},
                         {id:"turkey", src:"images/turkey.gif"},
                         {id:"zombie", src:"images/zombie.png"},
                         {id:"crosshair", src:"images/crosshair.png"},
                         {id:"logo", src:"images/logo.png"}
                  ],
                 audios:[ 
                         {id:"gun", src:"audios/Gun.wav"},
                         {id:"gobble", src:"audios/TurkeyGobble.wav"},
                         {id:"chomp", src:"audios/ZombieChomp.wav"},
                         {id:"die", src:"audios/ZombieDie.wav"}
                  ],
           
                  
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
  setTimeout(gameloop,10);
}

// Create game objects and perform any game initialization
function init(){
  bk = new Sprite(game.images.bk, game)
  bk.scale = 0.50
  turkey = new Sprite(game.images.turkey, game)
  turkey.scale = 0.40
  turkey.setVector(2,45)
  zombie = new Sprite(game.images.zombie, game)
  zombie.scale = 0.15
  zombie.setVector(2,-45)
  crosshair = new Sprite(game.images.crosshair, game)
  crosshair.scale = 0.3
  logo = new Sprite(game.images.logo, game)
  f =  new Font("28pt", "Arial", "white", "black")
  gun = new Sound(game.audios.gun)
  gobble = new Sound(game.audios.gobble)
  chomp = new Sound(game.audios.chomp)
  die = new Sound(game.audios.die)
  game.state = startScreen;
}
function startScreen(){
  bk.draw()
  logo.draw()
  game.drawText("Click the left mouse button to begin", game.width / 2 - 300, game.height - 150,f)
  if(mouse.leftClick){
    gun.play()
    game.state = main
  }
}
// Game logic
function main(){
 bk.draw()
 turkey.move(true)
 zombie.move(true)
 crosshair.moveTo(mouse.x, mouse.y)
 console.log(mouse)
 if(zombie.collidedWith(turkey)){
   chomp.play()
   gobble.play()
   turkey.health -= 5
   turkey.moveTo( randint(100,860), randint(100,500) )
 }
 game.drawText(turkey.health,turkey.x,turkey.y + 100, f)
 if(zombie.collidedWith(mouse) && mouse.leftClick ){
   die.play()
   zombie.health -= 10
   zombie.speed += 1
   zombie.moveTo( randint(100,860), randint(100,500) )
 }
 if(mouse.leftClick){
   gun.play()
 }
 game.drawText(zombie.health,zombie.x,zombie.y + 120, f)
 if(turkey.health < 0 || zombie.health < 0){
  game.state = gameOver;
 }
}


function gameOver(){
  bk.draw()
  game.drawText("Game Over",game.width / 2 - 200, game.height / 2,new Font("70pt", "Arial", "white", "black"))
  if(turkey.health < 0 ){
    game.drawText("You Lose",game.width /  2 - 150, game.height / 2 + 100, new Font("50pt", "Arial", "red", "black"))
  }else{
    game.drawText("You Win",game.width /  2 - 150, game.height / 2 + 100, new Font("50pt", "Arial", "green", "black"))
  }
}
