import { getdata } from "./apicalls.js";
import { displayRecipes, popupform, search, filteri } from "./display.js";

let allrecettes = [];

getdata()
  .then((data) => {
    allrecettes = data.recipes;
    displayRecipes(data.recipes);
  })
  .catch((error) => {
    console.error("Could not load recipes:", error);
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






