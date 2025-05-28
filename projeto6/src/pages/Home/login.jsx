// src/pages/Login/Login.jsx
import React from 'react';
import './css/login.css';
import logo from '../../assets/imagens/logo3.svg';

const Login = () => {
  return (
    <div className="login-container" data-aos="fade-up">
      <img src={logo} alt="Banner" className="logo-banner" />


      <label className="login-label" htmlFor="email">E-Mail:</label>
      <input className="login-input" type="email" id="email" placeholder="Digite seu e-mail" />

      <label className="login-label" htmlFor="senha">Senha:</label>
      <input className="login-input" type="password" id="senha" placeholder="Digite sua senha" />

      <a href="#" className="esqueci-link">Esqueci minha senha</a>

      <div className="login-link">
        <p>Não tem uma conta? <a href="/EscolherCadastro" className="login-cadastre-se">Cadastre-se</a></p>
      </div>

      <button className="login-button">Entre</button>
    </div>
  );
};

export default Login;
