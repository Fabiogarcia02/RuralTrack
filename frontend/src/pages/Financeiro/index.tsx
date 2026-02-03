        import React, { useState } from 'react';
        import { Plus, ArrowUpCircle, ArrowDownCircle, Trash2, Calendar, X, DollarSign } from 'lucide-react';
        import './Financeiro.css';

        const Financeiro = () => {
        const [showModal, setShowModal] = useState(false);
        const [transacoes, setTransacoes] = useState<any[]>([]);
        
        const [formData, setFormData] = useState({
            descricao: '',
            valor: '',
            tipo: 'entrada', 
            data: new Date().toISOString().split('T')[0],
            categoria: 'Gado'
        });

        // Cálculos automáticos
        const totalEntradas = transacoes
            .filter(t => t.tipo === 'entrada')
            .reduce((acc, curr) => acc + parseFloat(curr.valor || 0), 0);

        const totalSaidas = transacoes
            .filter(t => t.tipo === 'saida')
            .reduce((acc, curr) => acc + parseFloat(curr.valor || 0), 0);

        const saldoAtual = totalEntradas - totalSaidas;
        const previsaoLucro = saldoAtual * 1.15; // Exemplo de projeção

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const novaTransacao = { ...formData, id: Date.now() };
            setTransacoes([novaTransacao, ...transacoes]);
            setShowModal(false); // Fecha o modal
            setFormData({ ...formData, descricao: '', valor: '' }); // Limpa campos
        };

        return (
            <div className="financeiro-page">
            <header className="manejo-header">
                <div>
                <h1>Controle Financeiro</h1>
                <p>Entradas, saídas e previsões de lucro.</p>
                </div>
                {/* BOTÃO CORRIGIDO: Garanta que o onClick chame setShowModal(true) */}
                <button className="btn-new" onClick={() => setShowModal(true)}>
                <Plus size={20} /> Nova Transação
                </button>
            </header>

            <div className="finance-stats">
                <div className="card-finance entrada">
                <h3>Total Entradas</h3>
                <div className="valor positivo">R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="card-finance saida">
                <h3>Total Saídas</h3>
                <div className="valor negativo">R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="card-finance previsao">
                <h3>Projeção de Lucro</h3>
                <div className="valor" style={{color: '#84cc16'}}>R$ {previsaoLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <small>Estimativa para o próximo período</small>
                </div>
            </div>

            <div className="transacoes-container">
                <div className="table-header">
                <h3>Fluxo de Caixa</h3>
                <Calendar size={20} color="#A3E635" />
                </div>

                <div className="lista-transacoes">
                {transacoes.length === 0 ? (
                    <div className="empty-state">Nenhum lançamento financeiro até o momento.</div>
                ) : (
                    transacoes.map(t => (
                    <div key={t.id} className="transacao-item">
                        <span className="data-txt">{t.data}</span>
                        <div className="info-main">
                        <strong>{t.descricao}</strong>
                        <small>{t.categoria}</small>
                        </div>
                        <span className={`tag-fluxo ${t.tipo}`}>
                        {t.tipo === 'entrada' ? 'RECEITA' : 'DESPESA'}
                        </span>
                        <span className={`valor-txt ${t.tipo === 'entrada' ? 'positivo' : 'negativo'}`}>
                        R$ {parseFloat(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <button className="btn-del-mini" onClick={() => setTransacoes(transacoes.filter(x => x.id !== t.id))}>
                        <Trash2 size={16} />
                        </button>
                    </div>
                    ))
                )}
                </div>
            </div>

            {/* MODAL FINANCEIRO COMPLETO */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                    <h2>Novo Lançamento</h2>
                    <button className="btn-close-modal" onClick={() => setShowModal(false)}>
                        <X size={24} />
                    </button>
                    </div>

                    <div className="type-selector">
                    <button 
                        type="button"
                        className={formData.tipo === 'entrada' ? 'active-entrada' : ''} 
                        onClick={() => setFormData({...formData, tipo: 'entrada'})}
                    >
                        <ArrowUpCircle size={18} /> Entrada
                    </button>
                    <button 
                        type="button"
                        className={formData.tipo === 'saida' ? 'active-saida' : ''} 
                        onClick={() => setFormData({...formData, tipo: 'saida'})}
                    >
                        <ArrowDownCircle size={18} /> Saída
                    </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Valor da Operação</label>
                        <div className="input-with-icon">
                        <span className="currency-prefix">R$</span>
                        <input 
                            type="number" 
                            step="0.01"
                            className="input-valor-grande"
                            required
                            value={formData.valor}
                            onChange={e => setFormData({...formData, valor: e.target.value})}
                        />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Descrição</label>
                        <input 
                        required 
                        placeholder="Ex: Venda de gado, compra de milho..." 
                        value={formData.descricao}
                        onChange={e => setFormData({...formData, descricao: e.target.value})}
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                        <label>Data</label>
                        <input 
                            type="date" 
                            required 
                            value={formData.data}
                            onChange={e => setFormData({...formData, data: e.target.value})}
                        />
                        </div>
                        <div className="input-group">
                        <label>Categoria</label>
                        <select 
                            value={formData.categoria}
                            onChange={e => setFormData({...formData, categoria: e.target.value})}
                        >
                            <option value="Gado">Gado</option>
                            <option value="Insumos">Insumos</option>
                            <option value="Mão de Obra">Salários</option>
                            <option value="Manutenção">Manutenção</option>
                        </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Sair</button>
                        <button type="submit" className="btn-save">Confirmar</button>
                    </div>
                    </form>
                </div>
                </div>
            )}
            </div>
        );
        };

        export default Financeiro;