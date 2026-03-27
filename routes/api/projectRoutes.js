import express from 'express';
const router = express.Router();

import Project from '../../models/Project.js';
import authMiddleware from '../../utils/auth.js';

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

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user });
    res.status(200).json(projects);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user) {
      return res.status(403).json({ error: "Not authorized to view this project." })
    }
    res.status(200).json(project);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user) {
      return res.status(403).json({ error: "Not authorized to delete this project" });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;