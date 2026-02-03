        import React, { useState } from 'react';
        import { 
        Stethoscope, 
        Plus, 
        Syringe, 
        Database, 
        Calendar as CalendarIcon, 
        Trash2, 
        ChevronRight,
        TrendingUp,
        Activity
        } from 'lucide-react';
        import './Cuidados.css';

        const Cuidados = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [manejoType, setManejoType] = useState<'saude' | 'suplemento'>('saude');

        // Este estado será preenchido pelo seu Banco de Dados futuramente
        const [registros, setRegistros] = useState([
            {
            id: 1,
            tipo: 'saude',
            animal: 'Boi Nelore - ID 450',
            produto: 'Vacina Aftosa',
            data: '2026-01-31',
            quantidade: '5ml',
            observacao: 'Reforço semestral'
            }
        ]);

        return (
            <div className="manejo-page">
            {/* Header da Página */}
            <header className="manejo-header">
                <div className="header-text">
                <h1>Manejo e Cuidados</h1>
                <p>Gestão integrada de saúde e nutrição do rebanho</p>
                </div>
                <div className="header-actions">
                <button className="btn-new" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Novo Registro
                </button>
                </div>
            </header>

            {/* Cards de Métricas Rápidas */}
            <section className="stats-grid">
                <div className="stat-card">
                <div className="stat-icon purple"><Stethoscope size={24} /></div>
                <div className="stat-data">
                    <span>Manejos no Mês</span>
                    <strong>{registros.length}</strong>
                </div>
                </div>
                <div className="stat-card">
                <div className="stat-icon orange"><TrendingUp size={24} /></div>
                <div className="stat-data">
                    <span>Suplementação Ativa</span>
                    <strong>4 Lotes</strong>
                </div>
                </div>
            </section>

            {/* Lista de Registros Gerados pelo Usuário */}
            <div className="manejo-list">
                <div className="list-header">
                <h2>Registros Recentes</h2>
                <Activity size={18} />
                </div>

                {registros.length > 0 ? (
                <div className="grid-registros">
                    {registros.map((reg) => (
                    <div key={reg.id} className={`card-registro ${reg.tipo}`}>
                        <div className="card-top">
                        <span className="badge-tipo">
                            {reg.tipo === 'saude' ? <Syringe size={12} /> : <Database size={12} />}
                            {reg.tipo === 'saude' ? 'Saúde' : 'Nutrição'}
                        </span>
                        <button className="btn-del-mini"><Trash2 size={16} /></button>
                        </div>
                        
                        <div className="card-body">
                        <h4>{reg.animal}</h4>
                        <div className="info-item">
                            <span className="label">Produto:</span>
                            <span className="value">{reg.produto} ({reg.quantidade})</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Data:</span>
                            <span className="value">{reg.data}</span>
                        </div>
                        </div>

                        <div className="card-footer">
                        <span className="obs">{reg.observacao}</span>
                        <ChevronRight size={16} />
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="empty-state">
                    <p>Nenhum manejo registrado. Clique em "Novo Registro" para começar.</p>
                </div>
                )}
            </div>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-header">
                    <h2>Registrar Ação de Manejo</h2>
                    <button onClick={() => setIsModalOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
                    </div>

                    <form className="manejo-form">
                    <div className="type-selector">
                        <button 
                        type="button" 
                        className={manejoType === 'saude' ? 'active' : ''}
                        onClick={() => setManejoType('saude')}
                        >
                        <Stethoscope size={18} /> Saúde / Vet
                        </button>
                        <button 
                        type="button" 
                        className={manejoType === 'suplemento' ? 'active' : ''}
                        onClick={() => setManejoType('suplemento')}
                        >
                        <TrendingUp size={18} /> Nutrição
                        </button>
                    </div>

                    <div className="form-inputs">
                        <div className="input-group">
                        <label>Animal ou Lote (Puxado do Rebanho)</label>
                        <select required>
                            <option value="">Selecione o animal...</option>
                            {/* Aqui entrará o Map do seu Banco de Dados */}
                        </select>
                        </div>

                        <div className="input-group">
                        <label>Produto (Puxado do Inventário)</label>
                        <select required>
                            <option value="">Selecione o produto...</option>
                            {/* Aqui entrará o Map do seu Inventário */}
                        </select>
                        </div>

                        <div className="input-row">
                        <div className="input-group">
                            <label>Dosagem / Qtd</label>
                            <input type="text" placeholder="Ex: 5ml ou 2 sacos" />
                        </div>
                        <div className="input-group">
                            <label>Data</label>
                            <input type="date" />
                        </div>
                        </div>

                        <div className="input-group">
                        <label>Observações</label>
                        <textarea rows={3} placeholder="Descreva detalhes do manejo..."></textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-sec" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn-pri">Salvar Registro</button>
                    </div>
                    </form>
                </div>
                </div>
            )}
            </div>
        );
        };

        export default Cuidados;