document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const chatBtn = document.getElementById("chatBtn");
  const menuLateral = document.getElementById("menuLateral");
  const chatLateral = document.getElementById("chatLateral");

  let menuAberto = false;
  let chatAberto = false;

  menuBtn.addEventListener("click", () => {
    menuAberto = !menuAberto;
    menuLateral.classList.toggle("ativo", menuAberto);
    // Oculta o botão do menu quando o menu está ativo
    menuBtn.style.display = menuAberto ? "none" : "block";
  });

  chatBtn.addEventListener("click", () => {
    chatAberto = !chatAberto;
    chatLateral.classList.toggle("ativo", chatAberto);
  });
});
