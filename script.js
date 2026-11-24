const button = document.querySelector(".eye");
const password = document.querySelector("#senha");

button.addEventListener("click", () => {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  button.setAttribute("aria-pressed", String(show));
  button.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
});
