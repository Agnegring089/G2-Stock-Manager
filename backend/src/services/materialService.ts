import { MaterialModel, Material, MaterialData } from '../models/MaterialModel';

class MaterialService {
    async createMaterial(materialData: MaterialData): Promise<Material> {
        const { name, type, quantity, last_mov } = materialData;

        // Verificar se já existe um material com o mesmo nome
        const existingMaterial = await MaterialModel.findByName(name);
        if (existingMaterial) {
            throw new Error("Um material com esse nome já existe.");
        }

        // Se não existir, proceder com a criação do material
        const newMaterial = await MaterialModel.createMaterial({
            ...materialData,
            last_mov: last_mov ? new Date(last_mov) : null
        });
        return newMaterial;
    }
    
    async getAllMaterials(): Promise<Material[]> {
        const result = await MaterialModel.getAllMaterials();
        return result;
    }

    async getMaterialById(id: number): Promise<Material> {
        const result = await MaterialModel.getMaterialById(id);
        if (!result) {
            throw new Error('Material não encontrado');
        }
        return result;
    }

    async updateMaterial(id: number, data: Partial<MaterialData>): Promise<Material> {
        const { name, type, quantity, last_mov } = data;
        const material = await this.getMaterialById(id);
        if (!material) {
            throw new Error('Material não encontrado');
        }
        const result = await MaterialModel.updateMaterial(id, {
            name: name || material.name,
            type: type || material.type,
            quantity: quantity || material.quantity,
            last_mov: last_mov ? new Date(last_mov) : material.last_mov
        });
        if (!result) {
            throw new Error('Falha ao atualizar o material');
        }
        return result;
    }

    async deleteMaterial(id: number): Promise<{ message: string }> {
        const material = await this.getMaterialById(id);
        if (material.quantity > 0) {
            throw new Error('Não é possível excluir material com estoque');
        }
        const result = await MaterialModel.deleteMaterial(id);
        if (!result) {
            throw new Error('Falha ao excluir material');
        }
        return { message: 'Material excluído com sucesso' };
    }

    async addMaterialQuantity(id: number, quantityToAdd: number): Promise<Material> {
        if (quantityToAdd <= 0) {
            throw new Error('A quantidade a ser adicionada deve ser maior que zero.');
        }
        const updatedMaterial = await MaterialModel.increaseQuantity(id, quantityToAdd);
        if (!updatedMaterial) {
            throw new Error('Material não encontrado');
        }
        return updatedMaterial;
    }

    async requestMaterialQuantity(id: number, quantityToRequest: number): Promise<Material> {
        if (quantityToRequest <= 0) {
            throw new Error('A quantidade solicitada deve ser maior que zero.');
        }
        const material = await this.getMaterialById(id);
        if (!material) {
            throw new Error('Material não encontrado');
        }
        if (material.quantity < quantityToRequest) {
            throw new Error('Estoque insuficiente para a quantidade solicitada.');
        }
        const updatedMaterial = await MaterialModel.decreaseQuantity(id, quantityToRequest);
        if (!updatedMaterial) {
            throw new Error('Falha ao atualizar a quantidade do material');
        }
        return updatedMaterial;
    }
}

export default new MaterialService();
