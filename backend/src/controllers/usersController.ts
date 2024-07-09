import { Request, Response } from 'express';
import UserService from '../services/userService';

class UsersController {
    async createUser(req: Request, res: Response): Promise<Response> {
        const { login, email, cpf, senha, cargo } = req.body;

        if (!login || !email || !cpf || !senha || !cargo) {
            return res.status(400).json({ error: 'Login, email, cpf, senha e cargo são obrigatórios' });
        }

        try {
            const user = await UserService.createUser({ login, email, cpf, senha, cargo });
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro, contate o Administrador!' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro, contate o Administrador!' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UserService.getUserById(Number(req.params.id));
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro, contate o Administrador!' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { login, email, cpf, senha, cargo } = req.body;

        // Verificação de campos obrigatórios
        if (!login || !email || !cpf || !senha || !cargo) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios para atualização' });
        }

        try {
            const user = await UserService.updateUser(Number(req.params.id), { login, email, cpf, senha, cargo });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro, contate o Supervisor!' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const result = await UserService.deleteUser(Number(req.params.id));
            if (!result) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro, contate o Supervisor!' });
        }
    }
}

export default new UsersController();
