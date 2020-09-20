var pages = document.getElementsByClassName('page');
for(var i = 0; i < pages.length; i++)
{
  var page = pages[i];
  if (i % 2 === 0)
  {
    page.style.zIndex = (pages.length - i);
  }
}

function restartGame() {
  for (var i = pages.length-1; i >= 0 ; i --) {
    pages[i].classList.remove('flipped');
  }

  // remove all pages
  setTimeout(function (){
    for (var i = pages.length -1 ; i > 1 ; i--)
      pages[i].remove();
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function(){
  generateNextPage();
  setTimeout(startGame, 1000);
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

const shapes = ["circle", "triangle", "square"];
let gameModeEnabled = false;
let current_shape = null;
let previous_shape = null;

let current_page = 0;

function startGame(){
  pages[current_page].classList.add('flipped');
  pages[current_page].nextElementSibling.classList.add('flipped');
  current_page +=2;
  gameModeEnabled = true;
  generateNextPage();
}

function removeLastPage() {

}

function flipBackward(){
  removeLastPage();
}

function flip_page () {
  if (! gameModeEnabled ){
    return;
  }
  pages[current_page].classList.add('flipped');
  pages[current_page].nextElementSibling.classList.add('flipped');
  current_page +=2;
  generateNextPage();
}

function generateEmptyPage(){
  let emptyPage = document.createElement("div");
  emptyPage.classList.add("page");
  return emptyPage;
}

function generateShape(){
  let shapeTag = document.createElement("div");
  let shape = Math.floor(Math.random() * shapes.length);
  shapeTag.classList.add(shapes[shape]);

  return shapeTag;
}

function generateNextPage(){
  let firstPage = generateEmptyPage();
  let secondPage = generateEmptyPage();
  secondPage.style.zIndex = -1 * current_page;
  let shape = generateShape();
  secondPage.appendChild(shape);

  let element = document.getElementById("pages");
  element.appendChild(firstPage)
  element.appendChild(secondPage)
}
