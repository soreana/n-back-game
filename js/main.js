function whichTransitionEvent(){
  const el = document.createElement('fakeelement');
  const transitions = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'MSTransition': 'msTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionEnd'
  };

  for(let t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}

class GameState {
  constructor(){
    this.score = 0;
    this.clickEnabled = true;
    this.speedUpdateTreshHold = 3;
    this.gameSpeed = 0.7;
    this.tutorial = true;
    this.scoreHTML = document.getElementById("score");
  }

  scoreUp(){
    this.score ++;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
  }

  reset(){
    this.score = 0;
    this.clickEnabled = true;
    this.speedUpdateTreshHold = 3;
    this.gameSpeed = 0.7;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
  }

  enableClick(){
    this.clickEnabled = true;
  }

  disableClick(){
    this.clickEnabled = false;
  }

  increaseSpeed() {
    this.gameSpeed = this.gameSpeed - 0.1;
  }

  updateSpeed(){
    if(this.score > this.speedUpdateTreshHold){
        this.increaseSpeed();
        this.speedUpdateTreshHold += 3;
    }
  }
}

const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

String.prototype.toPersianDigits = function () {
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

class Book {
  constructor() {
    this.pages = document.getElementsByClassName('page');
    this.shapes = ["circle", "triangle", "square"];
    this.zIndex = 0;
    this.currentShape = null;
    this.previousShape = null;
    this.nextShap = null;

    for(let i = 0; i < this.pages.length; i+=2)
    {
      this.pages[i].style.zIndex = (this.pages.length - i).toString();
    }
  }

  generateNextPage(){
    let firstPage = this.generateEmptyPage();
    let secondPage = this.generateEmptyPage();
    secondPage.style.zIndex = this.zIndex.toString();
    this.zIndex --;
    let shape = this.randomShape();
    secondPage.appendChild(shape);

    let element = document.getElementById('pages');
    element.appendChild(firstPage);
    element.appendChild(secondPage);
  }

  randomShape(){
    let shapeTag = document.createElement("div");
    this.nextShap = Math.floor(Math.random() * this.shapes.length);
    shapeTag.classList.add(this.shapes[this.nextShap]);

    return shapeTag;
  }

  generatePopup(message, id){
    let popup = document.createElement("div");
    popup.classList.add("popup");
    let popupText = document.createElement("span");
    popupText.innerHTML = message;
    popupText.classList.add("popuptext");
    popupText.id = id;
    popup.appendChild(popupText);

    return popup;
  }

  generateEmptyPage(){
    let emptyPage = document.createElement("div");
    emptyPage.classList.add("page");
    return emptyPage;
  }

  flipPage( firstPageSpeed, secondPageSpeed ){
    const page = this.pages[this.pages.length - 3];

    // Flip page
    page.style.transition = "transform " + firstPageSpeed + "s";
    page.previousElementSibling.style.transition = "background " + secondPageSpeed + "s";
    page.classList.add('flipped');
    page.nextElementSibling.classList.add('flipped');

    // Shift shapes
    this.previousShape = this.currentShape;
    this.currentShape = this.nextShap;

    // Remove page after transition

    page.addEventListener('transitionend', function (event) {
      console.log("here");
      if (gameState.tutorial){
        document.getElementById("secondPopup").classList.add("show");
        gameState.tutorial = false;
      }
      let elapsedTime = Number((event.elapsedTime).toFixed(1));
      if(elapsedTime === gameState.gameSpeed * 2 || elapsedTime === (gameState.gameSpeed + 0.1) * 2){
        gameState.enableClick();
      }
      setTimeout(function () {
        if(page.nextElementSibling !== null) {
          page.nextElementSibling.remove();
          page.remove();
        }
      }, 1000)
    });

    this.generateNextPage();
  }

  backToFirstPage() {
    for (let i = this.pages.length-1; i >= 0 ; i --) {
      this.pages[i].classList.remove('flipped');
    }

    let page = this.pages[0];
    page.style.transition = "";
    page.nextElementSibling.style.transition = "";

    // remove all pages
    setTimeout(function (){
      for (let i = this.pages.length -1 ; i > 0 ; i--)
        this.pages[i].remove();
      book.generateNextPage();
    }, 1000);
  }

  flipCover() {
    let page = this.pages[0];
    page.classList.add('flipped');
    page.nextElementSibling.classList.add('flipped');

    if(gameState.tutorial) {
      let popup = this.generatePopup("Keep this shape in your mind, and click one of the below button.", "firstPopup");
      this.pages[2].appendChild(popup);

      page.addEventListener('transitionend', function (event) {
        if(gameState.tutorial){
          document.getElementById("firstPopup").classList.add("show");
        }
      });
    }

    this.previousShape = this.currentShape;
    this.currentShape = this.nextShap;
    this.generateNextPage();

    if(gameState.tutorial) {
      let secondPopup = this.generatePopup("Is this picture the same as the previous one?", "secondPopup");
      this.pages[4].appendChild(secondPopup);
    }
  }
}

const gameState = new GameState();
const book = new Book();


function restartGame() {
  book.backToFirstPage();
  gameState.reset();
  fadeOutButtons();
}

document.addEventListener('DOMContentLoaded', function(){
  book.generateNextPage();
})


function fadeOutButtons(){
  let buttons = document.getElementsByClassName('button-cls');
  for (let button of buttons){
    button.classList.add("fade-out");
    button.addEventListener('webkitAnimationEnd',function( event ) {
      button.style.visibility = 'hidden';
      } , false);
  }
}

function fadeInButtons(){
  let buttons = document.getElementsByClassName('button-cls');
  for (let button of buttons){
    button.classList.add("fade-in");
    button.style.visibility = "visible";
  }
}

function startGame(){
  book.flipCover();
  fadeInButtons();
}

function userAction (answer) {
  if (!gameState.clickEnabled){
      return
  }

  console.log(gameState.tutorial);

  if(gameState.tutorial){
    document.getElementById("firstPopup").classList.remove("show");
    document.getElementById("secondPopup").classList.remove("show");
  }

  gameState.disableClick();
  if ((book.currentShape === book.previousShape && answer === "yes")
      ||(book.currentShape !== book.previousShape && answer === "no")){
    gameState.scoreUp();
  }
  book.flipPage(gameState.gameSpeed *2 , gameState.gameSpeed);

  gameState.updateSpeed();
}

