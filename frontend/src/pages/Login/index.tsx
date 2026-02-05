    import React, { useState } from 'react';
    import { Mail, Lock, CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react'; // Adicionado Eye e EyeOff
    import { Link, useNavigate } from 'react-router-dom';
    import './Login.css';

    const Login = () => {
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [mostrarSenha, setMostrarSenha] = useState(false); // Novo estado para o olho
        const [remember, setRemember] = useState(false);
        const [erro, setErro] = useState('');
        const [carregando, setCarregando] = useState(false);
        
        const navigate = useNavigate();

        const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setErro('');
            setCarregando(true);

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: email.trim().toLowerCase(), // Garante consistência com o banco
                        senha 
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login realizado:", data);
                    localStorage.setItem('usuarioLogado', 'true');
                    localStorage.setItem('usuarioId', data.usuario.id);
                    localStorage.setItem('usuarioNome', data.usuario.nome);
                    localStorage.setItem('usuarioEmail', data.usuario.email);

                    navigate('/dashboard'); 
                } else {
                    setErro(data.erro || 'E-mail ou senha incorretos.');
                }
            } catch (error) {
                setErro('Não foi possível conectar ao servidor. Verifique o Back-end.');
            } finally {
                setCarregando(false);
            }
        };

        return (
            <div className="login-page">
                <div className="glass-container">
                    <div className="login-header">
                        <div className="logo-wrapper">
                            <div className="logo-icon">🍃</div>
                            <h1>Rural <span>Track</span></h1>
                        </div>
                        <p>Controle total para o seu negócio.</p>
                    </div>

                    {erro && (
                        <div className="error-message" style={{ 
                            backgroundColor: 'rgba(255, 77, 77, 0.1)', 
                            border: '1px solid #ff4d4d', 
                            borderRadius: '8px', 
                            padding: '10px', 
                            marginBottom: '15px',
                            color: '#ff4d4d',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {erro}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-field">
                            <Mail className="field-icon" size={20} />
                            <input 
                                type="email" 
                                placeholder="Seu e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                disabled={carregando}
                            />
                        </div>

                        {/* CAMPO DE SENHA COM OLHO */}
                        <div className="input-field password-field">
                            <Lock className="field-icon" size={20} />
                            <input 
                                type={mostrarSenha ? "text" : "password"} 
                                placeholder="Sua senha" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                                disabled={carregando}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                tabIndex={-1} // Evita que o Tab pare no ícone antes de ir para o botão
                            >
                                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="form-options">
                            <div className="remember-me" onClick={() => !carregando && setRemember(!remember)}>
                                {remember ? <CheckCircle2 size={18} className="text-green" /> : <Circle size={18} />}
                                <span>Lembrar-me</span>
                            </div>
                        </div>

                        <button type="submit" className="btn-login" disabled={carregando}>
                            {carregando ? 'AUTENTICANDO...' : 'ACESSAR PAINEL'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Ainda não é cliente? <Link to="/Cadastro">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        );
    };

    export default Login;