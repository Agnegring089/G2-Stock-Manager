import pool from "../database/dbConfig";

interface User {
    id?: number;
    login: string;
    email: string;
    cpf: string;
    senha: string;
    cargo: 'adm' | 'func' | 'estag';
}

class UserModel {
    async createUser(user: User): Promise<User> {
        const { login, email, cpf, senha, cargo } = user;
        const { rows } = await pool.query(
            "INSERT INTO usuario (login, email, cpf, senha, cargo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [login, email, cpf, senha, cargo]
        );
        return rows[0];
    }

    async getAllUsers(): Promise<User[]> {
        const { rows } = await pool.query("SELECT * FROM usuario");
        return rows;
    }

    async getUserById(id: number): Promise<User | null> {
        const { rows } = await pool.query("SELECT * FROM usuario WHERE id = $1", [id]);
        if (rows.length) {
            return rows[0];
        } else {
            return null;
        }
    }

    async updateUser(id: number, user: Partial<User>): Promise<void> {
        const fields = Object.keys(user).filter(key => user[key] !== undefined);
        const query = `UPDATE usuario SET ${fields.map((field, index) => `${field} = $${index + 2}`).join(", ")} WHERE id = $1`;
        const values = [id, ...fields.map(field => user[field])];
        await pool.query(query, values);
    }

    async deleteUser(id: number): Promise<void> {
        await pool.query("DELETE FROM usuario WHERE id = $1", [id]);
    }
}

export { User, UserModel };
