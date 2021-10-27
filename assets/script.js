var userFormEl = document.querySelector('#user-form');
var recipeInputEl = document.querySelector('#recipe');
var recipesContainerEL = document.querySelector('#recipes-container');
var recipesSearchTerm = document.querySelector('#recipe-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var recipes = recipeInputEl.value.trim();

    if (recipes) {
      getUserRecipes(recipes);

      recipesContainerEL.textContent = '';
      recipeInputEl.value = '';
    } else {
        alert('Please enter a recipe');
    }
};

var getUserRecipes = function(searchUserInput) {
    var apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=1bccdbd99014422bbed7295eb22db074&query=${searchUserInput}`;

    fetch(apiURL)
      .then(function (response) {
        return response.json();
      }) 
      .then(function (data) {
        console.log(data)
        for(var i = 0; i < data.results.length; i++) {
          var recipeTitle = document.createElement('p');
          recipeTitle.textContent=data.results[i].title;
          recipesContainerEL.appendChild(recipeTitle);
        }
      })
      .catch(function (error) {
        alert('Unable to connect');
      });
};

userFormEl.addEventListener('submit', formSubmitHandler); 