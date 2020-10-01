import express from 'express';
import { createProjectTypeAPI, deleteProjectTypeAPI, getProjectTypeDetailAPI, getProjectTypeListAPI, updateProjectTypeAPI } from '../controllers/ProjectType/projectTypeAPI.js';
import { verifyToken } from '../middleware/verityToken.js';
const router = express.Router();
router.use(verifyToken);
router.post('/project-types/', createProjectTypeAPI);

router.get('/project-types/', getProjectTypeListAPI);//need fix

router.get('/project-types/:id', getProjectTypeDetailAPI);

router.put('/project-types/:id', updateProjectTypeAPI);

router.delete('/project-types/:id', deleteProjectTypeAPI);

export default router;