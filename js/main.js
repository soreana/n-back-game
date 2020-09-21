class GameState {
  constructor(){
    this.score = 0;
    this.clickEnabled = true;
    this.scoreHTML = document.getElementById("score");
  }

  scoreUp(){
    this.score ++;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
  }

  reset(){
    this.score = 0;
    this.clickEnabled = true;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
  }

  enableClick(){
    this.clickEnabled = true;
  }

  disableClick(){
    this.clickEnabled = false;
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

  generateEmptyPage(){
    let emptyPage = document.createElement("div");
    emptyPage.classList.add("page");
    return emptyPage;
  }

  flipPage(){
    const page = this.pages[this.pages.length - 3];

    // Flip page
    page.classList.add('flipped');
    page.nextElementSibling.classList.add('flipped');

    // Shift shapes
    this.previousShape = this.currentShape;
    this.currentShape = this.nextShap;

    // Remove page after transition
    page.addEventListener('transitionend', function (event) {
      if(event.elapsedTime === 1.4){
        gameState.enableClick();
      }
      setTimeout(function () {
        if(page.nextElementSibling !== null) {
          page.nextElementSibling.remove();
          page.remove();
        }
      }, 1000)
    }, false);

    this.generateNextPage();
  }

  backToFirsPage() {
    for (let i = this.pages.length-1; i >= 0 ; i --) {
      this.pages[i].classList.remove('flipped');
    }

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
    this.previousShape = this.currentShape;
    this.currentShape = this.nextShap;
    this.generateNextPage();
  }
}

const gameState = new GameState();
const book = new Book();


function restartGame() {
  book.backToFirsPage();
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
  gameState.disableClick();
  if ((book.currentShape === book.previousShape && answer === "yes")
      ||(book.currentShape !== book.previousShape && answer === "no")){
    gameState.scoreUp();
  }
  book.flipPage();
}

