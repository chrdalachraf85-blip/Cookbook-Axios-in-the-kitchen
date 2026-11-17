import { getdata, searchdata } from "./apicalls.js";
import { displayRecipes, popupform, search, showerror } from "./display.js";

let allrecettes = [];

getdata()
  .then((data) => {
    allrecettes = data.recipes;
    displayRecipes(data.recipes);
  })
  .catch(() => {
    showerror("Could not load recipes");
  });

document.querySelector("#addbtn").addEventListener("click", () => {
  popupform();
  const forma = document.querySelector("#form");

  document.querySelector("#close").addEventListener("click", () => {
    forma.remove();
  });
  document.querySelector("#cancel").addEventListener("click", () => {
    forma.remove();
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
