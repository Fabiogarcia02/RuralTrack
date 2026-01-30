    import React from 'react';
    import './Home.css';
    import { TrendingUp, Thermometer } from 'lucide-react';
    import fazendaImage from '../../assets/imgs/fazenda.jpg'; 

    const Home = () => {
    return (
        <div className="home-page">
        {/* Seção do Banner Principal */}
        <section className="welcome-banner">
            <div className="image-placeholder">
            <img src={fazendaImage} alt="Panorama da Fazenda" className="banner-image" />
            <div className="welcome-card">
                <h2>Bem vindo ao Rural Track!</h2>
                <p>Monitore sua fazenda com inteligência de dados e controle total dos seus gastos em tempo real.</p>
                <button className="btn-primary">Fique por dentro</button>
            </div>
            </div>
        </section>

        {/* Grid de Resumo */}
        <div className="dashboard-grid">
            <div className="card agrometeo">
            <div className="card-header">
                <h3>Clima e Plantio</h3>
                <Thermometer size={20} color="#64748B" />
            </div>
            <div className="card-content">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div className="status-indicator favoravel"></div>
                <span style={{ fontWeight: 600, color: '#059669' }}>Favorável para Plantio</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>28°C | 65% Umidade do Solo</p>
            </div>
            </div>

            <div className="card financeiro">
            <div className="card-header">
                <h3>Performance Financeira</h3>
                <TrendingUp size={20} color="#10b981" />
            </div>
            <div className="card-content">
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>ROI Estimado da Safra</span>
                <h4>1.4x</h4>
                <p className="profit">R$ 145.006,00</p>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Home;