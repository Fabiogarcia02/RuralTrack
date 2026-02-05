  import React from 'react';
  import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
  import Header from './pages/Header'; 
  import Home from './pages/Home';
  import Footer from './pages/Footer';
  import Rebanho from './pages/Rebanho';
  import Inventario from './pages/Inventario';
  import Login from './pages/Login';
  import Cadastro from './pages/Cadastro';
  import Cuidados from './pages/Cuidados';
  import Financeiro from './pages/Financeiro';
  import Clima from './pages/Clima'; 
  import Calendario from './pages/Calendario';
  import './App.css';

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAutenticado = localStorage.getItem('usuarioLogado') === 'true';
    return isAutenticado ? children : <Navigate to="/Login" />;
  };

  function App() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const location = useLocation();

    // 1. Criamos a lista de páginas que NÃO possuem o layout do sistema (Header/Sidebar/Footer)
    // Certifique-se de que o texto aqui seja IGUAL ao que você usa no <Link to="...">
    const isAuthPage = location.pathname.toLowerCase() === '/login' || 
                      location.pathname.toLowerCase() === '/cadastro';

    // 2. Se for uma página de autenticação, renderizamos APENAS o componente seco
    if (isAuthPage) {
      return (
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Caso o usuário digite /Login ou /login, ele encontrará a rota */}
          <Route path="/login" element={<Login />} /> 
        </Routes>
      );
    }

    // 3. Layout Normal do Sistema
    return (
      <div className="app-layout">
        <Header onToggle={(state) => setSidebarOpen(state)} />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <div className="page-body">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Rotas Protegidas */}
              <Route path="/rebanho" element={<PrivateRoute><Rebanho /></PrivateRoute>} />
              <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} />
              <Route path="/Cuidados" element={<PrivateRoute><Cuidados /></PrivateRoute>} />
              <Route path="/Financeiro" element={<PrivateRoute><Financeiro /></PrivateRoute>} />
              <Route path="/Clima" element={<PrivateRoute><Clima /></PrivateRoute>} />
              <Route path="/Calendario" element={<PrivateRoute><Calendario /></PrivateRoute>} />
              
   
              <Route path="/Login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    );
  }

  export default App;