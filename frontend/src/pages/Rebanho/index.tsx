    import React, { useState, useMemo, useEffect } from 'react';
    import { 
    Plus, Scale, Utensils, 
    CheckCircle2, Milk, Egg, Filter, X, 
    Calendar as CalendarIcon, Edit2, Trash2 
    } from 'lucide-react';
    import './Rebanho.css';

    const animalTypes = [
    { id: 'boi', label: 'Bovino', icon: '🐂' },
    { id: 'porco', label: 'Suíno', icon: '🐖' },
    { id: 'frango', label: 'Ave', icon: '🐓' },
    ];

    const Rebanho = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState('boi');
    const [filter, setFilter] = useState('todos');
    const [editingId, setEditingId] = useState(null);
    
    // CARREGAR DADOS AO INICIAR
    const [animais, setAnimais] = useState(() => {
        const saved = localStorage.getItem('@Fazenda:animais');
        return saved ? JSON.parse(saved) : [];
    });

    const [formData, setFormData] = useState({
        nome: '', idade: '', peso: '', medicacao: '', dieta: '',
        finalidade: 'corte', producao: '', consumoDia: '', dataAbate: ''
    });

    // SALVAR DADOS SEMPRE QUE A LISTA MUDAR
    useEffect(() => {
        localStorage.setItem('@Fazenda:animais', JSON.stringify(animais));
    }, [animais]);

    const stats = useMemo(() => {
        const leiteiros = animais.filter(a => a.tipo === 'boi' && a.finalidade === 'leite');
        const aves = animais.filter(a => a.tipo === 'frango');
        
        return {
        leite: leiteiros.length ? (leiteiros.reduce((acc, cur) => acc + Number(cur.producao), 0) / leiteiros.length).toFixed(1) : 0,
        ovos: aves.length ? (aves.reduce((acc, cur) => acc + Number(cur.producao), 0) / aves.length).toFixed(1) : 0,
        consumoTotal: animais.reduce((acc, cur) => acc + Number(cur.consumoDia || 0), 0).toFixed(1)
        };
    }, [animais]);

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ 
        nome: '', idade: '', peso: '', medicacao: '', dieta: '', 
        finalidade: 'corte', producao: '', consumoDia: '', dataAbate: '' 
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingId) {
        setAnimais(animais.map(a => a.id === editingId ? { ...formData, id: editingId, tipo: selectedType } : a));
        } else {
        const novoAnimal = {
            id: Date.now(),
            ...formData,
            tipo: selectedType,
        };
        setAnimais([...animais, novoAnimal]);
        }
        closeModal();
    };

    const handleEdit = (animal) => {
        setEditingId(animal.id);
        setSelectedType(animal.tipo);
        setFormData({ ...animal });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if(window.confirm("Deseja remover este animal?")) {
        setAnimais(animais.filter(a => a.id !== id));
        }
    };

    const animaisFiltrados = animais.filter(a => {
        if (filter === 'todos') return true;
        return a.tipo === filter || a.finalidade === filter;
    });

    return (
        <div className="rebanho-container">
        <header className="rebanho-header">
            <div className="title-area">
            <h1>Gestão de Rebanho</h1>
            <p>Controle de plantel e abate programado.</p>
            </div>
            <button className="btn-main-add" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Cadastrar Animal
            </button>
        </header>

        {/* Roda de Estatísticas */}
        <div className="stats-row">
            <div className="stat-card blue">
            <div className="stat-icon-wrapper"><Milk size={28}/></div>
            <div className="stat-content">
                <span className="stat-label">Média Leite</span>
                <span className="stat-value">{stats.leite}<small className="stat-unit">L</small></span>
            </div>
            </div>
            <div className="stat-card orange">
            <div className="stat-icon-wrapper"><Egg size={28}/></div>
            <div className="stat-content">
                <span className="stat-label">Média Ovos</span>
                <span className="stat-value">{stats.ovos}</span>
            </div>
            </div>
            <div className="stat-card green">
            <div className="stat-icon-wrapper"><Utensils size={28}/></div>
            <div className="stat-content">
                <span className="stat-label">Consumo Total</span>
                <span className="stat-value">{stats.consumoTotal}<small className="stat-unit">kg</small></span>
            </div>
            </div>
        </div>

        {/* Barra de Filtros */}
        <div className="filter-bar">
            <div className="filter-label"><Filter size={16}/> Filtrar por:</div>
            <div className="filter-buttons">
            {['todos', 'boi', 'porco', 'frango', 'leite', 'corte'].map(f => (
                <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
            </div>
        </div>

        {/* Lista de Animais */}
        {animais.length === 0 ? (
            <div className="empty-state">
            <div className="empty-icon">🏠</div>
            <h2>Rebanho Vazio</h2>
            <p>Nenhum animal cadastrado no banco local.</p>
            </div>
        ) : (
            <div className="animals-display-grid">
            {animaisFiltrados.map(animal => (
                <div key={animal.id} className="animal-display-card">
                <div className="card-top">
                    <span className="emoji-icon">{animalTypes.find(t => t.id === animal.tipo)?.icon}</span>
                    <div className="card-actions">
                    <button onClick={() => handleEdit(animal)} className="btn-icon-edit"><Edit2 size={14}/></button>
                    <button onClick={() => handleDelete(animal.id)} className="btn-icon-delete"><Trash2 size={14}/></button>
                    </div>
                </div>
                <h3>{animal.nome}</h3>
                <div className="card-details">
                    <div className="detail-item"><Scale size={14}/> {animal.peso}kg</div>
                    <div className="detail-item"><Utensils size={14}/> {animal.consumoDia}kg/dia</div>
                    {animal.dataAbate && (
                    <div className="detail-item alert">
                        <CalendarIcon size={14}/> Abate: {new Date(animal.dataAbate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        )}

        {/* Modal de Cadastro/Edição */}
        {showModal && (
            <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <div>
                    <h2>{editingId ? 'Editar Animal' : 'Novo Cadastro'}</h2>
                    <p>Insira as informações técnicas.</p>
                </div>
                <button className="btn-close" onClick={closeModal}><X/></button>
                </div>

                <div className="animal-selector">
                {animalTypes.map((type) => (
                    <div 
                    key={type.id} 
                    className={`type-option ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                    >
                    <span className="emoji">{type.icon}</span>
                    <span className="label">{type.label}</span>
                    {selectedType === type.id && <CheckCircle2 className="check" size={16}/>}
                    </div>
                ))}
                </div>

                <form onSubmit={handleSave}>
                <div className="form-grid">
                    <div className="input-group">
                    <label>Nome do Animal</label>
                    <input type="text" placeholder="Ex: Mimosa" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}/>
                    </div>
                    
                    <div className="input-group">
                    <label>Peso (kg)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={formData.peso} onChange={e => setFormData({...formData, peso: e.target.value})}/>
                    </div>

                    <div className="input-group">
                    <label>Finalidade Principal</label>
                    <select value={formData.finalidade} onChange={e => setFormData({...formData, finalidade: e.target.value})}>
                        <option value="corte">Corte / Abate</option>
                        <option value="leite">Produção de Leite</option>
                        <option value="producao">Postura (Ovos)</option>
                    </select>
                    </div>

                    {/* CAMPO DE DATA SEMPRE VISÍVEL PARA CORTE */}
                    <div className="input-group highlight">
                    <label>Data de Abate Programada</label>
                    <input 
                        type="date" 
                        value={formData.dataAbate} 
                        onChange={e => setFormData({...formData, dataAbate: e.target.value})}
                    />
                    </div>

                    <div className="input-group">
                    <label>Consumo Ração/Dia (kg)</label>
                    <input type="number" step="0.1" placeholder="0.0" value={formData.consumoDia} onChange={e => setFormData({...formData, consumoDia: e.target.value})}/>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                    <button type="submit" className="btn-save">Salvar Alterações</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Rebanho;