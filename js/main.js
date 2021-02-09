'use strict';

const input = document.querySelector ('.js-input');
const button = document.querySelector ('.js-button');
const result = document.querySelector ('.js-result');

//SEND DATA TO API
function handleSeries() {
    fetch(`//api.tvmaze.com/search/shows?q=${input.value}`)
      .then(response => response.json())
      .then(data => {
        result.innerHTML = '';
for( let i=0; i<data.length; i++) {
    result.innerHTML += `<li> <h2>${data[i].show.name}</h2><img src="existImg(${data[i].show.image})" alt = "Foto"/> </li>`}
      });
  }


  // CHECK IMAGE FROM API:
function existImg(photo) {
    if (photo !== null && photo.medium !== null) {
      return photo.medium;
    } else {
      return '//via.placeholder.com/210x295/de4242/FFC145/?text=SERIE';
    }
  }

button.addEventListener("click", handleSeries);