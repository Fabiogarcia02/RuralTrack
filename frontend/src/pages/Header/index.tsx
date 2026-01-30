    import React, { useState } from 'react';
    import './Header.css';
    import { 
    LayoutDashboard, CloudSun, Dog, Wallet, 
    Package, Calendar, Tractor, Settings, LogOut, Menu, X 
    } from 'lucide-react';

    interface HeaderProps {
    onToggle: (isOpen: boolean) => void;
    }

    const Header: React.FC<HeaderProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle(newState); // Notifica o App.tsx para ajustar a margem do conteúdo
    };

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
            <a href="#" className="nav-link active">
            <LayoutDashboard size={20}/> 
            {isOpen && <span>Home</span>}
            </a>
            <a href="#" className="nav-link">
            <CloudSun size={20}/> 
            {isOpen && <span>Clima</span>}
            </a>
            <a href="#" className="nav-link">
            <Dog size={20}/> 
            {isOpen && <span>Rebanho</span>}
            </a>
            <a href="#" className="nav-link">
            <Wallet size={20}/> 
            {isOpen && <span>Financeiro</span>}
            </a>
            <a href="#" className="nav-link">
            <Package size={20}/> 
            {isOpen && <span>Inventário</span>}
            </a>
            <a href="#" className="nav-link">
            <Calendar size={20}/> 
            {isOpen && <span>Agenda</span>}
            </a>
        </nav>

        {/* Seção inferior empurrada para cima do footer principal */}
        <div className="sidebar-footer">
            <a href="#" className="nav-link">
            <Settings size={20}/> 
            {isOpen && <span>Ajustes</span>}
            </a>
            <a href="#" className="nav-link logout">
            <LogOut size={20}/> 
            {isOpen && <span>Sair</span>}
            </a>
        </div>
        </aside>
    );
    };

    export default Header;