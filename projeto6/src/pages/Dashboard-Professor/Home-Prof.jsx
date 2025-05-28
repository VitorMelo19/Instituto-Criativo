import logo from "../../assets/imagens/logo3.svg";
import "../Dashboard-Admin/css/home.css";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function HomeProf() {
  return (
     <div className="adminDashboard">
                    <aside className="sidebarAdmin">
                    <div className="sidebarHeaderAdmin">
                        <img src={logo} alt="Logo" className="sidebarLogoAdmin" />
                    </div>
    
                    <nav className="adminDesktopNav">
                        <ul className="adminNavLinksVertical">
                        <li><a href="/home-Prof"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos-prof"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/config-prof"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
                        </ul>
                    </nav>
                    </aside>
    
                    <header className="adminHeaderMobile">
                    <div className="adminHeaderMobileContent">
                        <img src={logo} alt="Logo" className="adminLogoMobile" />
                        <button
                        className="adminMenuToggle"
                        onClick={() =>
                            document.querySelector(".adminMobileNav")?.classList.toggle("active")
                        }
                        >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        </button>
                    </div>
    
                    <nav className="adminMobileNav">
                        <ul className="adminMobileLinks">
                        <li><a href="/home-Prof"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos-prof"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/config-prof"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
                        </ul>
                    </nav>
                    </header>
                    </div>
  ); 
}