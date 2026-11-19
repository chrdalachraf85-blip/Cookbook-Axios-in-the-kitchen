
const recipeList = document.querySelector("#recipe-list");
const recipeCount = document.querySelector("#recipe-count");
export function displayRecipes(recipes) {

  recipeList.replaceChildren();
  recipeCount.textContent = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className =
      "overflow-hidden rounded-[2rem] border-[3px] border-[#11100f] bg-[#f8eee3] shadow-[8px_9px_0_#11100f] transition-transform hover:-translate-y-1";
///////////////////////
    card.dataset.deleteId = recipe.id
    const photo = document.createElement("img");
    photo.src = recipe.image;
    photo.alt = recipe.name;
    
    photo.className = "h-56 w-full border-b-[3px] border-[#11100f] object-cover sm:h-64";

    const details = document.createElement("div");
    details.className = "space-y-5 p-5 sm:p-6";

    const name = document.createElement("h2");
    name.textContent = recipe.name;
    name.className = "text-2xl font-black leading-tight text-[#11100f] sm:text-3xl";

    const badges = document.createElement("div");
    badges.className = "flex flex-wrap gap-3";

    const cuisine = document.createElement("span");
    cuisine.textContent = "🌍" + recipe.cuisine;
    cuisine.className =
      "rounded-full border-2 border-[#11100f] bg-[#ead2b9] px-4 py-2 text-sm font-bold text-[#11100f]";

    const difficulty = document.createElement("span");
    difficulty.textContent = "🧑‍🍳" + ({ Easy: "Facile", Medium: "Moyenne", Hard: "Difficile" }[recipe.difficulty] ?? recipe.difficulty);
    difficulty.className =
      "rounded-full bg-[#11100f] px-4 py-2 text-sm font-bold text-[#f8eee3]";

    const footer = document.createElement("div");
    footer.className = "flex items-center justify-between gap-3 pt-1";
    const prepTime = document.createElement("p");
    prepTime.textContent = `◷ ${recipe.prepTimeMinutes} min`;
    prepTime.className = "flex items-center gap-2 text-lg font-bold text-[#45382f]";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.role = "delete"
    deleteButton.dataset.deleteId = recipe.id
    deleteButton.setAttribute("aria-label", `Supprimer ${recipe.name}`);
    deleteButton.className = "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-[#11100f] bg-transparent text-[#11100f] transition hover:bg-[#b41113] hover:text-[#f8eee3]";
    deleteButton.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3"/></svg>`;

    badges.append(cuisine, difficulty);
    footer.append(prepTime, deleteButton);
    details.append(name, badges, footer);
    card.append(photo, details);
    recipeList.append(card);
  });
}

export function popupform() {
  const div = document.createElement("div");
  div.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-[#11100f]/70 p-4";
  div.id = "formback";
  const modal = document.createElement("div");
  modal.className =
    "relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border-[3px] border-[#11100f] bg-[#f8eee3] p-5 shadow-[6px_7px_0_#11100f] sm:p-12 sm:shadow-[9px_10px_0_#11100f]";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.id = "close";
  closeButton.setAttribute("aria-label", "Fermer");
  closeButton.className =
    "absolute right-6 top-5 text-4xl leading-none text-[#11100f]";

  const title = document.createElement("h2");
  title.textContent = "Ajouter une recette";
  title.className = "mb-8 text-3xl font-black text-[#11100f]";

  const form = document.createElement("form");
  form.className = "space-y-5";
  form.id = "rform"

  // Wrap each control and its live validation message in a .champ container.
  const makeField = (labelText, input) => {
    const box = document.createElement("div");
    box.className = "champ";
    const label = document.createElement("label");
    label.className = "block font-bold text-[#11100f]";
    label.appendChild(document.createTextNode(labelText));
    input.className =
      "mt-2 w-full rounded-xl border-2 border-[#11100f] bg-[#fffaf3] px-4 py-3 text-lg font-normal outline-none focus:border-[#b41113]";
    label.appendChild(input);
    const message = document.createElement("p");
    message.className = "message hidden mt-1 text-sm";
    message.setAttribute("aria-live", "polite");
    box.append(label, message);
    return box;
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
  timeInput.max = "300";
  timeInput.placeholder = "Ex. 45";
  timeInput.required = true;
  form.appendChild(makeField("Temps de préparation (min)", timeInput));

  const buttons = document.createElement("div");
  buttons.className = "flex justify-end gap-4 pt-5";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "cancel";
  cancelButton.textContent = "Annuler";
  cancelButton.className = "rounded-full px-5 py-3 font-bold text-[#45382f]";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.id = 'ajouter'
  addButton.textContent = "Ajouter";
  addButton.className =
    "rounded-full bg-[#b41113] px-7 py-3 font-bold text-[#f8eee3] hover:bg-[#11100f]";

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
  recipeCount.textContent = "";
  recipeList.replaceChildren();
  const div = document.createElement("div");
  div.className =
    "col-span-full mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center sm:gap-8";
  const p = document.createElement("p");
  p.className = "text-3xl font-black leading-tight text-[#b41113] sm:text-5xl";
  p.textContent = error;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "btnrefresh"
  btn.className =
    "w-full rounded-full bg-[#b41113] px-8 py-4 text-lg font-bold text-[#f8eee3] shadow-[4px_5px_0_#11100f] transition hover:translate-y-1 hover:bg-[#11100f] hover:shadow-[1px_2px_0_#11100f] focus:outline-none focus:ring-2 focus:ring-[#b41113] focus:ring-offset-2 sm:w-auto sm:text-xl";
  btn.textContent = "Réessayer";

  div.append(p,btn)
  recipeList.appendChild(div)


}
export function succedmsg() {
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.className =
    "fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-2xl border-2 border-[#788363] bg-[#e7eddc] px-5 py-4 text-[#40502e] shadow-[5px_6px_0_#11100f] sm:bottom-8 sm:right-8";

  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.className =
    "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#788363] text-xl font-black text-white";
  icon.textContent = "✓";

  const message = document.createElement("p");
  message.className = "font-bold";
  message.textContent = "Recette ajoutée avec succès !";

  toast.appendChild(icon);
  toast.appendChild(message);
  document.body.appendChild(toast);

  window.setTimeout(() => toast.remove(), 2000);
}





export function deletecheck(){
  const backdrop = document.createElement("div");
  backdrop.id ="backdrop"
  backdrop.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-[#11100f]/70 p-4";
  backdrop.setAttribute("role", "presentation");

  const modal = document.createElement("section");
  modal.className =
    "relative w-full max-w-md rounded-[2rem] border-[3px] border-[#11100f] bg-[#f8eee3] p-7 shadow-[8px_9px_0_#11100f] sm:p-9";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "deletecheck-title");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Fermer");
  closeButton.className =
    "absolute right-5 top-3 text-4xl leading-none text-[#11100f] hover:text-[#b41113]";
  closeButton.addEventListener("click", () => backdrop.remove());

  const icon = document.createElement("div");
  icon.className =
    "mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-[#11100f] bg-[#ead2b9] text-[#b41113]";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3"/></svg>';

  const title = document.createElement("h2");
  title.id = "deletecheck-title";
  title.className = "mb-3 text-center text-2xl font-black text-[#11100f] sm:text-3xl";
  title.textContent = "Confirmer la suppression ?";

  const message = document.createElement("p");
  message.className = "mb-8 text-center text-lg font-semibold text-[#45382f]";
  message.textContent = "Voulez-vous supprimer cette recette ?";

  const actions = document.createElement("div");
  actions.className = "flex justify-center gap-3 sm:gap-4";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Annuler";
  cancelButton.className =
    "rounded-full px-5 py-3 font-bold text-[#45382f] hover:bg-[#ead2b9]";
  cancelButton.addEventListener("click", () => backdrop.remove());

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = "delete"
  deleteButton.textContent = "Supprimer";
  deleteButton.className =
    "rounded-full bg-[#b41113] px-7 py-3 font-bold text-[#f8eee3] hover:bg-[#11100f]";

  actions.append(cancelButton, deleteButton);
  modal.append(closeButton, icon, title, message, actions);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  return { backdrop, deleteButton, cancelButton };
}

