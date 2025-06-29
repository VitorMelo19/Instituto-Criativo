// Inicializa AOS
AOS.init({
  duration: 1000,
  once: true,
});

// login.html - Script para login
document.querySelector(".login-button").addEventListener("click", login);

function login() {
  const email = document.querySelector("#email");
  const senha = document.querySelector("#senha");

  clearErrors();

  let valid = true;

  if (!email.value) {
    showError(email, "Informe o e-mail.");
    valid = false;
  }
  if (!senha.value) {
    showError(senha, "Informe a senha.");
    valid = false;
  }

  if (!valid) return;

  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      senha: senha.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.role === "admin") {
          window.location.href = "/Front-End/Dashboard-Admin/home-admin.html";
        } else {
          window.location.href = "/Front-End/Dashboard-Cliente/home-cliente.html";
        }
      } else {
        showError(senha, data.erro || "E-mail ou senha incorretos.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      showError(senha, "Erro ao tentar fazer login.");
    });
}

// cadastro.html - Script para cadastro
document.querySelector(".login-button").addEventListener("click", cadastrar);

function cadastrar() {
  const nome = document.querySelector("#nome");
  const sobrenome = document.querySelector("#sobrenome");
  const celular = document.querySelector("#celular");
  const cpf = document.querySelector("#cpf");
  const email = document.querySelector("#email");
  const senha = document.querySelector("#senha");
  const endereco = document.querySelector("#endereco");
  const cep = document.querySelector("#cep");

  clearErrors();

  let valid = true;

  if (!nome.value) { showError(nome, "Informe o nome."); valid = false; }
  if (!sobrenome.value) { showError(sobrenome, "Informe o sobrenome."); valid = false; }
  if (!cpf.value) { showError(cpf, "Informe o CPF ou CNPJ."); valid = false; }
  if (!celular.value) { showError(celular, "Informe o celular."); valid = false; }
  if (!email.value) { showError(email, "Informe o e-mail."); valid = false; }
  if (!senha.value) { showError(senha, "Informe a senha."); valid = false; }
  if (!endereco.value) { showError(endereco, "Informe o endereço."); valid = false; }
  if (!cep.value) { showError(cep, "Informe o CEP."); valid = false; }

  if (!valid) return;

  fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      sobrenome: sobrenome.value,
      celular: celular.value,
      cpf_cnpj: cpf.value,
      email: email.value,
      senha: senha.value,
      endereco: endereco.value,
      cep: cep.value,
      numero: "0"
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensagem) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        alert("Erro ao cadastrar: " + data.erro);
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao tentar cadastrar.");
    });
}

// Utilitários
function showError(input, message) {
  let error = document.createElement("div");
  error.className = "error-msg";
  error.innerText = message;
  input.insertAdjacentElement("afterend", error);
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach((e) => e.remove());
}
