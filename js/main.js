class GameState {
  constructor(){
    this.score = 0;
    this.scoreHTML = document.getElementById("score");
  }

  scoreUp(){
    this.score += 10;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
  }

  reset(){
    this.score = 0;
    this.scoreHTML.innerHTML = this.score.toString().toPersianDigits();
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
    this.currentPage = 0;
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
    secondPage.style.zIndex = (-1 * this.currentPage).toString();
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
    this.pages[this.currentPage].classList.add('flipped');
    this.pages[this.currentPage].nextElementSibling.classList.add('flipped');
    this.currentPage +=2;
    this.previousShape = this.currentShape;
    this.currentShape = this.nextShap;
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
    this.currentPage = 0;
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
  book.flipPage();
  fadeInButtons();
}

function userAction () {
  book.flipPage();
  // todo check user input
  gameState.scoreUp();
}

