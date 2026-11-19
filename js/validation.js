export function getFields(form) {
  return [
    {
      input: form.elements.name,
      regex: /^[\p{L}][\p{L} '\u2019-]{0,59}$/u,
      errorMessage: "Saisissez entre 1 et 60 lettres, espaces, apostrophes ou traits d’union. Les chiffres ne sont pas autorisés.",
    },
    {
      input: form.elements.cuisine,
      regex: /^[\p{L}][\p{L} '\u2019-]*$/u,
      errorMessage: "Utilisez des lettres, des espaces, des apostrophes ou des traits d’union.",
    },
    {
      input: form.elements.difficulty,
      isValid: (value) => ["Easy", "Medium", "Hard"].includes(value),
      errorMessage: "Choisissez un niveau de difficulté.",
    },
    {
      input: form.elements.prepTimeMinutes,
      isValid: (value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 300,
      errorMessage: "Saisissez un nombre entier entre 1 et 300 minutes.",
    },
  ];
}

export function validateField(field) {
  const value = field.input.value.trim();
  const valid = field.isValid
    ? field.isValid(value)
    : field.regex.test(value);
  const box = field.input.closest(".champ");
  const message = box.querySelector(".message");

  
  field.input.classList.remove("border-[#788363]", "border-red-500");
  message.classList.remove("text-[#788363]", "text-red-500");
  field.input.classList.add(valid ? "border-[#788363]" : "border-red-500");
  message.classList.add(valid ? "text-[#788363]" : "text-red-500");
  message.classList.remove("hidden");
  message.textContent = valid ? "Valide." : field.errorMessage;
  field.input.setAttribute("aria-invalid", String(!valid));
  return valid;
}
