import express from 'express';
import cors from 'cors';

import { fetchVideosData } from './fetchBackBlazeJson';

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Shrek is love, Shrek is life, testasdsad N2 on solana, gearheads, test', status: 'online', ogre: true });
});

app.get('/api/videos', async (req, res) => {
  const data = await fetchVideosData()
  res.json({out: data})
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://207.180.233.244:${PORT}`);
});
