export const hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.re
}
export const showAlert = (type, msg) => {
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML("afterbegin", markup);
};
