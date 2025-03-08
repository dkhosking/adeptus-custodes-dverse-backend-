


import axios from 'axios';

async function jsonGrab(url:string) {
  const out = await fetch(url)
  const outData = await out.json()
  return outData
}

export async function fetchVideosData() {
  return await jsonGrab("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/videos.json")
}
