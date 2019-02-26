//list that holds all cards

const cards = ['fa fa-bomb', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-diamond', 'fa fa-cube', 'fa fa-cube', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-leaf', 'fa fa-leaf'];

let openedArray = [];
let moves = 0;
let pairs = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//loop through each card and create its HTML
//add each card's HTML to the page

//show cards on grid 
function start() {

  let cardsGrid = document.querySelector('.deck');

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    //add icon
    card.innerHTML = `<i class="${cards[i]}"></i>`;
    cardsGrid.appendChild(card);

    click(card);
  }

}
// Display the cards on the page
//shuffle the list of cards 

shuffle(cards);
start();


//add event listener, display card and put in open, also compare cards 
//set up the event listener for a card.

 function click(card) {
  /* card click event */
  card.addEventListener("click", function () {
    const clickedCard = this;
  // // if cards match keep open and show else remove 
    openCard(clickedCard);
    addToOpen(clickedCard);

//when click add opened classes and push to opened array
//shows card
function openCard() {
  clickedCard.classList.add('open', 'show', "disabled");
}
//puts opened cards into opened array 
function addToOpen() {
  openedArray.push(clickedCard);

  if(openedArray.length == 2){
   match(clickedCard);
 }
}

  });
}

function match() {

  if (openedArray[0].innerHTML === openedArray[1].innerHTML) {
    openedArray[0].classList.add('match');
    openedArray[1].classList.add('match');
    pairs++;
    
    openedArray = [];

  } else {
    setTimeout(function () {
      openedArray[0].classList.remove("open", "show", "disabled");
      openedArray[1].classList.remove("open", "show", "disabled");
      openedArray = [];
    }, 555);
  }

  addMoves();
  win();
}

// add moves
const movesCounter = document.querySelector(".moves");
movesCounter.innerHTML = 0;

function addMoves() {

  if(moves == 0){
    startTimer();

    second = 0;
    minute = 0; 
    hour = 0;

  }

  moves++;
  movesCounter.innerHTML = moves;
  rating();
  
}

//rating system, gets and display stars, according to number of moves- delete stars
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML =
`<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

function rating() {
  if (moves <= 12) {
    //3stars
    starsContainer.innerHTML =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    `;
  } else if (moves < 24) {
    //2stars
    starsContainer.innerHTML =
    `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  } else {
    //1star
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`
  }
}

const cardsGrid = document.querySelector('.deck');


function start() {

  const cardsGrid = document.querySelector('.deck');
//create cards 
for (let i = 0; i < cards.length; i++) {
  const card = document.createElement('li');
  card.classList.add('card');
    //add icon
    card.innerHTML = `<i class="${cards[i]}"></i>`;
    cardsGrid.appendChild(card);

    click(card);
  }
  //  show timer
  let timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
}

//show  modal
const modal = document.getElementById('theModal');

//  <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//when to show modal
function win() {
  if (pairs == 8) {

    clearInterval(interval);
    finalTime = timer.innerHTML;
    const starRating = document.querySelector(".stars").innerHTML;
    const finalMove = document.querySelector(".moves").innerHTML;
    const totalTime = document.querySelector(".timer").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves ;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    modal.style.display = "block";
  }
}

//button to close  modal 
span.onclick = function () {
  modal.style.display = "none";
}

//when click on window close modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function reset() {

  //delete all cards
  cardsGrid.innerHTML = "";

  //reset any related variables 
  moves = 0;
  movesCounter.innerHTML = moves;
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>   
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`
  //reset timer
  pairs = 0; 
  clearInterval(interval);


  const timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  //recreate and shuffle cards 

  shuffle(cards);

  start();

}

//game timer
let second = 0, minute = 0, hour= 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+"mins "+second+"secs";
    second++;
    if(second == 60){
      minute++;
      second = 0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  },1000);
}









