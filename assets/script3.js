// variables
var savedRecipesContainerEl = document.querySelector("#saved-recipes-container");
var clear = document.querySelector("#clearBtn");

// function to clear recipes from local storage
clear.addEventListener("click", function () {
 localStorage.clear();
 location.reload();
});

// grabbing items from local storage
var savedRecipes = localStorage.getItem("savedRecipes");
savedRecipes = JSON.parse(savedRecipes);

// if statement and for loop to grab saved recipes from local storage and loop through them
if (savedRecipes.length !== 0) {
 for (var i = 0; i < savedRecipes.length; i++) {
   //  created elements
    var createP = document.createElement("p");
    var createImg = document.createElement("img");
    var createLink = document.createElement("a");
    
   //  assigned elements data from local storage object
    createP.textContent = savedRecipes[i].title;
    createImg.setAttribute("src", savedRecipes[i].image);
    createLink.setAttribute("href", savedRecipes[i].link);
    
   //  appended data to saved recipes container
    savedRecipesContainerEl.appendChild(createP);
    savedRecipesContainerEl.appendChild(createLink);
    createLink.appendChild(createImg);
 }
};