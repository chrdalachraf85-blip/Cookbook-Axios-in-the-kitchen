import { getdata, searchdata, postRecipe } from "./apicalls.js";
import { displayRecipes, popupform, search, showerror } from "./display.js";
import { valider } from "./validation.js";
let allrecettes = [];

getdata()
  .then((data) => {
    allrecettes = data.recipes;
    displayRecipes(data.recipes);
  })
  .catch(() => {
    showerror("Could not load recipes");
  });

document.querySelector("#addbtn").addEventListener("click", (e) => {
  e.preventDefault;
  popupform();
  const forma = document.querySelector("#rform");
  // const form = document.querySelector("#form");
  // const formaback = document.querySelector("#formback");
  forma.noValidate = true;
  forma.addEventListener("submit", (e) => {
    e.preventDefault;
    if (!valider(forma)) return;
    const recipe = {
      name: recipeForm.elements.name.value.trim(),
      cuisine: recipeForm.elements.cuisine.value.trim(),
      difficulty: recipeForm.elements.difficulty.value,
      prepTimeMinutes: Number(recipeForm.elements.prepTimeMinutes.value),
    };



  const submitButton = forma.querySelector('button[type="submit"]');
  submitButton.disabled = true;


    postRecipe(recipe)
    .then((data)=> {
      
    })


  // try {
  //   const response =  postRecipe(recipe);
  //   console.log("Recipe returned by the API:", response);
  // } catch (error) {
  //   console.error("Could not add recipe:", error);
  // } finally {
  //   submitButton.disabled = false;
  // }


});
  });

  document.querySelector("#close").addEventListener("click", () => {
    formaback.remove();
  });
  document.querySelector("#cancel").addEventListener("click", () => {
    formaback.remove();
  });
});

document
  .querySelector("#recipe-search-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const input = search.value.trim();
    if (!input) {
      displayRecipes(allrecettes);
      return;
    }

    searchdata(input)
      .then((data) => {
        displayRecipes(data.recipes);
        if (!data.recipes || data.recipes.length === 0) {
          showerror("No Recipes Found");
          document
            .querySelector("#btnrefresh")
            .addEventListener("click", () => {
              getdata().then((data) => {
                allrecettes = data.recipes;
                displayRecipes(data.recipes);
              });
            });
        }
      })
      .catch((error) => {
        showerror(error);
        console.error("Could not search recipes:", error);
      });
  });
