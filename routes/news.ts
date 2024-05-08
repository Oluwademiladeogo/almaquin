import { Router } from 'express';
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateNewsById,
  searchNewsByTags
} from '../controllers/news';

const router = Router();

router.post('/', createNews);
router.get('/', getAllNews);
router.get('/search', searchNewsByTags);
router.get('/:id', getNewsById);
router.put('/:id', updateNewsById);
router.delete('/:id', deleteNewsById);

export default router;
