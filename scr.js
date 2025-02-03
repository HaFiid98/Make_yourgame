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


//_____________________ ship __________________________________//
var  health =    document.querySelector(".scorebar .lifes img")
var ship = document.querySelector(".ship")
let bullets = []
let shipspeed = 10  ;
var lifes = 5
let shipPosition = {
    x: 0,
    y: 0
};
let keys = {
    left: false,
    right: false,
    bullet:false,
    super: false,
    Pause:false
};

//-------------------------------------------------------------//
var container = document.querySelector(".container")
var ContainerPos = container.getBoundingClientRect()
var score = 0;
var speed = 1
var Yspeed = 0
var xPos = 0
function MoveEnemis(EnemyCountainer){
    let position = EnemyCountainer.getBoundingClientRect()
    Yspeed +=0.4
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
        this.speed = 10
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
        if (container.getBoundingClientRect().y >= this.Bullet.getBoundingClientRect().y ||
        container.getBoundingClientRect().bottom<= this.Bullet.getBoundingClientRect().y
    ) {
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
        this.Cooldown = 500 * Math.random()
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
            if (!bullet.classList.contains("laserBeam")){
                bullet.remove()

            }

            setTimeout(async() => {
          
                     this.Enemys.remove()  
                      delete this.Enemys
                      }, 500);
          score+=20
            document.querySelector('.scorebar .score').innerHTML = `${score} PTS`
           }
        }
        container.querySelector(".Pause p").innerHTML = `Your Current Score is:<br>${score || 0}PTS`

}

shoot(){
    // if (   ship.classList.contains("shipdmg") ){
    //     ship.classList.remove("shipdmg")
    // }

    if (this.Cooldown <= 0){
        ship.classList.remove("shipdmg")
        // health.classList.remove("dmg")

        if (this.Enemys){
            let bullet = new Bullet({ x: this.Enemys.getBoundingClientRect().x + this.Enemys.offsetWidth/2, y: this.Enemys.getBoundingClientRect().bottom - this.Enemys.offsetWidth/2});  
        bullet.makeBullet();
        bullet.Bullet.style.background = `url('ezgif.com-effects.gif') center/cover no-repeat `
        this.EnemyBullet.push(bullet);
        this.Cooldown = 500
        }
    }
    if (this.Cooldown >= 0){
        this.Cooldown--
    }
        this.EnemyBullet.forEach(bullet1 =>{
        bullet1.moveBullet(1)
        console.log(CheckColision(bullet1.Bullet,ship));

       if (CheckColision(bullet1.Bullet,ship)){
health.classList.add("dmg")
ship.classList.add("shipdmg")
        bullet1.Bullet.remove()
     let lifePOs = getComputedStyle(document.documentElement).getPropertyValue("--health")
     console.log();
     
     document.documentElement.style.setProperty("--health",`${lifePOs.slice(0,lifePOs.length-1) -20}%` )
        lifes--
        console.log("liiiiiiiiiifes:", lifes);
        
       }
    })
}
}

var AlienPos = 10
var AlienPosY = 0
let Aliens = []
var index = 0
 Array.from({length:25}, ()=>{
    console.log(index,  index % 5 === 0 );
    if (index % 5 === 0 ){
        AlienPosY-=100
        AlienPos = 0
    }
    let Alien = new Enemy(AlienPos,AlienPosY)
    AlienPos += 80
    Aliens.push(Alien)
Alien.makeEnemy()
index++

})


document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        keys.left = true;
    } else if (event.code === "ArrowRight") {
        keys.right = true;
    }else if(event.code === "Space") {
        keys.bullet = true
 
    }else if (event.key == "s") {
       keys.super = true 
    }
});
document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
        keys.left = false;
    } else if (event.code === "ArrowRight") {
        keys.right = false;
    }else if(event.code === "Space") {
        keys.bullet = false
 
    }else if (event.key == "s") {
       keys.super = false 
    }
});

const  throttleKeys = throttle(()=>{
    let shipRect = ship.getBoundingClientRect();
    if (keys.bullet){
        const Bulletz = new Bullet(shipRect)
        Bulletz.makeBullet()
        bullets.push(Bulletz)
    }
    if (keys.super){
        console.log("jdflfdsfksdfkjsdljf");
        
        const Bulletz = new Bullet(shipRect)
        Bulletz.Bullet.classList.add('laserBeam')
        Bulletz.makeBullet()
        bullets.push(Bulletz)
    }
},170)

function CheckColision(obj1, obj2){
   const obj1post = obj1.getBoundingClientRect()
   const obj2post = obj2.getBoundingClientRect()

   if ( obj1post.bottom >= obj2post.top && 
    obj1post.x >= obj2post.x &&
     obj1post.right <= obj2post.right
   ){
return true
   }
   return false
}

const GameOVER = {
element : document.createElement("div"),
}

function move(){
// if (PauseOPtion === "block") {
//     console.log(PauseOPtion);
    
//     goto start;
// }

// PauseMenu : while(true){
// let PauseOPtion =  Pause();
// if (PauseOPtion === "block") continue PauseMenu
// break;
// }

let PauseOPtion =  Pause();

if (PauseOPtion !== "flex"){
    if (lifes ===0){
        GameOVER.element.classList.add("GameOVER")
        container.append(GameOVER.element)
        console.log("DKJQSDKLQSLDKJ");
        container.style.filter = "grayscale(0.5)";
        cancelAnimationFrame(id)
        
    }

    let shipRect = ship.getBoundingClientRect();
    MoveEnemis(container.querySelector(".Enemy_container"))
    let containerRect = container.getBoundingClientRect();
    if (shipRect.left < containerRect.left) {
        shipPosition.x = 0;
    } else if (shipRect.right > containerRect.right) {
        shipPosition.x = containerRect.width - shipRect.width;
    }
    if (keys.left) {
        shipPosition.x -= shipspeed;
    } 
    if (keys.right) {
        shipPosition.x += shipspeed;
    }
    ship.style.transform = `translateX(${shipPosition.x}px)`;
   throttleKeys()
   bullets.forEach(bullet =>{
    bullet.moveBullet(-1)
    Aliens.forEach(Alien =>  {
        Alien.CheckCollision(bullet.Bullet)
    })

  
})
Aliens.forEach(Alien => {
    Alien.shoot()
}); 
}

  const id = requestAnimationFrame(move);
  
}

    requestAnimationFrame(move);







function Timer(){
    let timer =      document.querySelector('.scorebar .timer').innerHTML
    timer = timer.slice(0, timer.length-1)
     document.querySelector('.scorebar .timer').innerHTML = `${parseInt(timer)+1}s`
}
setInterval(()=>{
    Timer()
}, 1000);

function throttle(func, delay) {
    let lastTime = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastTime >= delay) {
        func(...args);
        lastTime = now;
      }
    };
  }
  
 function Pause(){
    let PauseMenu = container.querySelector(".Pause")
    let displayValue = window.getComputedStyle(PauseMenu).display;
    console.log(displayValue);
    if (keys.Pause === true){
        PauseMenu.style.display = "flex"
        
    }else{
        PauseMenu.style.display = "none"
    }
    return PauseMenu.style.display 
    
 }
    document.querySelector(".scorebar .Pause_Menu").addEventListener("click", ()=>{
        keys.Pause = !keys.Pause
    })
  