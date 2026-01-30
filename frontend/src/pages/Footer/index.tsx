    
    import React from 'react';
    import './Footer.css';
    import { Facebook, Instagram, Twitter, ShieldCheck, Leaf } from 'lucide-react';

    const Footer: React.FC = () => {
    return (
        <footer className="footer-dark">
        <div className="footer-content-wrapper">
            <div className="footer-brand-section">
            <div className="brand-logo">
                <Leaf size={24} color="#A3E635" />
                <h3>Rural Track</h3>
            </div>
            <p>Otimizando a produtividade agrícola com inteligência de dados e engenharia de precisão.</p>
            <div className="social-icons-row">
                <Facebook size={18} />
                <Instagram size={18} />
                <Twitter size={18} />
            </div>
            </div>

            <div className="footer-nav-groups">
            <div className="nav-group">
                <h4>MÓDULOS</h4>
                <a href="#">Agrometeorologia</a>
                <a href="#">Pecuária</a>
                <a href="#">Custos</a>
            </div>
            <div className="nav-group">
                <h4>SUPORTE</h4>
                <a href="#">Documentação</a>
                <a href="#">API</a>
                <a href="#">Contato</a>
            </div>
            </div>
        </div>

        <div className="footer-bottom-bar">
            <div className="copyright">
            © 2026 <span>GERMINAI</span>. Built for the future of farming.
            </div>
            <div className="security-tag">
            <ShieldCheck size={16} />
            <span>DADOS CRIPTOGRAFADOS</span>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;