    import React, { useState, useEffect } from 'react';
    import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';
    import './Calendario.css';

    // Cores para identificar as atividades e os animais
    const CORES_MODULOS = {
        plantio: '#10b981',   // Verde
        colheita: '#f59e0b',  // Laranja
        manejo: '#3b82f6',    // Azul
        alerta: '#ef4444',    // Vermelho
        animal: '#8b5cf6',    // Roxo (para animais vindo do outro modal)
    };

    type TipoEvento = keyof typeof CORES_MODULOS;

    interface Evento {
        id: string | number;
        dia: number;
        mes: number;
        ano: number;
        tipo: TipoEvento;
        desc: string;
        isAnimal?: boolean;
    }

    const Calendario = () => {
        const [dataAtual, setDataAtual] = useState(new Date());
        const [mostrarForm, setMostrarForm] = useState(false);
        const [eventos, setEventos] = useState<Evento[]>([]);
        const [novoEvento, setNovoEvento] = useState({ dia: '', tipo: 'plantio' as TipoEvento, desc: '' });

        // FUNÇÃO PARA CARREGAR E UNIFICAR DADOS
        const carregarTudo = () => {
            // 1. Pega eventos manuais do calendário
            const salvosCal = localStorage.getItem('@AgroCalendar:eventos');
            const eventosCal: Evento[] = salvosCal ? JSON.parse(salvosCal) : [];

            // 2. Pega animais do outro modal (Ajuste a chave se necessário)
            const salvosAnimais = localStorage.getItem('@Fazenda:animais');
            const animaisExternos = salvosAnimais ? JSON.parse(salvosAnimais) : [];

            // 3. Converte animais para o formato do calendário
            const animaisConvertidos: Evento[] = animaisExternos.map((a: any) => {
                const data = new Date(a.dataAbate + 'T12:00:00');
                return {
                    id: a.id,
                    dia: data.getDate(),
                    mes: data.getMonth(),
                    ano: data.getFullYear(),
                    tipo: 'animal' as TipoEvento,
                    desc: `🐂 ${a.nome}`,
                    isAnimal: true
                };
            });

            // 4. Une as duas listas
            setEventos([...eventosCal, ...animaisConvertidos]);
        };

        useEffect(() => {
            carregarTudo();
            // Atualiza se houver mudança em outra aba/componente
            window.addEventListener('storage', carregarTudo);
            return () => window.removeEventListener('storage', carregarTudo);
        }, []);

        const mudarMes = (offset: number) => {
            setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + offset, 1));
        };

        const adicionarEvento = (e: React.FormEvent) => {
            e.preventDefault();
            if (!novoEvento.dia || !novoEvento.desc) return;

            const novo: Evento = {
                id: Date.now(),
                dia: parseInt(novoEvento.dia),
                mes: dataAtual.getMonth(),
                ano: dataAtual.getFullYear(),
                tipo: novoEvento.tipo,
                desc: novoEvento.desc
            };

            const atualizados = [...eventos.filter(ev => !ev.isAnimal), novo];
            localStorage.setItem('@AgroCalendar:eventos', JSON.stringify(atualizados));
            carregarTudo();
            setMostrarForm(false);
            setNovoEvento({ dia: '', tipo: 'plantio', desc: '' });
        };

        const excluirEvento = (id: string | number, e: React.MouseEvent, isAnimal?: boolean) => {
            e.stopPropagation();
            if (isAnimal) {
                alert("Para excluir um animal, use a tela de Rebanho.");
                return;
            }
            const salvosCal = localStorage.getItem('@AgroCalendar:eventos');
            const eventosCal: Evento[] = salvosCal ? JSON.parse(salvosCal) : [];
            const filtrados = eventosCal.filter(ev => ev.id !== id);
            localStorage.setItem('@AgroCalendar:eventos', JSON.stringify(filtrados));
            carregarTudo();
        };

        const diasNoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
        const primeiroDiaSemana = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();
        const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
        const vazios = Array.from({ length: primeiroDiaSemana }, (_, i) => i);

        return (
            <div className="calendario-wrapper">
                <div className="calendario-container">
                    <header className="cal-header">
                        <div className="cal-title">
                            <CalendarIcon size={28} color="#A3E635" />
                            <h2>Agenda Rural <span className="ano-label">{dataAtual.getFullYear()}</span></h2>
                        </div>
                        <div className="cal-controls">
                            <button className="btn-add" onClick={() => setMostrarForm(true)}><Plus size={18}/> Novo</button>
                            <div className="cal-nav">
                                <button onClick={() => mudarMes(-1)}><ChevronLeft /></button>
                                <span className="mes-display">{dataAtual.toLocaleString('pt-br', { month: 'long' }).toUpperCase()}</span>
                                <button onClick={() => mudarMes(1)}><ChevronRight /></button>
                            </div>
                        </div>
                    </header>

                    <div className="cal-grid">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d} className="cal-weekday">{d}</div>)}
                        {vazios.map(v => <div key={`v-${v}`} className="cal-day empty"></div>)}
                        {dias.map(dia => {
                            const eventosDoDia = eventos.filter(ev => 
                                ev.dia === dia && ev.mes === dataAtual.getMonth() && ev.ano === dataAtual.getFullYear()
                            );

                            return (
                                <div key={dia} className="cal-day" onClick={() => { setNovoEvento({...novoEvento, dia: dia.toString()}); setMostrarForm(true); }}>
                                    <span className="day-number">{dia}</span>
                                    <div className="event-stack">
                                        {eventosDoDia.map((ev) => (
                                            <div key={ev.id} className="event-bar" style={{ borderLeftColor: CORES_MODULOS[ev.tipo], backgroundColor: `${CORES_MODULOS[ev.tipo]}20` }}>
                                                <span className="event-text">{ev.desc}</span>
                                                {!ev.isAnimal && (
                                                    <button onClick={(e) => excluirEvento(ev.id, e)} className="btn-mini-del"><X size={10}/></button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {mostrarForm && (
                        <div className="form-modal-overlay" onClick={() => setMostrarForm(false)}>
                            <form className="form-card" onSubmit={adicionarEvento} onClick={e => e.stopPropagation()}>
                                <h3>Nova Atividade - Dia {novoEvento.dia}</h3>
                                <input type="text" placeholder="Ex: Vacinação, Plantio de milho..." value={novoEvento.desc} onChange={e => setNovoEvento({...novoEvento, desc: e.target.value})} required />
                                <select value={novoEvento.tipo} onChange={e => setNovoEvento({...novoEvento, tipo: e.target.value as TipoEvento})}>
                                    <option value="plantio">Plantio</option>
                                    <option value="manejo">Manejo</option>
                                    <option value="colheita">Colheita</option>
                                    <option value="alerta">Alerta</option>
                                </select>
                                <button type="submit" className="btn-save">Agendar</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default Calendario;