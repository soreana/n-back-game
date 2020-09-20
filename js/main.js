let pages = document.getElementsByClassName('page');

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

    for(let i = 0; i < this.pages.length; i++)
    {
      let page = this.pages[i];
      if (i % 2 === 0)
      {
        page.style.zIndex = (this.pages.length - i).toString();
      }
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
    this.currentPage = 0;
  }
}

const gameState = new GameState();
const book = new Book();

let current_shape = null;
let previous_shape = null;

function restartGame() {
  for (let i = pages.length-1; i >= 0 ; i --) {
    pages[i].classList.remove('flipped');
  }

  // remove all pages
  setTimeout(function (){
    for (var i = pages.length -1 ; i > 0 ; i--)
      pages[i].remove();
    book.generateNextPage();
  }, 1000);

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

