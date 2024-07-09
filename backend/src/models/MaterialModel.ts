import pool from "../database/dbConfig";

interface Material {
    id?: number;
    name: string;
    type: 'limpeza' | 'infraestrutura' | 'tecnologia' | 'escritorio' | 'outros';
    quantity: number;
    last_mov: Date | null;
}

interface MaterialData {
    name: string;
    type: 'limpeza' | 'infraestrutura' | 'tecnologia' | 'escritorio' | 'outros';
    quantity: number;
    last_mov: Date | null;
}

class MaterialModel {
    static async createMaterial(material: Material): Promise<Material> {
        const { name, type, quantity, last_mov } = material;
        console.log('Creating material with data:', { name, type, quantity, last_mov });
        const result = await pool.query(
            `INSERT INTO materiais (name, type, quantity, last_mov)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, type, quantity, last_mov || null]
        );
        return result.rows[0];
    }

    static async findByName(name: string): Promise<Material | null> {
        const result = await pool.query('SELECT * FROM materiais WHERE name = $1', [name]);
        return result.rows.length ? result.rows[0] : null;
    }

    static async increaseQuantity(id: number, amount: number): Promise<Material | null> {
        const result = await pool.query(
            'UPDATE materiais SET quantity = quantity + $1 WHERE id = $2 RETURNING *',
            [amount, id]
        );
        return result.rows.length ? result.rows[0] : null;
    }

    static async decreaseQuantity(id: number, amount: number): Promise<Material | null> {
        const result = await pool.query(
            'UPDATE materiais SET quantity = quantity - $1 WHERE id = $2 RETURNING *',
            [amount, id]
        );
        return result.rows.length ? result.rows[0] : null;
    }

    static async getAllMaterials(): Promise<Material[]> {
        const { rows } = await pool.query("SELECT * FROM materiais");
        return rows;
    }

    static async getMaterialById(id: number): Promise<Material | null> {
        const result = await pool.query("SELECT * FROM materiais WHERE id = $1", [id]);
        return result.rows.length ? result.rows[0] : null;
    }

    static async updateMaterial(id: number, updates: Partial<Material>): Promise<Material | null> {
        const fields = Object.keys(updates).filter(key => updates[key as keyof Material] !== undefined);
        const query = `UPDATE materiais SET ${fields.map((field, index) => `${field} = $${index + 2}`).join(", ")} WHERE id = $1 RETURNING *`;
        const values = [id, ...fields.map(field => updates[field as keyof Material])];

        console.log('Updating material with data:', { id, updates });

        const result = await pool.query(query, values);
        return result.rows.length ? result.rows[0] : null;
    }

    static async deleteMaterial(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM materiais WHERE id = $1 RETURNING *", [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}

export { MaterialModel, Material, MaterialData };
