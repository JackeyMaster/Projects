let scene;
let clouds = [];
let leftarm;
let dx = 0.01;
let wagner,coal,cursor,c;
window.onload = function(){
 scene = document.querySelector("a-scene");
 cursor = document.querySelector("a-cursor");
 wagner = document.querySelector("#wagner");
 coal = document.querySelector("#coal");
 fireplace = document.querySelector("#fireplace");

 coal.addEventListener("click",function(){
   c = coal.cloneNode(true);
   c.setAttribute("position",{x:0,y:0,z:-3})
   cursor.append(c)
   coal.remove();
 })
  wagner.addEventListener("click", function(){
  let text = document.createElement("a-text")
  let plane = document.createElement("a-plane")
  text.setAttribute("value", "Hello Traveler, what would you like me to craft for you today?")
  plane.setAttribute("src", "White.jpg")
  plane.setAttribute("position", {x: -101, y:16, z:235.5})
  plane.setAttribute("material", "side:double")
  plane.setAttribute("scale", {x:15, y:3, z:5})
  text.setAttribute("position", {x: -95, y:16, z:235})
  text.setAttribute("width", 12)
  text.setAttribute("height", 5)
  text.setAttribute("rotation", {x: 0, y:180, z:0})
  scene.append(plane)
  scene.append(text)
})
 leftarm = document.querySelector("#left");
 for(let i = 0; i < 150; i++){
   let x = rnd(-1000,500);
   let y = rnd(300,300);
   let z = rnd(-1000,500);
   let speed = rnd(1,5) / 100;
   let cloud = new Cloud(x,y,z,speed);
   clouds.push(cloud)
 }
 
 loop();

 setTimeout(loop,10);
}

function loop(){
  for(let cloud of clouds){
    cloud.move();
  }
 leftarm.object3D.rotation.x += dx;
 angle = leftarm.object3D.rotation.x
 if(angle > 1 || angle < 0){
   dx = -dx;
 }
  setTimeout(loop,10);
}


