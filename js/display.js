
const recipeList = document.querySelector("#recipe-list");
const recipeCount = document.querySelector("#recipe-count");
export function displayRecipes(recipes) {

  recipeList.replaceChildren();
  recipeCount.textContent = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className =
      "overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm";

    const photo = document.createElement("img");
    photo.src = recipe.image;
    photo.alt = recipe.name;
    
    photo.className = "h-52 w-full object-cover";

    const details = document.createElement("div");
    details.className = "space-y-4 p-4";

    const name = document.createElement("h2");
    name.textContent = recipe.name;
    name.className = "text-xl font-bold text-green-950";

    const badges = document.createElement("div");
    badges.className = "flex flex-wrap gap-2";

    const cuisine = document.createElement("span");
    cuisine.textContent = "🌍" + recipe.cuisine;
    cuisine.className =
      "rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800";

    const difficulty = document.createElement("span");
    difficulty.textContent = "🧑‍🍳" + recipe.difficulty;
    difficulty.className =
      "rounded-full bg-green-100 px-3 py-1 text-sm text-green-900";

    const prepTime = document.createElement("p");
    prepTime.textContent = `◷ ${recipe.prepTimeMinutes} min`;
    prepTime.className = "text-gray-700";

    badges.append(cuisine, difficulty);
    details.append(name, badges, prepTime);
    card.append(photo, details);
    recipeList.append(card);
  });
}

export function popupform() {
  const div = document.createElement("div");
  div.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
  div.id = "form";
  const modal = document.createElement("div");
  modal.className =
    "relative w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl sm:p-12";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.id = "close";
  closeButton.setAttribute("aria-label", "Fermer");
  closeButton.className =
    "absolute right-6 top-5 text-4xl leading-none text-gray-600";

  const title = document.createElement("h2");
  title.textContent = "Ajouter une recette";
  title.className = "mb-8 text-3xl font-bold text-gray-900";

  const form = document.createElement("form");
  form.className = "space-y-5";

  const makeField = (labelText, input) => {
    const label = document.createElement("label");
    label.className = "block font-semibold text-gray-900";
    label.appendChild(document.createTextNode(labelText));
    input.className =
      "mt-2 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-lg font-normal outline-none focus:border-green-700";
    label.appendChild(input);
    return label;
  };

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Nom";
  nameInput.required = true;
  form.appendChild(makeField("Nom de la recette", nameInput));

  const cuisineInput = document.createElement("input");
  cuisineInput.type = "text";
  cuisineInput.name = "cuisine";
  cuisineInput.placeholder = "🌍 Ex. Marocaine";
  cuisineInput.required = true;
  form.appendChild(makeField("Cuisine", cuisineInput));

  const difficultySelect = document.createElement("select");
  difficultySelect.name = "difficulty";
  difficultySelect.required = true;
  const difficultyOptions = [
    ["", "⭐ Choisir"],
    ["Easy", "Facile"],
    ["Medium", "Moyenne"],
    ["Hard", "Difficile"],
  ];
  difficultyOptions.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    difficultySelect.appendChild(option);
  });
  form.appendChild(makeField("Difficulté", difficultySelect));

  const timeInput = document.createElement("input");
  timeInput.type = "number";
  timeInput.name = "prepTimeMinutes";
  timeInput.min = "1";
  timeInput.placeholder = "Ex. 45";
  timeInput.required = true;
  form.appendChild(makeField("Temps de préparation (min)", timeInput));

  const buttons = document.createElement("div");
  buttons.className = "flex justify-end gap-4 pt-5";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "cancel";
  cancelButton.textContent = "Annuler";
  cancelButton.className = "rounded-lg px-5 py-3 font-semibold text-gray-700";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Ajouter";
  addButton.className =
    "rounded-lg bg-green-700 px-7 py-3 font-semibold text-white";

  buttons.appendChild(cancelButton);
  buttons.appendChild(addButton);
  form.appendChild(buttons);

  modal.appendChild(closeButton);
  modal.appendChild(title);
  modal.appendChild(form);
  div.appendChild(modal);

  document.body.appendChild(div);
}

export const search = document.querySelector("#recipe-search");

export function showerror(error) {
  const div = document.createElement("div");
  div.className =
    "col-span-full mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center sm:gap-8";
  const p = document.createElement("p");
  p.className = "text-2xl font-semibold leading-relaxed text-[#718778] sm:text-4xl";
  p.textContent = error;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnrefresh"
  btn.className =
    "w-full rounded-xl bg-[#17452f] px-8 py-4 text-xl font-semibold text-white transition hover:bg-[#123a27] focus:outline-none focus:ring-2 focus:ring-[#17452f] focus:ring-offset-2 sm:w-auto sm:text-2xl";
  btn.textContent = "Réessayer";

  div.append(p,btn)
  recipeList.appendChild(div)


}
