    import React from 'react';
    import { Routes, Route } from 'react-router-dom'; 
    import Header from './pages/Header'; 
    import Home from './pages/Home';
    import Footer from './pages/Footer';
    import Rebanho from './pages/Rebanho';
    import './App.css';
    import Inventario from './pages/Inventario';
    import Login from './pages/Login';
    import Cuidados from './pages/Cuidados';
    import Financeiro from './pages/Financeiro';
    import Clima from './pages/Clima'; 

    function App() {
      const [sidebarOpen, setSidebarOpen] = React.useState(true);

      return (
        <div className="app-layout">
          <Header onToggle={(state) => setSidebarOpen(state)} />
          
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
            <div className="page-body">
              {/* O SISTEMA DE ROTAS DECIDE O QUE MOSTRAR AQUI */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rebanho" element={<Rebanho />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path='/Login' element={<Login />} />
                <Route path="/Cuidados" element={<Cuidados />} />
                <Route path="/Financeiro" element={<Financeiro />} />
                <Route path="/Clima" element={<Clima />} />

                {/* Se quiser que outras páginas funcionem, adicione as rotas aqui */}
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      );
    }

    export default App;