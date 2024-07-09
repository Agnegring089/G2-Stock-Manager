import { Router } from 'express';
import userRoutes from './UserRoutes';
import materialRoutes from './MaterialRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/materials', materialRoutes);

export default router;
