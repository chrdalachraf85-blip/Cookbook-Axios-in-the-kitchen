// Describe each form control once, following the field-config pattern.
export function getFields(form) {
  return [
    {
      input: form.elements.name,
      regex: /^[\p{L}][\p{L} '\u2019-]{0,59}$/u,
      errorMessage: "Use 1–60 letters, spaces, apostrophes, or hyphens. Numbers are not allowed.",
    },
    {
      input: form.elements.cuisine,
      regex: /^[\p{L}][\p{L} '\u2019-]*$/u,
      errorMessage: "Use letters, spaces, apostrophes, or hyphens.",
    },
    {
      input: form.elements.difficulty,
      isValid: (value) => ["Easy", "Medium", "Hard"].includes(value),
      errorMessage: "Choose a difficulty.",
    },
    {
      input: form.elements.prepTimeMinutes,
      isValid: (value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 300,
      errorMessage: "Enter a whole number from 1 to 300 minutes.",
    },
  ];
}

// Update the field's visual state and message, and return whether it is valid.
export function validateField(field) {
  const value = field.input.value.trim();
  const valid = field.isValid
    ? field.isValid(value)
    : field.regex.test(value);
  const box = field.input.closest(".champ");
  const message = box.querySelector(".message");

  // Apply Tailwind color utilities directly instead of status-name classes.
  field.input.classList.remove("border-green-500", "border-red-500");
  message.classList.remove("text-green-500", "text-red-500");
  field.input.classList.add(valid ? "border-green-500" : "border-red-500");
  message.classList.add(valid ? "text-green-500" : "text-red-500");
  message.classList.remove("hidden");
  message.textContent = valid ? "Valide." : field.errorMessage;
  field.input.setAttribute("aria-invalid", String(!valid));
  return valid;
}
