    import express, { Request, Response } from 'express';
    import cors from 'cors';
    import Banco from '../Banco/bd.js'; 

    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // --- ROTA DE CADASTRO ---
    app.post('/cadastro', async (req: Request, res: Response) => {
        const { nome, email, senha } = req.body;

        // Verificação básica de segurança
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Todos os campos devem ser preenchidos." });
        }

        try {
            const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
            // .trim() remove espaços acidentais no início ou fim
            const values = [nome.trim(), email.trim(), senha.trim()];
            const result = await Banco.query(query, values);
            
            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!",
                usuario: result.rows[0]
            });
        } catch (err: any) {
            console.error("Erro ao cadastrar:", err);
        
            if (err.code === '23505') {
                return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
            }
            res.status(500).json({ erro: "Erro interno ao realizar cadastro." });
        }
    });

    // --- ROTA DE LOGIN ---
    app.post('/login', async (req: Request, res: Response) => {
        const email = req.body.email?.trim();
        const senha = req.body.senha?.trim();

        try {
            // LOWER(email) garante que "Teste@Gmail.com" funcione igual a "teste@gmail.com"
            const result = await Banco.query(
                'SELECT id, nome, email FROM usuarios WHERE LOWER(email) = LOWER($1) AND senha = $2', 
                [email, senha]
            );

            if (result.rows.length > 0) {
                const usuario = result.rows[0];
                res.status(200).json({
                    mensagem: "Login realizado com sucesso",
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email
                    }
                });
            } else {
                res.status(401).json({ erro: "E-mail ou senha incorretos." });
            }
        } catch (err: any) {
            console.error("Erro no login:", err);
            res.status(500).json({ erro: "Erro interno no servidor." });
        }
    });

    // --- ROTA PARA SALVAR PESQUISA (NOVA) ---
    // Adicionei esta rota para que o histórico não fique vazio!
    app.post('/historico', async (req: Request, res: Response) => {
        const { search_query } = req.body;
        try {
            await Banco.query(
                'INSERT INTO search_history (search_query) VALUES ($1)',
                [search_query]
            );
            res.status(201).json({ mensagem: "Pesquisa salva." });
        } catch (err) {
            res.status(500).json({ error: "Erro ao salvar histórico." });
        }
    });

    // --- ROTA DE BUSCAR HISTÓRICO ---
    app.get('/historico', async (req: Request, res: Response) => {
        try {
            const result = await Banco.query(
                'SELECT * FROM search_history ORDER BY searched_at DESC LIMIT 10'
            );
            res.json(result.rows);
        } catch (err: any) {
            console.error("Erro ao buscar histórico:", err);
            res.status(500).json({ error: err.message });
        }
    });

    // Inicialização do Servidor
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`\n  🚀 Rural Track Back-end rodando!`);
        console.log(`  🔗 Local: http://localhost:${PORT}`);
        console.log(`  📂 Rotas disponíveis: /login, /cadastro, /historico (GET e POST)\n`);
    });