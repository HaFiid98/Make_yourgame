
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
    Yspeed +=0.1 
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
        this.Bullet.style.top = `${this.shiPosition.y}px`;
        container.append(this.Bullet)
    }

    moveBullet(direction){
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
            // this.Enemys.style.position = "absolute";
            this.Enemys.style.left = `${this.x+ this.spawnPostion}px`;
            this.Enemys.style.top = `${this.y - this.spawnPostion}px`;
            this.spawnPostion += 5
            container.querySelector(".Enemy_container").append(this.Enemys)
        
    }   
     CheckCollision(bullet){

        if (this.Enemys ){
   if (this.Enemys.getBoundingClientRect().bottom>=bullet.getBoundingClientRect().y    &&
            this.Enemys.getBoundingClientRect().x <= bullet.getBoundingClientRect().x + bullet.getBoundingClientRect().width &&
        bullet.getBoundingClientRect().x <= this.Enemys.getBoundingClientRect().right
        ){
            this.Enemys
            if (!bullet.classList.contains("laserBeam")){
                bullet.remove()
            }
            let EMptyspace = document.createElement("div")
            EMptyspace.classList.add("Explotion")
            container.querySelector(".Enemy_container").replaceChild(EMptyspace,this.Enemys)
                     this.Enemys.remove()  
                      delete this.Enemys
                      
          score+=20
          setTimeout(() => {
            EMptyspace.classList.remove("Explotion")
          }, 400);
            document.querySelector('.scorebar .score').innerHTML = `${score} PTS`
           }
        }

        container.querySelector(".Pause p").innerHTML = `Your Current Score is:<br>${score || 0}PTS`

}

shoot(){
    if (this.Cooldown <= 0){
        ship.classList.remove("shipdmg")
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
       if (CheckColision(bullet1.Bullet,ship)){
health.classList.add("dmg")
ship.classList.add("shipdmg")
        bullet1.Bullet.remove()
     let lifePOs = getComputedStyle(document.documentElement).getPropertyValue("--health")     
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
 Array.from({length:12}, ()=>{
    console.log(index,  index % 5 === 0 );
    if (index % 5 === 0 ){
        AlienPosY-=100
        AlienPos = 0
    }
    let Alien = new Enemy(AlienPos,AlienPosY)
    AlienPos += 100
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
restart : document.createElement("img")
}

function move(){

let PauseOPtion =  Pause();
if (lifes ===0){
    GameOVER.element.classList.add("GameOVER")
    GameOVER.restart.classList.add("restart")
    GameOVER.restart.src = "lifes/restart.png"


    container.append(GameOVER.element, GameOVER.restart)
    container.style.filter = "grayscale(0.5)";
    // cancelAnimationFrame(id)
    
}
if (PauseOPtion !== "flex" && lifes !==0){

    let shipRect = ship.getBoundingClientRect();
    MoveEnemis(container.querySelector(".Enemy_container"))
    let containerRect = container.getBoundingClientRect();
    if (shipRect.left < containerRect.left) {
        shipPosition.x = 0;
    } else if (shipRect.right > containerRect.right) {
        shipPosition.x = containerRect.width - shipRect.width -20;
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
    if (parseInt(timer)%10 === 0){
        Yspeed +=2
    }
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
  
  var PauseMenu = container.querySelector(".Pause")
 function Pause(){
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

    container.querySelector(".Pause img").onclick = ()=>{
        keys.Pause = false
    }
  
    container.querySelectorAll(".restart")[0].onclick = ()=>{
        window.location.reload();
        
    }