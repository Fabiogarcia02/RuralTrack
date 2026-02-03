    import React, { useState, useEffect } from 'react';
    import { CloudSun, Droplets, Sprout, Search, MapPin, Sun, AlertCircle, Loader2 } from 'lucide-react';
    import './Clima.css';

    const DB_CULTIVOS = {
        Verao: { nome: 'Verão', sugestao: 'Milho e Soja', cor: '#f59e0b', culturas: ['Milho', 'Soja'] },
        Outono: { nome: 'Outono', sugestao: 'Trigo e Cevada', cor: '#d97706', culturas: ['Trigo', 'Cevada'] },
        Inverno: { nome: 'Inverno', sugestao: 'Hortaliças e Aveia', cor: '#2563eb', culturas: ['Alface', 'Aveia'] },
        Primavera: { nome: 'Primavera', sugestao: 'Girassol e Algodão', cor: '#10b981', culturas: ['Girassol', 'Algodão'] }
    };

    const SUGESTOES_CIDADES = ["Uberlândia", "Belo Horizonte", "São Paulo", "Curitiba", "Goiânia", "Ribeirão Preto"];

    const Clima = () => {
        const [cidadeBusca, setCidadeBusca] = useState('Uberlândia');
        const [weatherData, setWeatherData] = useState<any>(null);
        const [loading, setLoading] = useState(false);
        const [erro, setErro] = useState<string | null>(null);

        // IMPORTANTE: Se o erro 401 persistir, você precisará gerar uma nova chave no site do OpenWeather
        const API_KEY = "3659070035de7b48e8c6652795435233";

        const getEstacao = () => {
            const mes = new Date().getMonth() + 1;
            if (mes >= 1 && mes <= 3) return DB_CULTIVOS.Verao;
            if (mes >= 4 && mes <= 6) return DB_CULTIVOS.Outono;
            if (mes >= 7 && mes <= 9) return DB_CULTIVOS.Inverno;
            return DB_CULTIVOS.Primavera;
        };

        const estacao = getEstacao();

        const fetchWeather = async (cidade: string) => {
            if (!cidade.trim()) return;
            
            setLoading(true);
            setErro(null);

            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${API_KEY}`;
                
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setWeatherData(data);
                    setCidadeBusca(data.name);
                } else {
                    // Tratamento específico para erro de API Key ou Cidade
                    const msgErro = data.cod === "401" 
                        ? "Chave de API Inválida ou em ativação. Verifique sua conta." 
                        : "Cidade não encontrada.";
                    setErro(msgErro);
                }
            } catch (err) {
                setErro("Erro de conexão com o serviço de clima.");
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchWeather('Uberlândia');
        }, []);

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') fetchWeather(cidadeBusca);
        };

        return (
            <div className="clima-page">
                <header className="season-banner" style={{ borderLeft: `8px solid ${estacao.cor}` }}>
                    <div className="season-info">
                        <Sun color={estacao.cor} size={32} />
                        <div>
                            <h3>Estação: {estacao.nome}</h3>
                            <p>Cultivo Favorável: <strong>{estacao.sugestao}</strong></p>
                        </div>
                    </div>

                    <div className="search-container">
                        <div className="search-mini">
                            <input 
                                type="text" 
                                list="cidades-sugestoes"
                                value={cidadeBusca} 
                                onChange={(e) => setCidadeBusca(e.target.value)} 
                                onKeyDown={handleKeyDown}
                                placeholder="Mudar cidade..." 
                            />
                            <button onClick={() => fetchWeather(cidadeBusca)} disabled={loading}>
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            </button>
                        </div>
                        <datalist id="cidades-sugestoes">
                            {SUGESTOES_CIDADES.map(c => <option key={c} value={c} />)}
                        </datalist>
                    </div>
                </header>

                <div className="clima-grid">
                    <main>
                        {erro ? (
                            <div className="weather-error-card">
                                <AlertCircle size={48} color="#ef4444" />
                                <p>{erro}</p>
                                <button onClick={() => fetchWeather('Uberlândia')}>Resetar para Uberlândia</button>
                            </div>
                        ) : (
                            <div className={`weather-focus-card ${loading ? 'loading-opacity' : ''}`}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <span className="tag-previsao">Condição em Tempo Real</span>
                                        <h2>{weatherData?.name || "Carregando..."}</h2>
                                        <p className="weather-desc">
                                            {weatherData?.weather?.[0]?.description || 'Buscando detalhes...'}
                                        </p>
                                    </div>
                                    <MapPin size={24} color="#A3E635" />
                                </div>

                                <div className="big-temp">
                                    {weatherData ? Math.round(weatherData.main.temp) : '--'}°C
                                </div>

                                <div className="weather-details">
                                    <div className="detail-item">
                                        <Droplets size={20} color="#3b82f6" /> 
                                        <span>{weatherData?.main.humidity || 0}% Umidade</span>
                                    </div>
                                    <div className="detail-item">
                                        <CloudSun size={20} color="#f59e0b" /> 
                                        <span>Sensação: {weatherData ? Math.round(weatherData.main.feels_like) : '--'}°C</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>

                    <aside>
                        <div className="advisor-card">
                            <div className="advisor-header">
                                <Sprout color="#A3E635" size={24} />
                                <h4>Dica Agronômica</h4>
                            </div>
                            {weatherData && !erro && (
                                <div className={`status-box ${weatherData.main.humidity > 75 ? 'warning' : 'success'}`}>
                                    {weatherData.main.humidity > 75 
                                        ? `⚠️ Umidade alta (${weatherData.main.humidity}%). Risco de fungos no cultivo de ${estacao.culturas[0]}.`
                                        : `✅ Condições ideais em ${weatherData.name} para o manejo do ${estacao.culturas[1]}.`}
                                </div>
                            )}
                            {!weatherData && !erro && <p>Aguardando dados...</p>}
                        </div>
                    </aside>
                </div>
            </div>
        );
    };

    export default Clima;