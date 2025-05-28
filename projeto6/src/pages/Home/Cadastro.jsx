// src/pages/Cadastro.jsx
import React, { useEffect } from "react";
import "./css/Cadastro.css";

import logo from "../../assets/imagens/logo3.svg";

export default function Cadastro() {
  useEffect(() => {
  }, []);

  return (
    <div className="cadastro-container">
      <img src={logo} alt="Banner" className="logo-banner" />

      <h2 className="login-subtitle">Preencha as informações abaixo:</h2>

      <div className="cadastro-form">
        {/* Coluna Esquerda */}
        <div className="coluna">
          <label className="login-label" htmlFor="nome">Nome:</label>
          <input className="login-input" type="text" id="nome" placeholder="Nome" />

          <label className="login-label" htmlFor="sobrenome">Sobrenome:</label>
          <input className="login-input" type="text" id="sobrenome" placeholder="Sobrenome" />

          <label className="login-label" htmlFor="celular">DD + Celular:</label>
          <input className="login-input" type="tel" id="celular" placeholder="(XX) XXXXX-XXXX" />

          <label className="login-label" htmlFor="cpf">CPF/CNPJ:</label>
          <input className="login-input" type="text" id="cpf" placeholder="Digite seu CPF ou CNPJ" />
        </div>

        {/* Coluna Direita */}
        <div className="coluna">
          <label className="login-label" htmlFor="email">E-Mail:</label>
          <input className="login-input" type="email" id="email" placeholder="E-Mail" />

          <label className="login-label" htmlFor="senha">Senha:</label>
          <input className="login-input" type="password" id="senha" placeholder="Senha" />

          <label className="login-label" htmlFor="endereco">Endereço, Nº:</label>
          <input className="login-input" type="text" id="endereco" placeholder="Rua Exemplo, 123" />

          <label className="login-label" htmlFor="cep">CEP:</label>
          <input className="login-input" type="text" id="cep" placeholder="00000-000" />
        </div>
      </div>

      {/* <button className="login-button">Cadastrar</button> */}
      <a href="/home-aluno"> <button className="login-button">Cadastrar</button> </a>
    </div>
  );
}
