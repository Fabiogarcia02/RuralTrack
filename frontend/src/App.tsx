    import React from 'react';
    import { Routes, Route } from 'react-router-dom'; // ADICIONE ESTE IMPORT
    import Header from './pages/Header'; 
    import Home from './pages/Home';
    import Footer from './pages/Footer';
    import Rebanho from './pages/Rebanho';
    import './App.css';

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
                {/* Se quiser que outras páginas funcionem, adicione as rotas aqui */}
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      );
    }

    export default App;