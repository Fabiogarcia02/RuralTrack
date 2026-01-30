    import React, { useState, useMemo } from 'react';
    import './Rebanho.css';
    import { 
    Plus, Activity, Scale, Pill, Utensils, 
    Target, Baby, CheckCircle2, Milk, Egg, Filter, X 
    } from 'lucide-react';

    const animalTypes = [
    { id: 'boi', label: 'Bovino', icon: '🐂' },
    { id: 'porco', label: 'Suíno', icon: '🐖' },
    { id: 'frango', label: 'Ave', icon: '🐓' },
    ];

    const Rebanho = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState('boi');
    const [filter, setFilter] = useState('todos');
    
    // Lista inicial vazia conforme pedido
    const [animais, setAnimais] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        nome: '', idade: '', peso: '', medicacao: '', dieta: '',
        finalidade: 'corte', producao: '', consumoDia: ''
    });

    const stats = useMemo(() => {
        const leiteiros = animais.filter(a => a.tipo === 'boi' && a.finalidade === 'leite');
        const aves = animais.filter(a => a.tipo === 'frango');
        
        return {
        leite: leiteiros.length ? (leiteiros.reduce((acc, cur) => acc + Number(cur.producao), 0) / leiteiros.length).toFixed(1) : 0,
        ovos: aves.length ? (aves.reduce((acc, cur) => acc + Number(cur.producao), 0) / aves.length).toFixed(1) : 0,
        consumoTotal: animais.reduce((acc, cur) => acc + Number(cur.consumoDia || 0), 0).toFixed(1)
        };
    }, [animais]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const novoAnimal = {
        id: Date.now(),
        ...formData,
        tipo: selectedType,
        producao: Number(formData.producao) || 0
        };
        setAnimais([...animais, novoAnimal]);
        setShowModal(false);
        setFormData({ nome: '', idade: '', peso: '', medicacao: '', dieta: '', finalidade: 'corte', producao: '', consumoDia: '' });
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
            <p>Controle de plantel e consumo diário.</p>
            </div>
            <button className="btn-main-add" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Cadastrar Animal
            </button>
        </header>

        <div className="stats-grid">
            <div className="stat-card">
            <div className="icon-box green"><Milk size={22}/></div>
            <div className="stat-info">
                <span>Média Leite/Dia</span>
                <h3>{stats.leite} L</h3>
            </div>
            </div>
            <div className="stat-card">
            <div className="icon-box yellow"><Egg size={22}/></div>
            <div className="stat-info">
                <span>Média Ovos/Semana</span>
                <h3>{stats.ovos} un</h3>
            </div>
            </div>
            <div className="stat-card">
            <div className="icon-box blue"><Utensils size={22}/></div>
            <div className="stat-info">
                <span>Consumo Ração/Dia</span>
                <h3>{stats.consumoTotal} kg</h3>
            </div>
            </div>
        </div>

        <div className="filter-bar">
            <div className="filter-label"><Filter size={16}/> Filtrar:</div>
            <div className="filter-buttons">
            {['todos', 'boi', 'porco', 'frango', 'leite', 'corte'].map(f => (
                <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
            </div>
        </div>

        {animais.length === 0 ? (
            <div className="empty-state">
            <div className="empty-icon">🏠</div>
            <h2>Rebanho Vazio</h2>
            <p>Nenhum animal cadastrado até o momento.</p>
            </div>
        ) : (
            <div className="animals-display-grid">
            {animaisFiltrados.map(animal => (
                <div key={animal.id} className="animal-display-card">
                <div className="card-top">
                    <span className="emoji-icon">{animalTypes.find(t => t.id === animal.tipo)?.icon}</span>
                    <span className={`category-tag ${animal.finalidade}`}>{animal.finalidade}</span>
                </div>
                <h3>{animal.nome}</h3>
                <div className="card-details">
                    <div className="detail-item"><Scale size={14}/> {animal.peso}kg</div>
                    <div className="detail-item"><Utensils size={14}/> {animal.consumoDia}kg/dia</div>
                    {animal.producao > 0 && (
                    <div className="detail-item production">
                        {animal.tipo === 'frango' ? <Egg size={14}/> : <Milk size={14}/>} {animal.producao} {animal.tipo === 'frango' ? 'un' : 'L'}
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        )}

        {showModal && (
            <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <div>
                    <h2>Novo Cadastro</h2>
                    <p>Insira as informações detalhadas do animal.</p>
                </div>
                <button className="btn-close" onClick={() => setShowModal(false)}><X/></button>
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
                    <input type="number" placeholder="0.00" value={formData.peso} onChange={e => setFormData({...formData, peso: e.target.value})}/>
                    </div>
                    <div className="input-group">
                    <label>Idade</label>
                    <input type="text" placeholder="Ex: 2 anos" value={formData.idade} onChange={e => setFormData({...formData, idade: e.target.value})}/>
                    </div>
                    <div className="input-group">
                    <label>Consumo Ração/Dia (kg)</label>
                    <input type="number" placeholder="0.0" value={formData.consumoDia} onChange={e => setFormData({...formData, consumoDia: e.target.value})}/>
                    </div>
                    <div className="input-group">
                    <label>Finalidade</label>
                    <select value={formData.finalidade} onChange={e => setFormData({...formData, finalidade: e.target.value})}>
                        <option value="corte">Corte / Abate</option>
                        <option value="leite">Leite</option>
                        <option value="producao">Ovos / Outros</option>
                    </select>
                    </div>
                    {formData.finalidade !== 'corte' && (
                    <div className="input-group">
                        <label>Produção Esperada</label>
                        <input type="number" placeholder="Qtd" value={formData.producao} onChange={e => setFormData({...formData, producao: e.target.value})}/>
                    </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button type="submit" className="btn-save">Salvar Animal</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Rebanho;