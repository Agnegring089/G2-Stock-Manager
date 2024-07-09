import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database/dbConfig';

const validationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { login, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE login = $1', [login]);
    if (result.rows.length === 0) {
      return res.status(401).send('Login ou senha inválidos');
    }

    const usuario = result.rows[0];
    const passwordMatch = await bcrypt.compare(senha, usuario.senha);

    if (!passwordMatch) {
      return res.status(401).send('Login ou senha inválidos');
    }

    req.user = {
      id: usuario.id,
      login: usuario.login,
      cargo: usuario.cargo
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

export default validationMiddleware;
