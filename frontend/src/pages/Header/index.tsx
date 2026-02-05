import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import './Header.css';
import { 
  LayoutDashboard, CloudSun, Dog, Wallet, 
  Package, Calendar, Tractor, Settings, LogOut, Menu, X,
  Pill, User, LogIn
} from 'lucide-react';

interface HeaderProps {
  onToggle: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  // Verifica o status de login toda vez que a rota mudar ou o componente montar
  useEffect(() => {
    const nome = localStorage.getItem('usuarioNome');
    const logado = localStorage.getItem('usuarioLogado') === 'true';
    
    if (logado && nome) {
      setNomeUsuario(nome);
    } else {
      setNomeUsuario(null);
    }
  }, [location]); // Monitora a location para atualizar o nome após o login/logout

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioNome');
    setNomeUsuario(null);
    navigate('/Login');
  };

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

      {/* Identificação do Usuário - Só aparece se estiver logado */}
      {isOpen && nomeUsuario ? (
        <div className="user-info-sidebar">
          <User size={18} color="#A3E635" />
          <span>Olá, <strong>{nomeUsuario}</strong></span>
        </div>
      ) : isOpen && (
        <div className="user-info-sidebar guest">
          <User size={18} color="#ccc" />
          <span>Modo Visitante</span>
        </div>
      )}

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <LayoutDashboard size={20}/> 
          {isOpen && <span>Home</span>}
        </Link>
        
        {/* Links protegidos (visíveis, mas o PrivateRoute no App.tsx cuidará do bloqueio) */}
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

      <div className="sidebar-footer">
        <Link to="/ajustes" className={`nav-link ${isActive('/ajustes')}`}>
          <Settings size={20}/> 
          {isOpen && <span>Ajustes</span>}
        </Link>
        
        {/* BOTÃO DINÂMICO: SAIR OU ENTRAR */}
        {nomeUsuario ? (
          <button onClick={handleLogout} className="nav-link logout-btn" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LogOut size={20}/> 
            {isOpen && <span>Sair</span>}
          </button>
        ) : (
          <Link to="/Login" className="nav-link login-btn-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LogIn size={20} color="#A3E635" /> 
            {isOpen && <span>Fazer Login</span>}
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Header;