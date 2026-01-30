    
    import './Home.css';
    import { TrendingUp, Thermometer, Droplets } from 'lucide-react';

    const Home = () => {
    return (
        <div className="home-page">
        {/* Espaço para Imagem de Banner */}
        <section className="welcome-banner">
            <div className="image-placeholder">
            <div className="welcome-card">
                <h2>Bem vindo, ao Rural Track!</h2>
                <p>Monitore sua fazenda com inteligência e controle seus gastos.</p>
                <button className="btn-primary">Fique por dentro</button>
            </div>
            </div>
        </section>

        {/* Grid de Resumo Estilo SaaS */}
        <div className="dashboard-grid">
            <div className="card agrometeo">
            <div className="card-header">
                <h3>Clima e Plantio</h3>
                <Thermometer size={18} />
            </div>
            <div className="card-content">
                <div className="status-indicator favoravel"></div>
                <p>Favorável para Plantio</p>
                <span>28°C | 65% Umidade</span>
            </div>
            </div>

            <div className="card financeiro">
            <div className="card-header">
                <h3>Financeiro</h3>
                <TrendingUp size={18} />
            </div>
            <div className="card-content">
                <h4>ROI Estimado: 1.4</h4>
                <p className="profit">R$ XX.006,XX</p>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Home;