import { getdata, searchdata, postRecipe, dltrecipe } from "./apicalls.js";
import { displayRecipes, popupform, search, showerror, succedmsg, deletecheck } from "./display.js";
import { getFields, validateField } from "./validation.js";
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
    submit.textContent = "sending...";

    try {
      await postRecipe(recipe);
      allrecettes.unshift(recipe);+0
      displayRecipes(allrecettes);
      formaback.remove();
      succedmsg();
    } catch (error) {
      console.error("Could not add recipe:", error);
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
  ///////////delete









    // const res = await dltrecipe(btn.dataset.deleteId)
    // res >= 200 && await res < 300 ? recipeList.querySelector(`[data-delete-id = "${btn.dataset.deleteId}"]`).remove() : recipeList.textContent = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    // const article = recipeList.querySelector(`[data-delete-id = "${btn.dataset.deleteId}"]`)
    // article.remove()
  })
////////////