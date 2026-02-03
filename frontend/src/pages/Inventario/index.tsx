    import React, { useState } from 'react';
    import { 
    Database, 
    Truck, 
    Sprout, 
    Plus, 
    X, 
    Trash2, 
    CheckCircle2, 
    Syringe, 
    Beef 
    } from 'lucide-react';
    import './Inventario.css';

    const culturaTypes = [
    { id: 'milho', label: 'Milho', icon: '🌽' },
    { id: 'soja', label: 'Soja', icon: '🌱' },
    { id: 'pasto', label: 'Pasto/Silagem', icon: '🌿' },
    { id: 'algodao', label: 'Algodão', icon: '☁️' },
    { id: 'feijao', label: 'Feijão', icon: '🫘' },
    { id: 'arroz', label: 'Arroz', icon: '🌾' },
    { id: 'trigo', label: 'Trigo', icon: '🥖' },
    { id: 'cana', label: 'Cana', icon: '🎋' },
    { id: 'cafe', label: 'Café', icon: '☕' },
    { id: 'citrus', label: 'Citrus', icon: '🍊' },
    { id: 'eucalipto', label: 'Eucalipto', icon: '🌲' },
    { id: 'girassol', label: 'Girassol', icon: '🌻' },
    { id: 'tomate', label: 'Tomate', icon: '🍅' },
    { id: 'batata', label: 'Batata', icon: '🥔' },
    { id: 'mandioca', label: 'Mandioca', icon: '🍠' },
    { id: 'uva', label: 'Uva', icon: '🍇' },
    { id: 'banana', label: 'Banana', icon: '🍌' },
    { id: 'cacau', label: 'Cacau', icon: '🍫' },
    { id: 'amendoim', label: 'Amendoim', icon: '🥜' },
    { id: 'outros', label: 'Outros', icon: '➕' },
    ];

    const Inventario = () => {
    const [activeTab, setActiveTab] = useState('graos');
    const [showModal, setShowModal] = useState(false);
    const [selectedCultura, setSelectedCultura] = useState('milho');
    const [itens, setItens] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        nome: '',
        quantidade: '',
        unidade: 't',
        extra: ''
    });

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const defaultUnits: { [key: string]: string } = {
        graos: 't',
        maquinas: 'un',
        plantio: 'ha',
        medicamentos: 'frascos',
        suplementos: 'sc'
        };
        setFormData({ ...formData, unidade: defaultUnits[tab] || 'un' });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const itemCultura = culturaTypes.find(c => c.id === selectedCultura);

        const novoItem = {
        ...formData,
        id: Date.now(),
        categoria: activeTab,
        icon: activeTab === 'plantio' ? itemCultura?.icon :
                activeTab === 'graos' ? '📦' :
                activeTab === 'maquinas' ? '🚜' :
                activeTab === 'medicamentos' ? '💉' : '🌾'
        };

        setItens([...itens, novoItem]);
        setShowModal(false);
        setFormData({ nome: '', quantidade: '', unidade: 't', extra: '' });
    };

    return (
        <div className="inventario-container">
        <header className="inventario-header">
            <div>
            <h1>Inventário Rural Track</h1>
            <p>Gestão centralizada de insumos, máquinas e nutrição animal.</p>
            </div>
            <button className="btn-add-item" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Novo Registro
            </button>
        </header>

        <nav className="inventario-tabs">
            <button className={activeTab === 'graos' ? 'active' : ''} onClick={() => handleTabChange('graos')}>
            <Database size={18} /> Grãos
            </button>
            <button className={activeTab === 'maquinas' ? 'active' : ''} onClick={() => handleTabChange('maquinas')}>
            <Truck size={18} /> Máquinas
            </button>
            <button className={activeTab === 'plantio' ? 'active' : ''} onClick={() => handleTabChange('plantio')}>
            <Sprout size={18} /> Plantio
            </button>
            <button className={activeTab === 'medicamentos' ? 'active' : ''} onClick={() => handleTabChange('medicamentos')}>
            <Syringe size={18} /> Medicamentos
            </button>
            <button className={activeTab === 'suplementos' ? 'active' : ''} onClick={() => handleTabChange('suplementos')}>
            <Beef size={18} /> Suplementação
            </button>
        </nav>

        <div className="inventario-grid">
            {itens.filter(i => i.categoria === activeTab).map(item => (
            <div key={item.id} className={`inventory-card ${activeTab}`}>
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                <h3>{item.nome}</h3>
                <p className="quantity">{item.quantidade} {item.unidade}</p>
                <p className="extra-info">{item.extra}</p>
                </div>
                <button className="btn-delete" onClick={() => setItens(itens.filter(i => i.id !== item.id))}>
                <Trash2 size={18} />
                </button>
            </div>
            ))}
        </div>

        {showModal && (
            <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <h2>
                    {activeTab === 'plantio' ? 'Nova Área de Plantio' :
                    activeTab === 'maquinas' ? 'Novo Maquinário' :
                    activeTab === 'medicamentos' ? 'Novo Medicamento/Vacina' :
                    activeTab === 'suplementos' ? 'Novo Suplemento / Sal' : 'Novo Lote de Grãos'}
                </h2>
                <button onClick={() => setShowModal(false)} className="btn-close"><X /></button>
                </div>

                {activeTab === 'plantio' && (
                <div className="cultura-selector-container">
                    <label className="selector-label">Cultura Selecionada:</label>
                    <div className="selector-grid-expandido">
                    {culturaTypes.map((c) => (
                        <div
                        key={c.id}
                        className={`option-plantio ${selectedCultura === c.id ? 'active' : ''}`}
                        onClick={() => setSelectedCultura(c.id)}
                        >
                        <span className="emoji-icon">{c.icon}</span>
                        <span className="label-text">{c.label}</span>
                        {selectedCultura === c.id && <CheckCircle2 className="check-badge" size={14} />}
                        </div>
                    ))}
                    </div>
                </div>
                )}

                <form onSubmit={handleSave}>
                <div className="form-grid">
                    <div className="input-group full">
                    <label>
                        {activeTab === 'plantio' ? 'Nome do Talhão / Área' :
                        activeTab === 'maquinas' ? 'Modelo / Nome da Máquina' :
                        activeTab === 'medicamentos' ? 'Nome do Medicamento/Vacina' :
                        activeTab === 'suplementos' ? 'Nome do Suplemento (Ex: Sal Mineral 80)' :
                        'Identificação do Silo/Lote'}
                    </label>
                    <input
                        required
                        placeholder="Digite o nome..."
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                    />
                    </div>

                    <div className="input-group">
                    <label>{activeTab === 'plantio' ? 'Tamanho' : 'Quantidade'}</label>
                    <input
                        type="number"
                        required
                        value={formData.quantidade}
                        onChange={e => setFormData({ ...formData, quantidade: e.target.value })}
                    />
                    </div>

                    <div className="input-group">
                    <label>Unidade</label>
                    <select
                        value={formData.unidade}
                        onChange={e => setFormData({ ...formData, unidade: e.target.value })}
                    >
                        {activeTab === 'graos' && (
                        <>
                            <option value="t">Toneladas</option>
                            <option value="sc">Sacas</option>
                        </>
                        )}
                        {activeTab === 'maquinas' && <option value="un">Unidades</option>}
                        {activeTab === 'plantio' && (
                        <>
                            <option value="ha">Hectares</option>
                            <option value="m2">Metros²</option>
                        </>
                        )}
                        {activeTab === 'medicamentos' && (
                        <>
                            <option value="frascos">Frascos</option>
                            <option value="ml">ML</option>
                            <option value="doses">Doses</option>
                        </>
                        )}
                        {activeTab === 'suplementos' && (
                        <>
                            <option value="sc">Sacas</option>
                            <option value="kg">Quilos (kg)</option>
                        </>
                        )}
                    </select>
                    </div>

                    <div className="input-group full">
                    <label>
                        {activeTab === 'maquinas' ? 'Horímetro / Próxima Manutenção' :
                        activeTab === 'plantio' ? 'Variedade da Semente' :
                        activeTab === 'medicamentos' ? 'Data de Validade / Lote' :
                        activeTab === 'suplementos' ? 'Fornecedor / Teor de Proteína' :
                        'Observações Gerais'}
                    </label>
                    <input
                        placeholder="..."
                        value={formData.extra}
                        onChange={e => setFormData({ ...formData, extra: e.target.value })}
                    />
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                    <button type="submit" className="btn-save">Salvar Registro</button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Inventario;