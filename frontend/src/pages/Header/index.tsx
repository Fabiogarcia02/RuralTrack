    import React, { useState } from 'react';
    import { Link, useLocation } from 'react-router-dom'; // Importando o Link e useLocation
    import './Header.css';
    import { 
    LayoutDashboard, CloudSun, Dog, Wallet, 
    Package, Calendar, Tractor, Settings, LogOut, Menu, X,
    Pill 
    } from 'lucide-react';

    interface HeaderProps {
    onToggle: (isOpen: boolean) => void;
    }

    const Header: React.FC<HeaderProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation(); // Para identificar qual link está ativo

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle(newState);
    };

    // Função auxiliar para verificar se a rota está ativa
    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <aside className={`sidebar-fixed ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
            {isOpen && (
            <div className="sidebar-brand">
                <Tractor size={28} color="#A3E635" />
                <span>Rural Track</span>
            </div>
            )}
            <button className="toggle-btn" onClick={handleToggle}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        <nav className="sidebar-nav">
            {/* Substituído <a> por <Link> e href por to */}
            <Link to="/" className={`nav-link ${isActive('/')}`}>
            <LayoutDashboard size={20}/> 
            {isOpen && <span>Home</span>}
            </Link>
            
            <Link to="/rebanho" className={`nav-link ${isActive('/rebanho')}`}>
            <Dog size={20}/> 
            {isOpen && <span>Rebanho</span>}
            </Link>

             <Link to="/inventario" className={`nav-link ${isActive('/inventario')}`}>
            <Package size={20}/> 
            {isOpen && <span>Inventário</span>}
            </Link>

            <Link to="/cuidados" className={`nav-link ${isActive('/cuidados')}`}>
            <Pill size={20}/> 
            {isOpen && <span>Cuidados</span>}
            </Link>

            <Link to="/agenda" className={`nav-link ${isActive('/agenda')}`}>
            <Calendar size={20}/> 
            {isOpen && <span>Agenda</span>}
            </Link>

             <Link to="/financeiro" className={`nav-link ${isActive('/financeiro')}`}>
            <Wallet size={20}/> 
            {isOpen && <span>Financeiro</span>}
            </Link>
 
            <Link to="/clima" className={`nav-link ${isActive('/clima')}`}>
            <CloudSun size={20}/> 
            {isOpen && <span>Clima</span>}
            </Link>

           

           
        </nav>

        <div className="sidebar-footer">
            <Link to="/ajustes" className={`nav-link ${isActive('/ajustes')}`}>
            <Settings size={20}/> 
            {isOpen && <span>Ajustes</span>}
            </Link>
            <Link to="/login" className="nav-link logout">
            <LogOut size={20}/> 
            {isOpen && <span>Sair</span>}
            </Link>
        </div>
        </aside>
    );
    };

    export default Header;