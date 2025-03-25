import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { sourceVid } from "./backblazeInternal/sourceVid"
import { fetchVideosData, FetchActiveVid, fetchEras } from './fetchBackBlazeJson';

const app = express();

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', 'https://www.dverse.se');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();

});

app.use(express.json());


(async function init() {
  sourceVid.create("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/VidSource.json")
  // Function body
})();  // 


// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Shrek is love, Shrek is yo, testasdsad N2 on solana, gearheads, test', status: 'online', ogre: true });
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


app.get('/api/era', async (req, res) => {
  const data =  await fetchEras()


  res.json(data)
});



app.get('/api/currentMusic', async (req, res) => {
  const data =  await fetchEras()


  res.json(  data[0].music)
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
