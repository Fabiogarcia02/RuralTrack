        import React, { useState, useEffect } from 'react';
        import { Link, useLocation, useNavigate } from 'react-router-dom'; 
        import './Header.css';
        import { 
        LayoutDashboard, CloudSun, Dog, Wallet, 
        Package, Calendar, Tractor, Settings, LogOut, Menu, X,
        Pill, User, LogIn, ChevronDown, UserCircle
        } from 'lucide-react';

        interface HeaderProps {
        onToggle: (isOpen: boolean) => void;
        }

        const Header: React.FC<HeaderProps> = ({ onToggle }) => {
        const [isOpen, setIsOpen] = useState(true);
        const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
        const [menuPerfilAberto, setMenuPerfilAberto] = useState(false);
        
        const location = useLocation(); 
        const navigate = useNavigate();

        // Monitora o estado de login e mudanças de rota
        useEffect(() => {
            const nome = localStorage.getItem('usuarioNome');
            const logado = localStorage.getItem('usuarioLogado') === 'true';
            
            if (logado && nome) {
            setNomeUsuario(nome);
            } else {
            setNomeUsuario(null);
            }
        }, [location]);

        const handleToggle = () => {
            const newState = !isOpen;
            setIsOpen(newState);
            onToggle(newState);
            if (!newState) setMenuPerfilAberto(false); // Fecha o menu do perfil se fechar a sidebar
        };

        const handleLogout = () => {
            localStorage.clear(); // Limpa todos os dados de sessão
            setNomeUsuario(null);
            setMenuPerfilAberto(false);
            navigate('/Login');
        };

        const isActive = (path: string) => location.pathname === path ? 'active' : '';

        return (
            <aside className={`sidebar-fixed ${isOpen ? 'open' : 'closed'}`}>
            {/* Cabeçalho da Sidebar */}
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

            {/* SEÇÃO DO USUÁRIO (PERFIL) */}
            <div className="user-section-container">
                {nomeUsuario && isOpen ? (
                <div className={`user-profile-dropdown ${menuPerfilAberto ? 'expanded' : ''}`}>
                    <button 
                    className="user-trigger" 
                    onClick={() => setMenuPerfilAberto(!menuPerfilAberto)}
                    >
                    <div className="user-main">
                        <div className="avatar-mini">
                        {nomeUsuario.charAt(0).toUpperCase()}
                        </div>
                        <span>Olá, <strong>{nomeUsuario.split(' ')[0]}</strong></span>
                    </div>
                    <ChevronDown size={14} className={`arrow ${menuPerfilAberto ? 'rotate' : ''}`} />
                    </button>

                    {menuPerfilAberto && (
                    <div className="user-submenu">
                        <Link to="/Perfil" className="submenu-item" onClick={() => setMenuPerfilAberto(false)}>
                        <UserCircle size={16} />
                        <span>Personalizar Perfil</span>
                        </Link>
                        <button onClick={handleLogout} className="submenu-item logout">
                        <LogOut size={16} />
                        <span>Sair da Conta</span>
                        </button>
                    </div>
                    )}
                </div>
                ) : isOpen && (
                <div className="user-info-sidebar guest">
                    <User size={18} color="#ccc" />
                    <span>Modo Visitante</span>
                </div>
                )}
            </div>

            {/* Navegação Principal */}
            <nav className="sidebar-nav">
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

                <Link to="/Cuidados" className={`nav-link ${isActive('/Cuidados')}`}>
                <Pill size={20}/> 
                {isOpen && <span>Cuidados</span>}
                </Link>

                <Link to="/Calendario" className={`nav-link ${isActive('/Calendario')}`}>
                <Calendar size={20}/> 
                {isOpen && <span>Agenda</span>}
                </Link>

                <Link to="/Financeiro" className={`nav-link ${isActive('/Financeiro')}`}>
                <Wallet size={20}/> 
                {isOpen && <span>Financeiro</span>}
                </Link>

                <Link to="/Clima" className={`nav-link ${isActive('/Clima')}`}>
                <CloudSun size={20}/> 
                {isOpen && <span>Clima</span>}
                </Link>
            </nav>

            {/* Rodapé da Sidebar */}
            <div className="sidebar-footer">
                {!nomeUsuario && isOpen && (
                <Link to="/Login" className="nav-link login-btn-header">
                    <LogIn size={20} color="#A3E635" /> 
                    <span>Fazer Login</span>
                </Link>
                )}
                
            </div>
            </aside>
        );
        };

        export default Header;