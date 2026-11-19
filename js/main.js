import { getdata, searchdata, postRecipe, dltrecipe } from "./apicalls.js";
import {
  displayRecipes,
  popupform,
  search,
  showerror,
  succedmsg,
  deletecheck,
} from "./display.js";
import { getFields, validateField } from "./validation.js";
let allrecettes = [];

const recipeCount =  document.querySelector("#recipe-count")
recipeCount.textContent = "Chargement des recettes..."
getdata()
.then((data) => {
    allrecettes = data.recipes;
    
  })
  .catch(() => {
    showerror("Impossible de charger les recettes.");
  
  })
  .finally(()=>{
    displayRecipes(allrecettes);
  })

document.querySelector("#addbtn").addEventListener("click", (e) => {
  e.preventDefault;
  popupform();
  const forma = document.querySelector("#rform");
  const formaback = document.querySelector("#formback");
  forma.noValidate = true;
  const fields = getFields(forma);

  fields.forEach((field) => {
    field.input.addEventListener("input", () => validateField(field));
    field.input.addEventListener("change", () => validateField(field));
  });

  forma.addEventListener("submit", async (e) => {
    const submit = forma.querySelector("#ajouter");

    e.preventDefault();

    const fieldsValid = fields.map(validateField);
    const firstInvalid = fieldsValid.indexOf(false);
    if (firstInvalid !== -1) {
      fields[firstInvalid].input.focus();
      return;
    }

    const recipe = {
      name: forma.elements.name.value.trim(),
      cuisine: forma.elements.cuisine.value.trim(),
      difficulty: forma.elements.difficulty.value,
      prepTimeMinutes: Number(forma.elements.prepTimeMinutes.value),
    };
    submit.disabled = true;
    submit.textContent = "Envoi en cours...";


    try {
      await postRecipe(recipe);
      
      allrecettes.unshift(recipe);
      displayRecipes(allrecettes);
      formaback.remove();
      succedmsg();
    } catch (error) {
      console.error("Impossible d’ajouter la recette :", error);
    } finally {
      submit.disabled = false;
      submit.textContent = "Ajouter";
    }
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
    recipeCount.textContent = "Recherche en cours...";
    searchdata(input)
    
      .then((data) => {
        displayRecipes(data.recipes);
        if (!data.recipes || data.recipes.length === 0) {
          showerror("Aucune recette trouvée.");
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
        showerror("Impossible de rechercher les recettes.");
        console.error("Impossible de rechercher les recettes :", error);
      });
  });
///////////delete
const recipeList = document.querySelector("#recipe-list");
recipeList.addEventListener("click", async (e) => {
  const btn = e.target.closest(`[data-role="delete"]`);
  if (!btn) return;

  deletecheck();
  const dtbtn = document.querySelector("#delete");
  dtbtn.addEventListener("click", async () => {
    const res = await dltrecipe(btn.dataset.deleteId);
    res >= 200 && (await res) < 300
      ? recipeList
          .querySelector(`[data-delete-id = "${btn.dataset.deleteId}"]`)
          .remove()
      : (recipeList.textContent = "Échec de la suppression de la recette.");
    allrecettes = allrecettes.filter(
      (recipe) => String(recipe.id) !== String(btn.dataset.deleteId),
    );
    displayRecipes(allrecettes);
    // document.querySelector("#recipe-count").textContent= `${allrecettes.length} recetts`
    document.querySelector("#backdrop").remove();
  });

  // const res = await dltrecipe(btn.dataset.deleteId)
  // res >= 200 && await res < 300 ? recipeList.querySelector(`[data-delete-id = "${btn.dataset.deleteId}"]`).remove() : recipeList.textContent = "Échec de la suppression de la recette."
  // const article = recipeList.querySelector(`[data-delete-id = "${btn.dataset.deleteId}"]`)
  // article.remove()
});
////////////
