import { Router } from 'express';
import { getAllCoches, getOneCoche, postOneCoche, deleteOneCoche, getStats } from '../controllers/coches.js';

const router = Router();

router.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

router.get('/stats', getStats);
router.get('/', getAllCoches);
router.get('/:cocheId', getOneCoche);
router.post('/', postOneCoche);
router.delete('/:cocheId', deleteOneCoche);

export default router;
