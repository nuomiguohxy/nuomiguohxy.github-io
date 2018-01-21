// 这是我们的玩家要躲避的敌人 
var Enemy = function(ypos,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
        this.size=[101,83];
        this.x = 0;
        this.y = ypos-30;//敌人y轴坐标需要手动传入
        this.speed =speed;//敌人的速度值
    // 数敌人的图片或者雪碧图，用一个我们提供的工具函来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x>500){
        this.x=0;
    }
    this.x = this.x+this.speed*dt;

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var star = function(x){
    this.x = x;
    this.y = 0;
    this.speed = 200;
    this.sprite="images/Star.png";
};
star.prototype.update = function(dt){
    if(this.y>=0 && this.y<=415){
        this.y= this.y + this.speed*dt;
        console.log(this.y);
    }
};
star.prototype.render=function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var allplayers=function(){
        this.size=[101,83];
        this.x = 200;
        this.y = 405;
        this.sprite = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
        this.i=0;
};
allplayers.prototype.update = function(){

        if(this.x>400){
            this.x = 400;
        }
        if(this.x<0){
            this.x = 0;
        }
        if(this.y>405){
            this.y = 405;
        }
        if(this.y<0){
            this.y =0;
        }
        if(this.i<0){
            this.i=0;
        }
        if(this.i>4){
            this.i=4;

        }
};
allplayers.prototype.render = function(){
    if(game){
        ctx.drawImage(Resources.get(this.sprite[this.i]),this.x,this.y);
    }
  else{

        ctx.drawImage(Resources.get(this.sprite[this.i]),canvas.width/2-50,canvas.height/2-85);
        ctx.font="100px serif";
        ctx.fillstyle="#fff";
        ctx.strokeText("<",canvas.width/6,canvas.height/1.7);
        ctx.strokeText(">",canvas.width/4*3,canvas.height/1.7);

    }
};

allplayers.prototype.handleInput=function(key){
      switch(key){
          case 'left':
              if(game){
                  this.x = this.x-this.size[0];
              }
              else{
                    this.i-=1;
              }
              break;
          case 'up':
              if(game){
                  this.y = this.y-this.size[1];
                  console.log(this.y);
              }
              break;
          case 'down':
              if(game){
                  this.y = this.y+this.size[1];
              }
              break;
          case 'right':
              if(game){
                  this.x = this.x+this.size[0];
              }
            else{
                 this.i+=1;

              }
              break;
          case 'space':

              game=true;
              break;
          default:
              //this.x = this.size[0];
              //this.y = this.size[1];
              break;
      }
};
var player = new allplayers();
var allEnemies=[];
for(var i=1;i<5;i++){
  allEnemies.push(new Enemy(i*85.5,Math.random()*300));
}
var allstars=[];
for(i=0;i<5;i++)
{
    allstars.push(new star(i*101));
}







// 现在实例化你的所有对象
// 把所有敌的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里人面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode|| e.which]);
    //e.keyCode及e.which表示keyCode
});
