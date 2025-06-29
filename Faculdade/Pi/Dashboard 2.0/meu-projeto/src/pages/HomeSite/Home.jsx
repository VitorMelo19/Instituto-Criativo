import React, { useEffect } from 'react';
import './home.css';

// Declaração de imagens
import logo from '../../assets/imagens/logo3.svg';
import juntos_fortes from '../../assets/imagens/juntos_somos_mais_fortes.jpg';
import lucy_crianca from '../../assets/imagens/parceiros/foto_lucy-p-500.jpeg';
import logo_google from '../../assets/imagens/parceiros/logo_google.png';
import logo_microsoft from '../../assets/imagens/parceiros/logo_microsoft.png';
import logo_ibm from '../../assets/imagens/parceiros/IBM_logo.png';
import logo_fatec from '../../assets/imagens/parceiros/logo_fatec.png';
import logo_usp from '../../assets/imagens/parceiros/logo_usp.png';
import logo_univesp from '../../assets/imagens/parceiros/logo_univesp.png';
import logo_sebrae from '../../assets/imagens/parceiros/logo_sebrae.png';
import logo_esmusp from '../../assets/imagens/parceiros/logo_esmusp.png';
import logo_fatecmogi from '../../assets/imagens/parceiros/logo_fatecmogi.png';
import depoimento1 from '../../assets/imagens/maria.jpg';
import depoimento2 from '../../assets/imagens/carlos.jpg';
import curso1 from '../../assets/imagens/curso1.jpg';
import curso2 from '../../assets/imagens/curso2.jpg';
import curso3 from '../../assets/imagens/curso3.jpg';
import vice_presidente from '../../assets/imagens/vice_presidente.jpg';
import deyse from '../../assets/imagens/deyse.jpg';
import joao from '../../assets/imagens/João.jpg';
import felipe from '../../assets/imagens/Felipe.jpg';
import joaquim from '../../assets/imagens/Joaquim.jpg';
import carlos from '../../assets/imagens/Carlos E..jpg';
import marcos from '../../assets/imagens/Marcos.jpg';
import arte2 from '../../assets/imagens/arte2.jpg';
import arte1 from '../../assets/imagens/arte.jpg';




const Home = () => {
  useEffect(() => {
    // Coloque aqui a lógica do slider e interações JS se necessário
  }, []);

  return (
    <>
      {/* HEAD ESTÁ NO PUBLIC/index.html */}

      {/* HEADER */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <img src={logo} alt="Instituto Criativo" />
            </a>

            <nav className="desktop-nav">
              <ul className="nav-links">
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#segmentos">Segmentos</a></li>
                <li><a href="#impacto">Impacto</a></li>
                <li><a href="#cursos">Cursos</a></li>
                <li><a href="#equipe">Equipe</a></li>
                <li><a href="#parceiros">Parceiros</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
              <div className="nav-buttons">
                <a href="#" className="btn btn-primary">Doar</a>
                <a href="/login" className="btn btn-outline">Entrar</a>
              </div>
            </nav>

            <button className="menu-toggle" aria-label="Menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-links">
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#segmentos">Segmentos</a></li>
            <li><a href="#impacto">Impacto</a></li>
            <li><a href="#cursos">Cursos</a></li>
            <li><a href="#equipe">Equipe</a></li>
            <li><a href="#parceiros">Parceiros</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <div className="mobile-buttons">
            <a href="#" className="btn btn-primary">Doar</a>
            <a href="#" className="btn btn-outline">Entrar</a>
          </div>
        </nav>
      </header>

      {/* O RESTANTE DO CONTEÚDO */}
      <main>
        <section className="hero">
        <div className="hero-slider">
            <div className="slide" style={{ backgroundImage: <img src={arte1} alt="Arte1" /> }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <h1>Transformando vidas através da educação criativa</h1>
                        <p className="subtitle">Empoderamos pessoas com conhecimento inovador para mudar suas vidas e a sociedade</p>
                        <div className="hero-buttons">
                            <a href="#cursos" className="btn btn-primary">Conheça nossos cursos</a>
                            <a href="#sobre" className="btn btn-outline">Saiba mais</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide" style={{ backgroundImage: `url(${arte2})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <h1>Educação que transforma realidades</h1>
                        <p className="subtitle">Projetos inovadores para todas as idades e necessidades</p>
                        <div className="hero-buttons">
                            <a href="#segmentos" className="btn btn-primary">Nossos segmentos</a>
                            <a href="#impacto" className="btn btn-outline">Nosso impacto</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="slider-controls">
            <button className="slider-prev"><i className="fas fa-chevron-left"></i></button>
            <div className="slider-dots">
                <button className="dot active"></button>
                <button className="dot"></button>
            </div>
            <button className="slider-next"><i className="fas fa-chevron-right"></i></button>
        </div>
    </section>

    {/*  About Section  */}
    <section id="sobre" className="about-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Conheça o Instituto</span>
                <h2 className="section-title">Sobre Nós</h2>
                <div className="divider"></div>
            </div>

            <div className="about-content">
                <div className="about-text">
                    <p>O Instituto Criativo é uma ONG que nasceu para transformar a vida das pessoas por meio da educação criativa e inovadora, empoderando-as de conhecimento de qualidade e diferenciado que são aplicados nos estudos, negócios e na própria vida contribuindo com a evolução da sociedade.</p>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Anos de experiência</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">20K+</span>
                            <span className="stat-label">Pessoas impactadas</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Projetos realizados</span>
                        </div>
                    </div>
                </div>
                <div className="about-image">
                    <img src={juntos_fortes} alt="juntos_fortes"/>
                </div>
            </div>

            <div className="values-grid">
                <div className="value-card">
                    <div className="value-icon">
                        <i className="fas fa-bullseye"></i>
                    </div>
                    <h3>Missão</h3>
                    <p>Desenvolver e compartilhar projetos de educação criativa e inovadora que transformam a sociedade.</p>
                </div>
                <div className="value-card">
                    <div className="value-icon">
                        <i className="fas fa-eye"></i>
                    </div>
                    <h3>Visão</h3>
                    <p>Ser referência na educação, empreendedorismo e eventos criativos por meio do aprendizado inovador.</p>
                </div>
                <div className="value-card">
                    <div className="value-icon">
                        <i className="fas fa-heart"></i>
                    </div>
                    <h3>Valores</h3>
                    <ul className="value-list">
                        <li>Sustentabilidade</li>
                        <li>Ética, respeito e honestidade</li>
                        <li>Qualidade efetiva</li>
                        <li>Colaboração e comprometimento</li>
                        <li>Criatividade e Inovação</li>
                        <li>Aprendizagem qualitativa</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/*  Segments Section  */}
    <section id="segmentos" className="segments-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Nossas áreas de atuação</span>
                <h2 className="section-title">Segmentos</h2>
                <div className="divider"></div>
            </div>

            <div className="segments-grid">
                <div className="segment-card">
                    <div className="segment-icon">
                        <i className="fas fa-lightbulb"></i>
                    </div>
                    <h3>Aprendizado</h3>
                    <span className="segment-age">5 a 21 anos</span>
                    <p>Projeto de incentivo ao raciocínio lógico de crianças para desenvolver seu pensamento crítico, empreendedorismo, matemática e computação.</p>
                    <a href="#" className="btn btn-small">Saiba mais <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="segment-card">
                    <div className="segment-icon">
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <h3>Primeiro Emprego</h3>
                    <span className="segment-age">16 a 20 anos</span>
                    <p>Jovens em busca do primeiro emprego, para fornecer competências e habilidades, desenvolvimento pessoal e conhecimentos necessários para ingressar no mercado de trabalho.</p>
                    <a href="#" className="btn btn-small">Saiba mais <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="segment-card">
                    <div className="segment-icon">
                        <i className="fas fa-sync-alt"></i>
                    </div>
                    <h3>Recolocação</h3>
                    <span className="segment-age">21 a 60 anos</span>
                    <p>Busca de novos caminhos no mercado, através da educação e capacitação.</p>
                    <a href="#" className="btn btn-small">Saiba mais <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="segment-card">
                    <div className="segment-icon">
                        <i className="fas fa-heartbeat"></i>
                    </div>
                    <h3>Bem-Estar</h3>
                    <span className="segment-age">+50 anos</span>
                    <p>Promovendo assistência para desenvolvimento social, por meio de atividades de conversação, terapias, doação de alimentos e palestras de reeducação da mente.</p>
                    <a href="#" className="btn btn-small">Saiba mais <i className="fas fa-arrow-right"></i></a>
                </div>
            </div>

            <div className="cta-buttons">
                <a href="#" className="btn btn-primary">Quero ser voluntário</a>
                <a href="#" className="btn btn-outline">Quero apoiar</a>
            </div>
        </div>
    </section>

    {/*  Impact Section  */}
    <section id="impacto" className="impact-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Nossa contribuição</span>
                <h2 className="section-title">Impacto Social</h2>
                <div className="divider"></div>
            </div>

            <div className="impact-grid">
                <div className="impact-card">
                    <div className="impact-number">100+</div>
                    <div className="impact-label">Projetos criativos</div>
                </div>
                <div className="impact-card">
                    <div className="impact-number">20.000+</div>
                    <div className="impact-label">Estudantes impactados</div>
                </div>
                <div className="impact-card">
                    <div className="impact-number">30.000+</div>
                    <div className="impact-label">Pessoas alcançadas</div>
                </div>
                <div className="impact-card">
                    <div className="impact-number">2.500+</div>
                    <div className="impact-label">Educadores desenvolvidos</div>
                </div>
            </div>

            <div className="impact-testimonials">
                <div className="testimonial-card">
                    <div className="testimonial-content">
                        <p>"O Instituto Criativo mudou minha vida! Consegui meu primeiro emprego após participar do programa de capacitação."</p>
                    </div>
                    <div className="testimonial-author">
                        <img src={depoimento1} alt="depoimento1" />
                        <div>
                            <h4>Maria Silva</h4>
                            <span>Ex-aluna</span>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card">
                    <div className="testimonial-content">
                        <p>"Como educador, os cursos do Instituto me deram novas ferramentas para engajar meus alunos de forma criativa."</p>
                    </div>
                    <div className="testimonial-author">
                        <img src={depoimento2} alt="depoimento2" />
                        <div>
                            <h4>Carlos Mendes</h4>
                            <span>Professor</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  Courses Section  */}
    <section id="cursos" className="courses-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Nossas soluções educacionais</span>
                <h2 className="section-title">Cursos e Eventos</h2>
                <div className="divider"></div>
            </div>

            <div className="courses-tabs">
                <button className="tab-btn active" data-tab="cursos">Cursos</button>
                <button className="tab-btn" data-tab="eventos">Eventos</button>
                <button className="tab-btn" data-tab="workshops">Workshops</button>
            </div>

            <div className="courses-grid">
                <div className="course-card">
                    <div className="course-image">
                      <img src={curso1} alt="Curso1" />
                        <span className="course-tag">Gratuito</span>
                    </div>
                    <div className="course-content">
                        <h3>Soluções de IA no Git Hub</h3>
                        <p className="course-description">Aprenda a utilizar ferramentas de inteligência artificial disponíveis no GitHub para resolver problemas reais.</p>
                        <div className="course-meta">
                            <span><i className="far fa-clock"></i> 20 horas</span>
                            <span><i className="fas fa-user-graduate"></i> Iniciante</span>
                        </div>
                        <a href="#" className="btn btn-small">Saiba mais</a>
                    </div>
                </div>
                <div className="course-card">
                    <div className="course-image">
                        <img src={curso2} alt="Curso2" />
                        <span className="course-tag">Novo</span>
                    </div>
                    <div className="course-content">
                        <h3>Empreendedorismo Criativo</h3>
                        <p className="course-description">Desenvolva habilidades empreendedoras com abordagens inovadoras para criar negócios sustentáveis.</p>
                        <div className="course-meta">
                            <span><i className="far fa-clock"></i> 30 horas</span>
                            <span><i className="fas fa-user-graduate"></i> Intermediário</span>
                        </div>
                        <a href="#" className="btn btn-small">Saiba mais</a>
                    </div>
                </div>
                <div className="course-card">
                    <div className="course-image">
                        <img src={curso3} alt="Curso3" />
                        <span className="course-tag">Popular</span>
                    </div>
                    <div className="course-content">
                        <h3>Programação para Iniciantes</h3>
                        <p className="course-description">Aprenda os fundamentos da programação e dê os primeiros passos no desenvolvimento de software.</p>
                        <div className="course-meta">
                            <span><i className="far fa-clock"></i> 40 horas</span>
                            <span><i className="fas fa-user-graduate"></i> Iniciante</span>
                        </div>
                        <a href="#" className="btn btn-small">Saiba mais</a>
                    </div>
                </div>
            </div>

            <div className="benefits-section">
                <h3>Benefícios dos nossos cursos</h3>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <h4>Gratuito</h4>
                        <p>Você não paga nada para fazer os cursos. É só se matricular e começar a estudar de qualquer lugar que tenha conexão com a Internet.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <h4>Certificado</h4>
                        <p>Ao ser aprovado nos cursos e nos eventos, você mesmo imprime o seu certificado!</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className="fas fa-briefcase"></i>
                        </div>
                        <h4>Carreira</h4>
                        <p>São varias oportunidades para você poder enriquecer seu currículo e aumentar suas chances de ingresso no mercado de trabalho.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Team Section  */}
    <section id="equipe" className="team-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Conheça quem faz acontecer</span>
                <h2 className="section-title">Nossa Equipe</h2>
                <div className="divider"></div>
            </div>

            <div className="team-leaders">
                <div className="leader-card">
                    <div className="leader-image">
                      <img src={lucy_crianca} alt="Lucy+Criança"/>

                    </div>
                    <div className="leader-info">
                        <h3>Lucy Mari</h3>
                        <span className="leader-position">Presidente e fundadora</span>
                        <p>Empresária, educadora, psicoterapeuta, formada em matemática, mestre em ciência da computação, MBA em educação e doutora em engenharia de computação pela USP.</p>
                        <div className="leader-social">
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                <div className="leader-card">
                    <div className="leader-image">
                      <img src={vice_presidente} alt="Vice-Presidente"/>
                    </div>
                    <div className="leader-info">
                        <h3>Rodrigo Assirati</h3>
                        <span className="leader-position">Vice-presidente</span>
                        <p>Educador e empreendedor, especialista de em educação pela Microsoft e consultor de tecnologia em várias empresas.</p>
                        <div className="leader-social">
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="team-grid">
                <div className="team-card">
                    <div className="team-image">
                        <img src={deyse} alt="Deyse Santana"/>
                    </div>
                    <h3>Deyse Santana</h3>
                    <span className="team-position">Analista Financeira</span>
                </div>
                <div className="team-card">
                    <div className="team-image">
                        <img src={joao} alt="João Querlon"/>
                    </div>
                    <h3>João Querlon</h3>
                    <span className="team-position">Conselheiro fiscal</span>
                </div>
                <div className="team-card">
                    <div className="team-image">
                        <img src={felipe} alt="Felipe Almeida"/>
                    </div>
                    <h3>Felipe Almeida</h3>
                    <span className="team-position">Designer</span>
                </div>
                <div className="team-card">
                    <div className="team-image">
                        <img src={joaquim} alt="Joaquim Roberto"/>
                    </div>
                    <h3>Joaquim Roberto</h3>
                    <span className="team-position">Conselheiro</span>
                </div>
                <div className="team-card">
                    <div className="team-image">
                        <img src={carlos} alt="Carlos E. Albertini"/>
                    </div>
                    <h3>Carlos E. Albertini</h3>
                    <span className="team-position">Psicoterapeuta</span>
                </div>
                <div className="team-card">
                    <div className="team-image">
                        <img src={marcos} alt="Marcos Brito"/>
                    </div>
                    <h3>Marcos Brito</h3>
                    <span className="team-position">Gestor de conteúdo</span>
                </div>
            </div>
        </div>
    </section>
    </main>

    {/*  Partners Section  */}
    <section id="parceiros" className="partners-section">
        <div className="container">
            <div className="section-header">
                <span className="section-subtitle">Nossas parcerias</span>
                <h2 className="section-title">Parceiros e Apoiadores</h2>
                <div className="divider"></div>
            </div>

            <div className="partners-grid">
                <div className="partner-logo">
                    <img src={logo_google} alt="Google" />
                </div>
                <div className="partner-logo">
                    <img src={logo_microsoft} alt="Microsoft" />
                </div>
                <div className="partner-logo">
                  <img src={logo_ibm} alt="IBM" />
                </div>
                <div className="partner-logo">
                  <img src={logo_fatec} alt="Fatec" />
                </div>
                <div className="partner-logo">
                    <img src={logo_fatecmogi} alt="Fatec Mogi" />
                </div>
                <div className="partner-logo">
                    <img src={logo_usp} alt="USP" />
                </div>
                <div className="partner-logo">
                    <img src={logo_univesp} alt="Univesp" />
                </div>
                <div className="partner-logo">
                    <img src={logo_sebrae} alt="Sebrae" />
                </div>
                <div className="partner-logo">
                    <img src={logo_esmusp} alt="ESMUSP" />
                </div>
            </div>
        </div>
    </section>

    {/* Contact Section  */}
    <section id="contato" className="contact-section">
        <div className="container">
            <div className="contact-content">
                <div className="contact-info">
                    <div className="section-header">
                        <span className="section-subtitle">Fale conosco</span>
                        <h2 className="section-title">Contato</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info-text">
                                <h4>Endereço</h4>
                                <p>Rua Criativa, 123 - Inovação, São Paulo - SP</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="info-text">
                                <h4>Telefone</h4>
                                <p>(11) 99999-9999</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info-text">
                                <h4>Email</h4>
                                <p>contato@institutocriativo.org</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="info-text">
                                <h4>Horário</h4>
                                <p>Segunda a Sexta: 9h às 18h</p>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div className="contact-form">
                    <h3>Envie sua mensagem</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Seu nome" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Seu e-mail" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Assunto" required/>
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Sua mensagem" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    {/*  Newsletter Section  */}
    <section className="newsletter-section">
        <div className="container">
            <div className="newsletter-content">
                <h2>Assine nossa newsletter</h2>
                <p>Receba atualizações sobre nossos projetos, cursos e eventos.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Seu melhor e-mail" required/>
                    <button type="submit" className="btn btn-primary">Assinar</button>
                </form>
            </div>
        </div>
    </section>

    {/*  Footer  */}
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Instituto Criativo" />
                    <p>Transformando vidas através da educação criativa e inovadora</p>
                </div>

                <div className="footer-links">
                    <div className="links-column">
                        <h3>Instituto</h3>
                        <ul>
                            <li><a href="#sobre">Sobre Nós</a></li>
                            <li><a href="#equipe">Nossa Equipe</a></li>
                            <li><a href="#impacto">Impacto Social</a></li>
                            <li><a href="#parceiros">Parceiros</a></li>
                            <li><a href="#">Transparência</a></li>
                        </ul>
                    </div>
                    <div className="links-column">
                        <h3>Cursos</h3>
                        <ul>
                            <li><a href="#cursos">Todos os Cursos</a></li>
                            <li><a href="#">Para Crianças</a></li>
                            <li><a href="#">Para Jovens</a></li>
                            <li><a href="#">Para Adultos</a></li>
                            <li><a href="#">Para Idosos</a></li>
                        </ul>
                    </div>
                    <div className="links-column">
                        <h3>Suporte</h3>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contato</a></li>
                            <li><a href="#">Termos de Uso</a></li>
                            <li><a href="#">Política de Privacidade</a></li>
                            <li><a href="#">Trabalhe Conosco</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="copyright">
                    <p>© 2023 Instituto Criativo. Todos os direitos reservados.</p>
                </div>
                <div className="footer-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </footer>

    </>
  );
};

export default Home;
