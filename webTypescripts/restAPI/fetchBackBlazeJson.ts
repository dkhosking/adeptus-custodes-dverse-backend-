import { start } from "repl";
import { backTrace } from "./videoList";
import { sourceVid } from "./backblazeInternal/sourceVid"


import { 
  Span,
  VideoResponse,
  output
} from "./backblazeInternal/types";

// this file is a bit of a mess. Will clean up later and add more sophisticated subsystems
// soon i will move on to writing data
async function jsonGrab(url:string): Promise<any> {
  const out = await fetch(url)
  const outData = await out.json()
  return outData
}




function withinMiliSpan(span: Span, currentMili:number) {

  // in a better world n1 n2 n3
  const startMili = span.start;
  const endMili = span.end;



  if (startMili <= endMili) {
    return currentMili >= startMili && currentMili <= endMili; 
  } else {
    return currentMili >= startMili || currentMili <= endMili;  
  }

}



 async function FetchActiveVid() {



  const now = new Date()


  const currentMili: number = now.getMilliseconds()

  const hiddenVideos: VideoResponse = await jsonGrab("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/sexvideos.json")
  let test = new sourceVid()


  test.parseByGivenID(hiddenVideos.messages, "midnight")

  const findCurrentHidden = (item: any, out:any[]) => {

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const miliOffset = now.getTime()

    item.span = {
      start: miliOffset + item.span.start,
      end: miliOffset + item.span.end
    }

    const itemSpan: Span = item.span
    if (withinMiliSpan(itemSpan, currentMili)) {
      out.push(item)
    }
  }

  let out: Array<any> = await test.parseByGivenIDsHigherOrder(hiddenVideos.messages, "midnight", findCurrentHidden)
  if (out.length > 0) {
    return {videos: out}
  }


  const outSplice = (original: output, additional: output) => {

    const combined = original.videos.slice(); // Create copy
    additional.videos.forEach(item => combined.push(item));

    return {videos: combined }
  } 

  const eras = await fetchEras()
  const output = ((await sourceVid.returnDataTrace()).videos)
  if (eras.length > 0) {
    output.push(eras[0])
  }

  return output
}

 async function fetchVideosData() {
  return sourceVid.returnDataTrace()
}


async function fetchEras() {
  return sourceVid.parseHyperIDType("era")
}
export { FetchActiveVid, fetchVideosData, fetchEras };