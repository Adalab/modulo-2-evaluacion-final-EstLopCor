'use strict';

//ARRAYS
let series = [];
let favorites = [];

//CONSTANTS
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const seriesBoxList = document.querySelector('.js-series-list');
const favBoxList = document.querySelector('.js-fav-list');
const resetFavButton = document.querySelector('.js-reset-fav-button');

//FUNCTIONS

//CONNECT TO API
function handlerClickButton() {
  getFromLocalStorage();
  fetch(`//api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      paintSeries();
    });
}

//PAINT SERIES
function paintSeries() {
  let htmlCode = '';
  for (let i = 0; i < series.length; i++) {
    htmlCode += `<li class="box-results js-box-results" id="${series[i].show.id}">`;
    if (series[i].show.image === null) {
      htmlCode += `<div><img src="//via.placeholder.com/210x295/ffffff/666666/?text=TV" class="image-result js-image-result"></div>`;
    } else {
      htmlCode += `<div class="box-image"><img src=${series[i].show.image.medium} class="image-result js-image-result"></div>`;
    }
    htmlCode += `<h3 class="title-result js-title-result">${series[i].show.name}</h3>`;
    htmlCode += `</li>`;
  }
  seriesBoxList.innerHTML = htmlCode;
  liListener();
}

//ADD TO FAVORITES, CHANGE STYLE AND ARRAY 
function addToFavList(ev) {
  const id = ev.currentTarget.id;
  const serie = findSerie(id, series);
  if (findSerie(id, favorites)) {
    ev.currentTarget.classList.remove('change-color');
    favorites.splice(favorites.indexOf(serie), 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    ev.currentTarget.classList.add('change-color');
    saveFavorite(serie);
  }
}

//FIND SERIE TRHOW ID
function findSerie(id, series) {
  //THE ID IS A STRING, SO WE PARSEIN
  id = parseInt(id);
  return series.find((serie) => serie.show.id === id);
}

//ADD TO ARRAY AND TO LOCAL STORAGE
function saveFavorite(serie) {
  favorites.push(serie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
//PINT FAVOURITES
function paintFavorites() {
  let htmlCode = '';
  for (let i = 0; i < favorites.length; i++) {
   
    htmlCode += `<li class="box-results-fav js-box-results" id="${favorites[i].show.id}">`;
    htmlCode += `<button type="button" class="clear-btn js-clear-btn">X</button>`;
    if (favorites[i].show.image === null) {
      htmlCode += `<div class="box-image"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class=" js-image-result img-fav"></div>`;
    } else {
      htmlCode += `<div class="box-image"><img src=${favorites[i].show.image.medium} class="image-result js-image-result img-fav"></div>`;
    }
    htmlCode += `<h3 class="title-result js-title-result h3-fav">${favorites[i].show.name}</h3>`;
    htmlCode += `</li>`;
  }
  favBoxList.innerHTML = htmlCode;
  removeFromFavList();
}
//REMOVE FAVOURITES ONE TO ONE
function removeFromList(ev) {
  const id = ev.currentTarget.parentElement.id;
  const serie = findSerie(id, favorites);
  favorites.splice(favorites.indexOf(serie), 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  favBoxList.removeChild(ev.currentTarget.parentElement);
  paintFavorites();
}


//REMOVE ALL FAVOURITES AND RESET DE LOCAL STORAGE
function resetFav() {
  favBoxList.innerHTML = '';
  favorites = [];
  localStorage.removeItem('favorites');
  getFromLocalStorage();
}

//GET FROM LOCAL STORAGE
function getFromLocalStorage() {
  if (JSON.parse(localStorage.getItem('favorites'))) {
    favorites = JSON.parse(localStorage.getItem('favorites'));

    for (const favorite of favorites) {
      paintFavorites(series);
    }
  } else {
    favBoxList.innerHTML = '';
    localStorage.removeItem('favorites');
  }
}

removeFromFavList();
getFromLocalStorage();

//LISTENERS
searchBtn.addEventListener('click', handlerClickButton);
resetFavButton.addEventListener('click', resetFav);

function liListener() {
  const fav = document.querySelectorAll('.js-box-results');
  for (const elem of fav) {
    elem.addEventListener('click', addToFavList);
    elem.addEventListener('click', paintFavorites);
  }
}

function removeFromFavList() {
  const resetFavSerie = document.querySelectorAll('.js-clear-btn');
  for (const elem of resetFavSerie) {
    elem.addEventListener('click', removeFromList);
  }
}
