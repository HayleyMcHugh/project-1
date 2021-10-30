// variables
var userFormEl = document.querySelector('#user-form');
var recipeInputEl = document.querySelector('#recipe');
var recipesContainerEL = document.querySelector('#recipes-container');
var recipesSearchTerm = document.querySelector('#recipe-search-term');

// form to enter a recipe/dish
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

// recipe api
var getUserRecipes = function (searchUserInput) {
  var apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=1bccdbd99014422bbed7295eb22db074&query=${searchUserInput}&addRecipeInformation=true`;

  // fetch and .then functions
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

// function to show recipes on webpage 
function renderFoundRecipes(arrayOfRecipes){

  for (var i = 0; i < arrayOfRecipes.length; i++) {
    // creating elements and assigning data to them
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

    // appending data to recipes container
    recipesContainerEL.appendChild(recipeTitle);
    recipeLink.appendChild(recipeImg);
    recipesContainerEL.appendChild(recipeLink);
    
    // assigning specific recipe data to save recipe button and appending
    saveRecipeBtn.setAttribute("data-title", arrayOfRecipes[i].title);
    saveRecipeBtn.setAttribute("data-image", arrayOfRecipes[i].image);
    saveRecipeBtn.setAttribute("data-link", arrayOfRecipes[i].sourceUrl);
    saveRecipeBtn.textContent = "Save Recipe";
    saveRecipeBtn.classList.add('btn');
    recipesContainerEL.appendChild(saveRecipeBtn);
  
    // save button click event
    saveRecipeBtn.addEventListener('click', event => {
      event.preventDefault();
      var recipeTitle = event.target.getAttribute('data-title');
      var recipeImage = event.target.getAttribute('data-image');
      var recipeLink = event.target.getAttribute('data-link');
      
      // object with recipe info
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
// saving recipes that were clicked to local storage
var saveRecipeToLocalStorage = function (recipe) {
var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
savedRecipes.push(recipe);
localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
};

userFormEl.addEventListener('submit', formSubmitHandler);