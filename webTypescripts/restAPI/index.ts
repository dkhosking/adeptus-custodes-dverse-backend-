import express from 'express';
import cors from 'cors';

import { fetchVideosData, FetchActiveVid } from './fetchBackBlazeJson';

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Shrek is love, Shrek is life, testasdsad N2 on solana, gearheads, test', status: 'online', ogre: true });
});
app.get('/api/test2', async (req, res) => {
  const data = await FetchActiveVid()

  // be wary of. need to find way to make auto, will create problems otherwise
  res.json(data)
});


app.get('/api/videos', async (req, res) => {
  const data = await FetchActiveVid()

  res.json(data)
});


  /*
// Express endpoint
app.post('/api/videos/update', async (req: UpdateRequest, res: Response) => {

  try {
    const success = await updateBackblazeJson(req.body);
    
    if (success) {
      res.json({ message: 'Updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update' });
    }
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Server error' 
    });
  }

});

  */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://207.180.233.244:${PORT}`);
});
