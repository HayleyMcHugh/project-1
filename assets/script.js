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
      renderFoundRecipes(data.results);
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};

var savedRecipe = [];

function renderFoundRecipes(arrayOfRecipes){

  for (var i = 0; i < arrayOfRecipes.length; i++) {
    var recipeTitle = document.createElement('p');
    var recipeTitleData = arrayOfRecipes[i].title;
    var recipeImg = document.createElement('img');
    var recipeImgData = arrayOfRecipes[i].image
    var recipeLink = document.createElement('a');
    var recipeLinkData = arrayOfRecipes[i].sourceUrl;
    var saveRecipeBtn = document.createElement('button');
    recipeTitle.textContent= recipeTitleData;
    recipeImg.setAttribute("src", recipeImgData);
    recipeLink.setAttribute("href", recipeLinkData);

    recipesContainerEL.appendChild(recipeTitle);
    recipeLink.appendChild(recipeImg);
    recipesContainerEL.appendChild(recipeLink);
    
    saveRecipeBtn.setAttribute("data-title", arrayOfRecipes[i].title);
    saveRecipeBtn.setAttribute("data-image", arrayOfRecipes[i].image);
    saveRecipeBtn.setAttribute("data-link", arrayOfRecipes[i].sourceUrl);
    saveRecipeBtn.textContent = "Save Recipe";
    saveRecipeBtn.classList.add('btn');
    recipesContainerEL.appendChild(saveRecipeBtn);
  

    saveRecipeBtn.addEventListener('click', event => {
      event.preventDefault();
      var recipeTitle = event.target.getAttribute('data-title');
      var recipeImage = event.target.getAttribute('data-image');
      var recipeLink = event.target.getAttribute('data-link');
      
      var localRecipe = {
          title: recipeTitle,
          image: recipeImage,
          link: recipeLink
        };
      console.log(localRecipe);
      saveRecipeToLocalStorage(localRecipe);
    });
  }
}

var saveRecipeToLocalStorage = function (recipe) {
var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
savedRecipes.push(recipe);
localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
};

userFormEl.addEventListener('submit', formSubmitHandler);