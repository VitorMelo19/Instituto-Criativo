import React from 'react';
import logo from '../../../assets/imagens/logo3.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            <img src={logo} alt="Instituto Criativo" />
          </a>
          {/* ...o resto do HTML do menu */}
        </div>
      </div>
    </header>
  );
};

export default Header;
