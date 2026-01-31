        import React, { useState } from 'react';
        import { Mail, Lock, CheckCircle2, Circle } from 'lucide-react';
        import './Login.css';

        const Login = () => {
        const [remember, setRemember] = useState(false);

        return (
            <div className="login-page">
            <div className="glass-container">
                {/* Logo e Slogan */}
                <div className="login-header">
                <div className="logo-wrapper">
                    <div className="logo-icon">🍃</div>
                    <h1>Rural <span>Track</span></h1>
                </div>
                <p>Controle total para o seu negócio.</p>
                </div>

                <form className="login-form">
                {/* Campo E-mail */}
                <div className="input-field">
                    <Mail className="field-icon" size={20} />
                    <input type="text" placeholder="E-mail ou Usuário" />
                </div>

                {/* Campo Senha */}
                <div className="input-field">
                    <Lock className="field-icon" size={20} />
                    <input type="password" placeholder="Senha" />
                </div>

                {/* Checkbox e Esqueci Senha */}
                <div className="form-options">
                    <div className="remember-me" onClick={() => setRemember(!remember)}>
                    {remember ? <CheckCircle2 size={18} className="text-green" /> : <Circle size={18} />}
                    <span>Lembrar-me</span>
                    </div>
           
                </div>

                {/* Botão Acessar */}
                <button type="submit" className="btn-login">
                    ACESSAR PAINEL
                </button>
                </form>

                <div className="login-footer">
                <p>Ainda não é cliente? <a href="#">Cadastre-se</a></p>
                </div>
            </div>
            </div>
        );
        };

        export default Login;