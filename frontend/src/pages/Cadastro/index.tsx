    import React, { useState } from 'react';
    import { Mail, Lock, User, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
    import './Cadastro.css';

    const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Lógica de validação da senha
    const validations = {
        length: senha.length >= 8,
        upper: /[A-Z]/.test(senha),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
    };

    const handleCadastro = (e: React.FormEvent) => {
        e.preventDefault();
        if (validations.length && validations.upper && validations.special) {
        alert("Cadastro realizado com sucesso!");
        } else {
        alert("Por favor, preencha os requisitos da senha.");
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
            {/* Campo Nome */}
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

            {/* Campo E-mail */}
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

            {/* Campo Senha */}
            <div className="input-field">
                <Lock className="field-icon" size={20} />
                <input 
                required 
                type="password" 
                placeholder="Crie uma senha forte" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            {/* Checklist de Segurança da Senha */}
            <div className="password-checker">
                <p className={validations.length ? 'valid' : ''}>
                {validations.length ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Pelo menos 8 caracteres
                </p>
                <p className={validations.upper ? 'valid' : ''}>
                {validations.upper ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Uma letra maiúscula
                </p>
                <p className={validations.special ? 'valid' : ''}>
                {validations.special ? <CheckCircle2 size={12}/> : <Circle size={12}/>} Um caractere especial (@, #, $)
                </p>
            </div>

            <button type="submit" className="btn-login">
                CRIAR MINHA CONTA
            </button>
            </form>

            <div className="login-footer">
            <p>Já possui uma conta? <a href="#">Faça login</a></p>
            </div>
        </div>
        </div>
    );
    };

    export default Cadastro;