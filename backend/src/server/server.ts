       
       import express, { Request, Response } from 'express';
        import cors from 'cors';
        import Banco from '../Banco/bd.js'; 

        const app = express();

        app.use(cors());
        app.use(express.json());

        app.post('/cadastro', async (req: Request, res: Response) => {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) return res.status(400).json({ erro: "Campos obrigatórios ausentes." });

            try {
                const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
                const result = await Banco.query(query, [nome.trim(), email.trim(), senha.trim()]);
                res.status(201).json({ mensagem: "Usuário cadastrado!", usuario: result.rows[0] });
            } catch (err: any) {
                if (err.code === '23505') return res.status(409).json({ erro: "E-mail já cadastrado." });
                res.status(500).json({ erro: "Erro interno no cadastro." });
            }
        });

        // --- ROTA DE LOGIN ---
        app.post('/login', async (req: Request, res: Response) => {
            const { email, senha } = req.body;
            try {
                const result = await Banco.query(
                    'SELECT id, nome, email FROM usuarios WHERE LOWER(email) = LOWER($1) AND senha = $2', 
                    [email?.trim(), senha?.trim()]
                );
                if (result.rows.length > 0) {
                    res.status(200).json({ mensagem: "Login ok", usuario: result.rows[0] });
                } else {
                    res.status(401).json({ erro: "Credenciais inválidas." });
                }
            } catch (err) {
                res.status(500).json({ erro: "Erro no servidor." });
            }
        });

      
        app.get('/animais', async (req: Request, res: Response) => {
            try {
                const result = await Banco.query('SELECT * FROM animais ORDER BY id DESC');
                res.json(result.rows);
            } catch (err) {
                res.status(500).json({ erro: "Erro ao buscar animais." });
            }
        });

        // CADASTRAR ANIMAL
        app.post('/animais', async (req: Request, res: Response) => {
            const { nome, tipo, peso, finalidade, data_abate, producao, consumo_dia } = req.body;
            try {
                const query = `
                    INSERT INTO animais (nome, tipo, peso, finalidade, data_abate, producao, consumo_dia) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                const values = [nome, tipo, peso, finalidade, data_abate || null, producao, consumo_dia];
                const result = await Banco.query(query, values);
                res.status(201).json(result.rows[0]);
            } catch (err) {
                console.error(err);
                res.status(500).json({ erro: "Erro ao salvar animal no banco." });
            }
        });

        // DELETTE ANIMAL
        app.delete('/animais/:id', async (req: Request, res: Response) => {
            try {
                await Banco.query('DELETE FROM animais WHERE id = $1', [req.params.id]);
                res.json({ mensagem: "Animal removido com sucesso." });
            } catch (err) {
                res.status(500).json({ erro: "Erro ao deletar animal." });
            }
        });

        // --- ROTAS DE HISTÓRICO ---
        app.post('/historico', async (req: Request, res: Response) => {
            try {
                await Banco.query('INSERT INTO search_history (search_query) VALUES ($1)', [req.body.search_query]);
                res.status(201).json({ mensagem: "Histórico salvo." });
            } catch (err) {
                res.status(500).json({ erro: "Erro ao salvar histórico." });
            }
        });

        app.get('/historico', async (req: Request, res: Response) => {
            try {
                const result = await Banco.query('SELECT * FROM search_history ORDER BY searched_at DESC LIMIT 10');
                res.json(result.rows);
            } catch (err) {
                res.status(500).json({ erro: "Erro ao buscar histórico." });
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`\n  🚀 Rural Track Back-end Atualizado!`);
            console.log(`  🔗 Local: http://localhost:${PORT}`);
            console.log(`  📂 Rotas de Animais: GET/POST /animais e DELETE /animais/:id\n`);
        });