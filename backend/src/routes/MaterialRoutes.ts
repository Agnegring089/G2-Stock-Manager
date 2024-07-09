import { Router } from 'express';
import MaterialController from '../controllers/materialController';

const router = Router();

router.post('/', MaterialController.createMaterial);
router.get('/', MaterialController.getAllMaterials);
router.get('/:id', MaterialController.getMaterialById);
router.put('/:id', MaterialController.updateMaterial);
router.delete('/:id', MaterialController.deleteMaterial);
router.post('/add/:id', MaterialController.addMaterialQuantity);
router.post('/request/:id', MaterialController.requestMaterialQuantity);

export default router;
