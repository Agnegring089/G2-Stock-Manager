import { Request, Response } from 'express';
import MaterialService from '../services/materialService';

class MaterialController {
    async createMaterial(req: Request, res: Response): Promise<Response> {
        try {
            const material = await MaterialService.createMaterial(req.body);
            return res.status(201).json(material);
        } catch (error) {
            console.error('Error creating material:', error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }

    async getAllMaterials(req: Request, res: Response): Promise<Response> {
        try {
            const materials = await MaterialService.getAllMaterials();
            return res.status(200).json(materials);
        } catch (error) {
            console.error('Error getting all materials:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }

    async getMaterialById(req: Request, res: Response): Promise<Response> {
        try {
            const material = await MaterialService.getMaterialById(Number(req.params.id));
            return res.status(200).json(material);
        } catch (error) {
            console.error('Error getting material by ID:', error);
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(404).json({ error: 'Unknown error occurred' });
        }
    }

    async updateMaterial(req: Request, res: Response): Promise<Response> {
        try {
            const material = await MaterialService.updateMaterial(Number(req.params.id), req.body);
            return res.status(200).json(material);
        } catch (error) {
            console.error('Error updating material:', error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }

    async deleteMaterial(req: Request, res: Response): Promise<Response> {
        try {
            const result = await MaterialService.deleteMaterial(Number(req.params.id));
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting material:', error);
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(404).json({ error: 'Unknown error occurred' });
        }
    }

    async addMaterialQuantity(req: Request, res: Response): Promise<Response> {
        try {
            const material = await MaterialService.addMaterialQuantity(Number(req.params.id), req.body.quantityToAdd);
            return res.status(200).json(material);
        } catch (error) {
            console.error('Error adding material quantity:', error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }

    async requestMaterialQuantity(req: Request, res: Response): Promise<Response> {
        try {
            const material = await MaterialService.requestMaterialQuantity(Number(req.params.id), req.body.quantityToRequest);
            return res.status(200).json(material);
        } catch (error) {
            console.error('Error requesting material quantity:', error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
}

export default new MaterialController();
