// src/pages/EscolherCadastro.jsx
import React from "react";
import "./css/Escolher-Cadastro.css";
import Google from "../../assets/imagens/icons/google-icon-svgrepo-com.svg";
import logo from "../../assets/imagens/logo3.svg";


export default function EscolherCadastro() {
  const cadastrarGoogle = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="cadastro-opcoes-container">
     <img src={logo} alt="Banner" className="logo-banner" />

      <h2 className="login-subtitle">Escolha a forma de cadastramento:</h2>

      <a href="/Cadastro" className="cadastro-opcao">E-mail/Senha</a>

      <button className="cadastro-opcao" onClick={cadastrarGoogle}>
        <img src={Google} alt="Google" className="icone-social" />
        Conta Google
      </button>
    </div>
  );
}
