        import React, { useState, useEffect } from 'react';
        import { CloudSun, Droplets, Sprout, Search, MapPin, Sun, AlertCircle, Loader2, Calendar } from 'lucide-react';
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
            const [weatherData, setWeatherData] = useState<any>(null); // Dados atuais
            const [forecastData, setForecastData] = useState<any[]>([]); // Dados da semana
            const [loading, setLoading] = useState(false);
            const [erro, setErro] = useState<string | null>(null);

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
                    // 1. Busca Clima Atual
                    const urlAtual = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${API_KEY}`;
                    // 2. Busca Previsão da Semana (Forecast)
                    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${API_KEY}`;

                    const [resAtual, resForecast] = await Promise.all([fetch(urlAtual), fetch(urlForecast)]);
                    
                    const dataAtual = await resAtual.json();
                    const dataForecast = await resForecast.json();

                    if (resAtual.ok && resForecast.ok) {
                        setWeatherData(dataAtual);
                        
                        // Filtra a lista para pegar apenas 1 horário por dia (ex: 12:00)
                        const diasUnicos = dataForecast.list.filter((leitura: any) => 
                            leitura.dt_txt.includes("12:00:00")
                        );
                        setForecastData(diasUnicos);
                        setCidadeBusca(dataAtual.name);
                    } else {
                        setErro("Cidade não encontrada ou erro na API.");
                    }
                } catch (err) {
                    setErro("Erro de conexão.");
                } finally {
                    setLoading(false);
                }
            };

            useEffect(() => {
                fetchWeather('Uberlândia');
            }, []);

            const formatarDia = (dataStr: string) => {
                const data = new Date(dataStr);
                return data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
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
                                    onKeyDown={(e) => e.key === 'Enter' && fetchWeather(cidadeBusca)}
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
                                    <button onClick={() => fetchWeather('Uberlândia')}>Resetar</button>
                                </div>
                            ) : (
                                <>
                                    {/* CARD DE HOJE */}
                                    <div className={`weather-focus-card ${loading ? 'loading-opacity' : ''}`}>
                                        <div className="card-top">
                                            <div>
                                                <span className="tag-previsao">Hoje</span>
                                                <h2>{weatherData?.name}</h2>
                                                <p className="weather-desc">{weatherData?.weather?.[0]?.description}</p>
                                            </div>
                                            <MapPin size={24} color="#A3E635" />
                                        </div>
                                        <div className="big-temp">
                                            {weatherData ? Math.round(weatherData.main.temp) : '--'}°C
                                        </div>
                                        <div className="weather-details">
                                            <div className="detail-item">
                                                <Droplets size={20} color="#3b82f6" /> 
                                                <span>{weatherData?.main.humidity}% Umidade</span>
                                            </div>
                                            <div className="detail-item">
                                                <CloudSun size={20} color="#f59e0b" /> 
                                                <span>Sensação: {weatherData ? Math.round(weatherData.main.feels_like) : '--'}°C</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* LISTA DA SEMANA */}
                                    <div className="forecast-section">
                                        <div className="section-title">
                                            <Calendar size={20} color="#A3E635" />
                                            <h4>Previsão para os Próximos Dias</h4>
                                        </div>
                                        <div className="forecast-list">
                                            {forecastData.map((item, index) => (
                                                <div key={index} className="forecast-item">
                                                    <span className="forecast-day">{formatarDia(item.dt_txt)}</span>
                                                    <img 
                                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                                                        alt="clima" 
                                                    />
                                                    <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
                                                    <span className="forecast-desc">{item.weather[0].description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>

                        <aside>
                            <div className="advisor-card">
                                <div className="advisor-header">
                                    <Sprout color="#A3E635" size={24} />
                                    <h4>Dica Agronômica</h4>
                                </div>
                                {weatherData && (
                                    <div className={`status-box ${weatherData.main.humidity > 75 ? 'warning' : 'success'}`}>
                                        {weatherData.main.humidity > 75 
                                            ? `⚠️ Umidade alta. Risco de fungos em ${estacao.culturas[0]}.`
                                            : `✅ Condições ideais para manejo de ${estacao.culturas[1]}.`}
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            );
        };

        export default Clima;