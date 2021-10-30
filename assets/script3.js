// Variables for id's of finalscore, reset button, and back button.
var savedRecipesContainerEl = document.querySelector("#saved-recipes-container");
var clear = document.querySelector("#clearBtn");

// Function to clear scores from local storage.
clear.addEventListener("click", function () {
 localStorage.clear();
 location.reload();
});

var savedRecipes = localStorage.getItem("savedRecipes");
savedRecipes = JSON.parse(savedRecipes);

if (savedRecipes.length !== 0) {
 for (var i = 0; i < savedRecipes.length; i++) {
    var createP = document.createElement("p");
    var createImg = document.createElement("img");
    var createLink = document.createElement("a");
    
    createP.textContent = savedRecipes[i].title;
    createImg.setAttribute("src", savedRecipes[i].image);
    createLink.setAttribute("href", savedRecipes[i].link);
    
    savedRecipesContainerEl.appendChild(createP);
    savedRecipesContainerEl.appendChild(createLink);
    createLink.appendChild(createImg);
 }
};
