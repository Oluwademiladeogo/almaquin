import express from 'express';
import { getAllSchools, createSchool, updateSchool, deleteSchool } from '../controllers/secSchool';

const router = express.Router();

router.get('/', getAllSchools);
router.post('/', createSchool);
router.put('/', updateSchool);
router.delete('/', deleteSchool);

export default router;