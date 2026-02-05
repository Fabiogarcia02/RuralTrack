    import React, { useState } from 'react';
    import { Mail, Lock, User, CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react'; // Adicionado Eye e EyeOff
    import { Link, useNavigate } from 'react-router-dom';
    import './Cadastro.css';

    const Cadastro = () => {
        const [nome, setNome] = useState('');
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para o olho
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        const validations = {
            length: senha.length >= 8,
            upper: /[A-Z]/.test(senha),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
        };

        const handleCadastro = async (e: React.FormEvent) => {
            e.preventDefault();
            const senhaValida = validations.length && validations.upper && validations.special;

            if (senhaValida) {
                setLoading(true);
                try {
                    const response = await fetch('http://localhost:3000/cadastro', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            nome: nome.trim(),
                            email: email.trim().toLowerCase(),
                            senha: senha.trim()
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("✅ Conta criada com sucesso!");
                        navigate('/Login'); 
                    } else {
                        alert("❌ Erro: " + (data.erro || "Falha ao cadastrar"));
                    }
                } catch (error) {
                    alert("🌐 Erro de conexão com o servidor.");
                } finally {
                    setLoading(false);
                }
            } else {
                alert("⚠️ A senha não atende aos requisitos de segurança.");
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
                        <p>Crie sua conta e comece a gerenciar.</p>
                    </div>

                    <form className="login-form" onSubmit={handleCadastro}>
                        <div className="input-field">
                            <User className="field-icon" size={20} />
                            <input 
                                required 
                                type="text" 
                                placeholder="Nome Completo" 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <Mail className="field-icon" size={20} />
                            <input 
                                required 
                                type="email" 
                                placeholder="Seu melhor e-mail" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* CAMPO DE SENHA COM OLHO */}
                        <div className="input-field password-field">
                            <Lock className="field-icon" size={20} />
                            <input 
                                required 
                                type={mostrarSenha ? "text" : "password"} 
                                placeholder="Crie uma senha forte" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="toggle-password"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="password-checker">
                            <p className={validations.length ? 'valid' : ''}>
                                {validations.length ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Pelo menos 8 caracteres
                            </p>
                            <p className={validations.upper ? 'valid' : ''}>
                                {validations.upper ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Uma letra maiúscula
                            </p>
                            <p className={validations.special ? 'valid' : ''}>
                                {validations.special ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Um caractere especial
                            </p>
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "CADASTRANDO..." : "CRIAR MINHA CONTA"}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Já possui uma conta? <Link to="/Login">Faça login</Link></p>
                    </div>
                </div>
            </div>
        );
    };

    export default Cadastro;