$(document).ready(function(){
  init();
  document.onmousemove = updateAvatarPosition;
})


function init(){
  startGame();
  game();
  gameOver();
}

var clicked;
var levelSpeed;
var startSpeed = 1500;
var speed = startSpeed;
var score = 0;
var level = 1;
var changeLevelInt;

function game(){
  console.log('game');
  $('.gamecell').on('click', function(e){
    e.preventDefault();
    console.log('click');
    let getCell = $(this);
    if($(getCell).hasClass('active')){
      if(!clicked){
        $(getCell).addClass('smashed');
        score++;
        setScore(score);
        clicked = true
      }

    }

  })
}


function random(){
  return Math.floor(Math.random() * 3) + 1;
}

function getRandomCell(){
  $('.gamecell').removeClass('active');
  $('.gamecell').removeClass('smashed');

  let randRow = random();
  let randCol = random();
  let $activeCell = randRow + '-' + randCol;
  $('.'+ $activeCell).addClass('active')
  return $activeCell;
}

function gameSpeed(speed){
  levelSpeed = setInterval(function () {
        getRandomCell();
        clicked = false;
    },speed);
}

function changeLevel(){
  changeLevelInt = setInterval(function () {
      clearInterval(levelSpeed);
      level++;
      getLevel(level)
      speed-=Math.floor(speed*0.18)
      console.log(speed,'speed');
      if(speed<=350){
        $('.gamecell').removeClass('active');
        clearInterval(changeLevelInt);
        clearInterval(levelSpeed);
        return;
      }
      gameSpeed(speed)
    },10000);
}


function setScore(score){
  $('.score-number').html(score);
}

function getLevel(level){
  $('.level-number').html(level)
}

function gameOver(){
  $('.stop').on('click', function(e){
    e.preventDefault();
    $("#swatter").css('display', 'none');
    $('.gamecell').removeClass('active');
    clearInterval(changeLevelInt);
    clearInterval(levelSpeed);
  })

}


function startGame(){
  $('.start').on('click', function(e){
    e.preventDefault();
    $("#swatter").css('display', 'inline-block');
    $('.gamecell').removeClass('active');
    clearInterval(changeLevelInt);
    clearInterval(levelSpeed);
    level = 1;
    score = 0;
    speed = startSpeed;
    setScore(score);
    getLevel(level);
    console.log(level,score,speed);
    gameSpeed(speed);
    changeLevel();
  })
}


function updateAvatarPosition(e)
{
    $("#swatter").css({"left" : e.pageX-100, "top" : e.pageY});
}
