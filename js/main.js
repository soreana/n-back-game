class GameState {
  constructor(){
    this.started = false;
  }

  reset(){
    this.started = false;
  }

  start(){
    this.started = true;
  }
}

class Book {
  constructor() {
    this.pages = document.getElementsByClassName('page');
    this.shapes = ["circle", "triangle", "square"];
    this.currentPage = 0;
    this.currentShape = null;
    this.previousShape = null;

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
    let shapeName = Math.floor(Math.random() * this.shapes.length);
    shapeTag.classList.add(this.shapes[shapeName]);

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
  // todo fade out buttons
}

document.addEventListener('DOMContentLoaded', function(){
  book.generateNextPage();
  // setTimeout(startGame, 1000);
  // for(var i = 0; i < pages.length; i++)
  // {
  //   Or var page = pages[i];
  //   pages[i].pageNum = i + 1;
  //   pages[i].onclick=function() {
  //     if (this.pageNum % 2 === 0)
  //     {
  //       this.classList.remove('flipped');
  //       this.previousElementSibling.classList.remove('flipped');
  //     }
  //     else
  //     {
  //       this.classList.add('flipped');
  //       this.nextElementSibling.classList.add('flipped');
  //     }
  //   }
  // }
})


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
}

