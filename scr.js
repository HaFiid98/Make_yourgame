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
var ContainerPos = container.getBoundingClientRect()

var score = 0;
var speed = 1
var Yspeed = 0
var xPos = 0

function MoveEnemis(EnemyCountainer){
    let position = EnemyCountainer.getBoundingClientRect()
    Yspeed +=1
  if (position.right >= ContainerPos.right) {
    speed = (speed) * -1; 
}
if (position.left <= ContainerPos.left) {
    speed = Math.abs(speed);
}


xPos += speed;  
    EnemyCountainer.style.transform= `TranslateX(${xPos}px) TranslateY(${Yspeed}px)`
    

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
        container.append(this.Bullet)
    }

    moveBullet(direction){
        // const bullet = document.querySelector("#a")
        // console.log("dshfksjdfhsd", bullet);
        // console.log("trueeeeeeeeeeeeeeeeeeee", this.Bullet.getBoundingClientRect(), container.getBoundingClientRect().y);
        if (container.getBoundingClientRect().y >= this.Bullet.getBoundingClientRect().y){
            this.Bullet.remove()

        }
        this.Bullet.style.transform =  `translateY(${this.TransalteY}px)`
        this.TransalteY += this.speed *direction
 
    }
}
class Enemy extends Bullet{
    constructor(x,y){
        super({x,y});
        this.TransalteY = 0;
        this.speed = 10
        this.x = x;
        this.y = y;
        this.spawnPostion = 0
        this.Enemys = document.createElement("div")
        this.EnemyBullet = []
   
        
    }
    makeEnemy(){
            this.Enemys.classList.add('Enemy')
            this.Enemys.style.position = "absolute";
            this.Enemys.style.left = `${this.x+ this.spawnPostion}px`;
            // this.Bullet.style.transform =  `translateX(${this.shiPosition.x+1}}px)`
            this.Enemys.style.top = `${this.y - this.spawnPostion}px`;
            this.spawnPostion += 5
            container.querySelector(".Enemy_container").append(this.Enemys)
        
    }   
     CheckCollision(bullet){
        // console.log(this.Enemys.getBoundingClientRect().y, bullet);
        
        // console.log(this.Enemys.getBoundingClientRect().y, bullet.getBoundingClientRect().y);
        if (this.Enemys ){
   if (this.Enemys.getBoundingClientRect().bottom>=bullet.getBoundingClientRect().y    &&
            this.Enemys.getBoundingClientRect().x <= bullet.getBoundingClientRect().x + bullet.getBoundingClientRect().width &&
        bullet.getBoundingClientRect().x <= this.Enemys.getBoundingClientRect().right
        ){
            this.Enemys.classList.add("Explotion")
                score += 20
                container.querySelector('.score').innerHTML = `${score} PTS`
                this.Enemys.remove()
                // bullet.remove()

                 delete this.Enemys

            console.log("trueeeeeeeeeeeeeee");
        
        
    }
        }
     
}
shoot(){
    const bullet = new Bullet({ x: this.x + this.spawnPostion, y: this.y + this.spawnPostion });
    bullet.makeBullet();
    bullet.moveBullet(1)
    this.EnemyBullet.push(bullet);
}
}

var AlienPos = 10
let Aliens = []
 Array.from({length:9}, ()=>{
    let Alien = new Enemy(AlienPos,10)
    AlienPos += 90
    Aliens.push(Alien)
Alien.makeEnemy()
})

var ship = document.querySelector(".ship")
let bullets = []
let shipspeed = 30;
let shiPosition = {
    x:0,
    y:0
}
function move(){

    MoveEnemis(container.querySelector(".Enemy_container"))


    let position =  ship.getBoundingClientRect()
   document.onkeydown = (event)=>{
    if (event.code === "ArrowLeft") {
        shiPosition.x -= shipspeed; 
    } else if (event.code === "ArrowRight") {
        shiPosition.x += shipspeed;
    }
    ship.style.transform =  `translateX(${shiPosition.x}px)`

   if (event.code == "Space"){
    const Bulletz = new Bullet(position)
    Bulletz.makeBullet()
    bullets.push(Bulletz)
   }
   if (event.key == "s"){
    const Bulletz = new Bullet(position)
    Bulletz.Bullet.classList.add('laserBeam')
    
    Bulletz.makeBullet()
    // Bulletz.Bullet.style.width = '1O0vw'
    // Bulletz.Bullet.style.height = '1O0vh'

    bullets.push(Bulletz)
   }
   }

   bullets.forEach(bullet =>{
    bullet.moveBullet(-1)
    Aliens.forEach(Alien =>  {
        Alien.CheckCollision(bullet.Bullet)
    })
})  
   requestAnimationFrame(move);
}
    requestAnimationFrame(move);

    setInterval(() => {
        Aliens.forEach(Alien => {
            Alien.shoot()
        });   
    }, 1000);

function Timer(){
    let timer = container.querySelector('.timer').innerHTML
    timer = timer.slice(0, timer.length-1)
     container.querySelector('.timer').innerHTML = `${parseInt(timer)+1}s`
}
setInterval(()=>{
    Timer()
}, 1000);