  import React from 'react';
  import Header from './pages/Header'; // Ajuste o caminho se necessário
  import Home from './pages/Home';
  import Footer from './pages/Footer';
  import './App.css';

  function App() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    return (
      <div className="app-layout">
        {/* O Header recebe a função para avisar quando abre/fecha */}
        <Header onToggle={(state) => setSidebarOpen(state)} />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <div className="page-body">
            <Home />
          </div>
          <Footer />
        </main>
      </div>
    );
  }

  export default App; // ESTA LINHA RESOLVE O SEU ERRO