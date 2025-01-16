// var ship = document.querySelector(".ship")
// console.log(ship);

// function move(){
//    let position =  ship.getBoundingClientRect()
//    console.log("jkdshfsdkjfkj");
// document.addEventListener("keydown", ()=>{
//     ship.style.color = "black"
//     console.log("ljsdfklsdflkj");
//     ship.style.transform =  `translateX(${10}px)`
//     requestAnimationFrame(move);
// }
// )
// }

// class ball{
//     constructor(x){
//         this.x = x
//         this.y = y
//         this.ball = document.createElement("div")
//     }
//     // move(){
//     //     this.ball.style.top= x
//     // }
// }

// const ball = new ball(7)
var container = document.querySelector(".container")
class Enemy{
    constructor(x,y){
        this.TransalteY = 0
        this.speed = 5
        this.x = x;
        this.y = y;
        this.Enemys = document.createElement("div")
    }
    makeEnemy(Number){
        for (let index = 0; index <= Number; index++) {
            this.Enemys.classList.add('Enemy')
            this.Enemys.style.position = "absolute";
            this.Enemys.style.left = `${this.x}px`;
            // this.Bullet.style.transform =  `translateX(${this.shiPosition.x+1}}px)`
            this.Enemys.style.top = `${this.y}px`;
            container.append(this.Enemys)
        }
    }   
     CheckCollision(bullet){
        console.log(this.Enemys.getBoundingClientRect().y, bullet);
        
        // console.log(this.Enemys.getBoundingClientRect().y, bullet.getBoundingClientRect().y);
        if (this.Enemys.getBoundingClientRect().y>= bullet.getBoundingClientRect().y){
            console.log("djkfdskf");

            this.Enemys.remove()
            bullet.remove()
            cancelAnimationFrame(AnimationId)
            
    }
   AnimationId =  requestAnimationFrame(()=>this.CheckCollision(bullet));
}
}
class Bullet{
    constructor(shiPosition){
        this.TransalteY = 0
        this.speed = 5
        this.shiPosition = shiPosition;
        this.Bullet = document.createElement("div")
    }

    makeBullet(){ 
        this.Bullet.classList.add('bullet')
        this.Bullet.style.position = "absolute";
        this.Bullet.style.left = `${this.shiPosition.x+1}px`;
        // this.Bullet.style.transform =  `translateX(${this.shiPosition.x+1}}px)`

        this.Bullet.style.top = `${this.shiPosition.y}px`;
        document.body.append(this.Bullet)
    }

    moveBullet(){
        // const bullet = document.querySelector("#a")
        // console.log("dshfksjdfhsd", bullet);
        // console.log("trueeeeeeeeeeeeeeeeeeee", this.Bullet.getBoundingClientRect(), container.getBoundingClientRect().y);
        if (container.getBoundingClientRect().y >= this.Bullet.getBoundingClientRect().y){
            this.Bullet.remove()

        }
        this.Bullet.style.transform =  `translateY(${this.TransalteY}px)`
        this.TransalteY -= this.speed
        requestAnimationFrame(()=>this.moveBullet());
 
    }
}
let Alien = new Enemy(10,10)
Alien.makeEnemy(1)
var ship = document.querySelector(".ship")
console.log(container.getBoundingClientRect());
function move(){

    let position =  ship.getBoundingClientRect()
   window.onkeydown = (event)=>{
    let direction = event.key === "ArrowLeft" ? position.x -50 :  event.key === "ArrowRight" ?  position.x  -25 : 0 
   if (direction !== 0){
    ship.style.transform =  `translateX(${direction}px)`
   }

   if (event.key === "ArrowUp"){
    var Bulletz = new Bullet(position)
    Bulletz.makeBullet()
    Bulletz.moveBullet()
    
   }
//    console.log(Bulletz.Bullet.getBoundingClientRect().y);
   Alien.CheckCollision(Bulletz.Bullet)

   }

   requestAnimationFrame(move);
}
    requestAnimationFrame(move);


