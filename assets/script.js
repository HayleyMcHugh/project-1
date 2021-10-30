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

var getUserRecipes = function (searchUserInput) {
  var apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=1bccdbd99014422bbed7295eb22db074&query=${searchUserInput}&addRecipeInformation=true`;

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.results.length; i++) {
        var recipeTitle = document.createElement('p');
        var recipeTitleData = data.results[i].title;
        var recipeImg = document.createElement('img');
        var recipeImgData = data.results[i].image
        var recipeLink = document.createElement('a');
        var recipeLinkData = data.results[i].sourceUrl;
        var saveRecipeBtn = document.createElement('button');
        recipeTitle.textContent= recipeTitleData;
        recipeImg.setAttribute("src", recipeImgData);
        recipeLink.setAttribute("href", recipeLinkData);

        recipesContainerEL.appendChild(recipeTitle);
        recipeLink.appendChild(recipeImg);
        recipesContainerEL.appendChild(recipeLink);
        
        saveRecipeBtn.setAttribute("data-title", data.results[i].title);
        saveRecipeBtn.setAttribute("data-image", data.results[i].image);
        saveRecipeBtn.setAttribute("data-link", data.results[i].sourceUrl);
        saveRecipeBtn.textContent = "Save Recipe";
        saveRecipeBtn.classList.add('btn');
        recipesContainerEL.appendChild(saveRecipeBtn);

        saveRecipeBtn.addEventListener('click', event => {
          event.preventDefault();
          var recipeTitle = event.target.getAttribute('data-title');
          var recipeImage = event.target.getAttribute('data-image');
          var recipeLink = event.target.getAttribute('data-link');
          
          var localRecipe = [];
          localRecipe.push(recipeTitle, recipeImage, recipeLink);
          saveRecipeToLocalStorage(localRecipe);
          console.log(localRecipe)
        });
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};
  var saveRecipeToLocalStorage = function (recipe) {
  var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
};

userFormEl.addEventListener('submit', formSubmitHandler);