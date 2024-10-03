class Cloud{
  constructor(x,y,z,speed){
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.obj = document.createElement("a-entity");

    let position = 0;
    for(let i = 0; i < 3; i++){
      let puff = document.createElement("a-sphere");
      puff.setAttribute("radius", 8);
      puff.setAttribute("position",{ x:position, y:5, z: 5 });
      position += 7
      this.obj.append(puff);

    }

    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
    scene.append(this.obj);
  }
  
  move(){
    this.x += this.speed;
    this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z});
  }

}
 
