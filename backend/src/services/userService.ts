import pool from '../database/dbConfig';

class UserService {
    async createUser(data: any) {
        const { login, email, cpf, senha, cargo } = data;

        const cpfCheck = await pool.query('SELECT * FROM usuario WHERE cpf = $1', [cpf]);
        if (cpfCheck.rows.length > 0) {
            throw new Error('CPF já cadastrado.');
        }

        const loginCheck = await pool.query('SELECT * FROM usuario WHERE login = $1', [login]);
        if (loginCheck.rows.length > 0) {
            throw new Error('Login já existe.');
        }

        const result = await pool.query(
            'INSERT INTO usuario (login, email, cpf, senha, cargo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [login, email, cpf, senha, cargo]
        );
        return result.rows[0];
    }

    async getAllUsers() {
        const result = await pool.query('SELECT * FROM usuario');
        return result.rows;
    }

    async getUserById(id: number) {
        const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
        return result.rows[0];
    }

    async updateUser(id: number, data: any) {
        const { login, email, cpf, senha, cargo } = data;
        const result = await pool.query(
            'UPDATE usuario SET login = $1, email = $2, cpf = $3, senha = $4, cargo = $5 WHERE id = $6 RETURNING *',
            [login, email, cpf, senha, cargo, id]
        );
        return result.rows[0];
    }

    async deleteUser(id: number) {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount !== null && result.rowCount > 0) {
            return true;
        }
        return false;
    }
}

export default new UserService();
