        import React, { useState } from 'react';
        import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';
        import './Calendario.css';

        // Cores padrão para cada tipo de atividade manejo rural
        const CORES_MODULOS = {
            plantio: '#10b981',   // Verde
            colheita: '#f59e0b',  // Amarelo/Laranja
            manejo: '#3b82f6',    // Azul
            alerta: '#ef4444',    // Vermelho
        };

        const Calendario = () => {
            const [dataAtual, setDataAtual] = useState(new Date());
            const [mostrarForm, setMostrarForm] = useState(false);
            
            // Estado inicial com alguns eventos de exemplo
            const [eventos, setEventos] = useState([
                { id: 1, dia: 5, mes: 2, tipo: 'plantio', desc: 'Plantio de Milho - Setor Norte' },
                { id: 2, dia: 12, mes: 2, tipo: 'manejo', desc: 'Aplicação de Fertilizante NPK' },
                { id: 3, dia: 20, mes: 2, tipo: 'alerta', desc: 'Manutenção Preventiva do Trator' },
                { id: 4, dia: 25, mes: 2, tipo: 'colheita', desc: 'Previsão de Colheita Silagem' },
            ]);

            const [novoEvento, setNovoEvento] = useState({ dia: '', tipo: 'plantio', desc: '' });

            // Funções de Navegação
            const mudarMes = (offset: number) => {
                setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + offset, 1));
            };

            const adicionarEvento = (e: React.FormEvent) => {
                e.preventDefault();
                if (!novoEvento.dia || !novoEvento.desc) return;

                const eventoCompleto = {
                    id: Date.now(),
                    dia: parseInt(novoEvento.dia),
                    mes: dataAtual.getMonth() + 1,
                    tipo: novoEvento.tipo,
                    desc: novoEvento.desc
                };

                setEventos([...eventos, eventoCompleto]);
                setNovoEvento({ dia: '', tipo: 'plantio', desc: '' });
                setMostrarForm(false);
            };

            const excluirEvento = (id: number) => {
                setEventos(eventos.filter(ev => ev.id !== id));
            };

            // Cálculos do Calendário
            const diasNoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
            const primeiroDiaSemana = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();
            const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
            const vazios = Array.from({ length: primeiroDiaSemana }, (_, i) => i);

            return (
                <div className="calendario-wrapper">
                    <div className="calendario-container">
                        <header className="cal-header">
                            <div className="cal-title">
                                <CalendarIcon size={32} color="#A3E635" />
                                <h2>Calendário Agrícola <span className="ano-label">{dataAtual.getFullYear()}</span></h2>
                            </div>
                            
                            <div className="cal-controls">
                                <button className="btn-add" onClick={() => setMostrarForm(!mostrarForm)}>
                                    {mostrarForm ? <X size={20} /> : <Plus size={20} />}
                                    {mostrarForm ? 'Cancelar' : 'Novo Evento'}
                                </button>
                                <div className="cal-nav">
                                    <button onClick={() => mudarMes(-1)}><ChevronLeft /></button>
                                    <span className="mes-display">
                                        {dataAtual.toLocaleString('pt-br', { month: 'long' }).toUpperCase()}
                                    </span>
                                    <button onClick={() => mudarMes(1)}><ChevronRight /></button>
                                </div>
                            </div>
                        </header>

                        {mostrarForm && (
                            <div className="form-sobreposto">
                                <form className="form-evento" onSubmit={adicionarEvento}>
                                    <div className="campo">
                                        <label>Dia</label>
                                        <input type="number" min="1" max="31" value={novoEvento.dia} onChange={e => setNovoEvento({...novoEvento, dia: e.target.value})} placeholder="Ex: 10" required />
                                    </div>
                                    <div className="campo">
                                        <label>Atividade</label>
                                        <input type="text" value={novoEvento.desc} onChange={e => setNovoEvento({...novoEvento, desc: e.target.value})} placeholder="Descrição do manejo..." required />
                                    </div>
                                    <div className="campo">
                                        <label>Tipo</label>
                                        <select value={novoEvento.tipo} onChange={e => setNovoEvento({...novoEvento, tipo: e.target.value})}>
                                            <option value="plantio">Plantio</option>
                                            <option value="manejo">Manejo</option>
                                            <option value="colheita">Colheita</option>
                                            <option value="alerta">Alerta</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-salvar">Agendar</button>
                                </form>
                            </div>
                        )}

                        <div className="cal-grid">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                <div key={d} className="cal-weekday">{d}</div>
                            ))}

                            {vazios.map(v => <div key={`v-${v}`} className="cal-day empty"></div>)}

                            {dias.map(dia => {
                                const eventosDoDia = eventos.filter(ev => 
                                    ev.dia === dia && ev.mes === (dataAtual.getMonth() + 1)
                                );

                                return (
                                    <div key={dia} className="cal-day">
                                        <span className="day-number">{dia}</span>
                                        <div className="event-dots">
                                            {eventosDoDia.map((ev) => (
                                                <div key={ev.id} className="dot-wrapper">
                                                    <div 
                                                        className="dot" 
                                                        style={{ backgroundColor: CORES_MODULOS[ev.tipo as keyof typeof CORES_MODULOS] }}
                                                    />
                                                    {/* BALÃO DE INFORMAÇÃO (TOOLTIP) */}
                                                    <div className="event-tooltip">
                                                        <div className="tooltip-header">
                                                            <span style={{ color: CORES_MODULOS[ev.tipo as keyof typeof CORES_MODULOS] }}>
                                                                ● {ev.tipo.toUpperCase()}
                                                            </span>
                                                            <button onClick={() => excluirEvento(ev.id)} className="btn-del">
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                        <p>{ev.desc}</p>
                                                        <div className="tooltip-arrow"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <footer className="cal-legend">
                            {Object.entries(CORES_MODULOS).map(([tipo, cor]) => (
                                <div key={tipo} className="legend-item">
                                    <div className="dot-mini" style={{ backgroundColor: cor }}></div>
                                    <span>{tipo}</span>
                                </div>
                            ))}
                        </footer>
                    </div>
                </div>
            );
        };

        export default Calendario;