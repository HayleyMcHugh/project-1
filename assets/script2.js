var userFormEl = document.querySelector('#user-form');
var wineInputEl = document.querySelector('#wine');
var wineContainerEL = document.querySelector('#wine-container');
var wineSearchTerm = document.querySelector('#nutrition-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var wine = wineInputEl.value.trim();

    if (wine) {
      getWine(wine);

      wineContainerEL.textContent = '';
      wineInputEl.value = '';
    } else {
        alert('Please enter a food item');
    }
};

var getWine = function(searchUserInput) {
    var apiURL = `https://api.spoonacular.com/food/wine/pairing?apiKey=1bccdbd99014422bbed7295eb22db074&food=${searchUserInput}`;

    fetch(apiURL)
      .then(function (response) {
        return response.json();
      }) 
      .then(function (data) {
        console.log(data)
        for(var i = 0; i < data.results.length; i++) {
          var wineTitle = document.createElement('p');
          wineTitle.textContent=data.results[i].title;
          wineContainerEL.appendChild(wineTitle);
        }
      })
      .catch(function (error) {
        alert('Unable to connect');
      });
};

userFormEl.addEventListener('submit', formSubmitHandler); 