import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Shrek is love, Shrek is life, bow down to the blood god', status: 'online', ogre: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://207.180.233.244:${PORT}`);
});