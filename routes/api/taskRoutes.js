import express from 'express'
import Task from '../../models/Task';
import auth from '../../utils/auth.js'


const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

