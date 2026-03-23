import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouters from './routes/api/userRoutes.js';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect:", err));

app.use('/api/users', userRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))