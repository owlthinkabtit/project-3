import express from 'express';
const router = express.Router();

import Project from '../../models/Project';
import { authMiddleware } from '../utils/auth.js';

router.use(authMiddleware)

router.post('/', async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      user: req.user
    };
    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;