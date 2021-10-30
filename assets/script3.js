var savedRecipesContainerEL = document.getElementById('saved-recipes-container');

var displaySavedRecipes = () => {
    let mySavedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipesContainerEL.appendChild(mySavedRecipes);
 }