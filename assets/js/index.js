$(document).ready(function(){
  init();
})

function init(){
  startGame();
  game();
  gameOver();
}

var clicked;
var levelSpeed;
var speed = 2000;
var score = 0;
var level = 1;
var changeLevelInt;

function game(){
  $('.gamecell').on('click', function(e){
    e.preventDefault();
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
      console.log(speed,'speed');
      speed-=500;
      if(speed<0){
        gameOver();
      }
      gameSpeed(speed)
    },20000);
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
    $('.gamecell').removeClass('active');
    clearInterval(changeLevelInt);
    clearInterval(levelSpeed);
  })

}


function startGame(){
  $('.start').on('click', function(e){
    e.preventDefault();
    level = 1;
    score = 0;
    speed = 2000;
    setScore(score);
    getLevel(level);
    console.log(level,score,speed);
    gameSpeed(speed);
    changeLevel();
  })
}
