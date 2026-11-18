const form = document.querySelector("#recipe-search-form")

const Name = document.querySelector("#recipe-name");      
const Cuisine =document.querySelector("#recipe-cuisine");   
const diff = document.querySelector("#recipe-difficulty"); 
const time = document.querySelector("#recipe-prep-time");  


export function valider(form){
  const fields = {
    name: form.querySelector('[name="name"]'),
    cuisine: form.querySelector('[name="cuisine"]'),
    difficulty: form.querySelector('[name="difficulty"]'),
    time: form.querySelector('[name="prepTimeMinutes"]'),
  };

  const valid = {
    name: /^[\p{L}\p{N}][\p{L}\p{N} '\u2019-]{0,59}$/u.test(fields.name.value.trim()),
    cuisine: /^[\p{L}][\p{L} '\u2019-]*$/u.test(fields.cuisine.value.trim()),
    difficulty: ["Easy", "Medium", "Hard"].includes(fields.difficulty.value),
    time: /^\d+$/.test(fields.time.value) && Number(fields.time.value) >= 1 && Number(fields.time.value) <= 300,
  };

  form.querySelectorAll("[data-validation-error]").forEach((message) => message.remove());
  const messages = {
    name: "Name must be 1–60 characters; use letters, numbers, spaces, apostrophes, or hyphens.",
    cuisine: "Cuisine must use letters, spaces, apostrophes, or hyphens.",
    difficulty: "Choose a difficulty.",
    time: "Time must be a whole number from 1 to 300 minutes.",
  };

  Object.entries(fields).forEach(([key, field]) => {
    field.removeAttribute("aria-invalid");  
    if (!valid[key]) {
      field.setAttribute("aria-invalid", "true");
      const message = document.createElement("p");
      message.dataset.validationError = "true";
      message.className = "mt-1 text-sm text-red-700";
      message.textContent = messages[key];
      field.parentElement.appendChild(message);
    }
  });

  return Object.values(valid).every(Boolean);
}
