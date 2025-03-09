import { start } from "repl";



// this file is a bit of a mess. Will clean up later and add more sophisticated subsystems
// soon i will move on to writing data
async function jsonGrab(url:string): Promise<any> {
  const out = await fetch(url)
  const outData = await out.json()
  return outData
}


interface TimeDict {
  hour: number;
  minute: number;
}

interface Span {
  start: number
  end: number;
}

interface VideoMessage {
  HyperID: number;  // Make sure this matches the actual JSON structure
}


interface VideoSource {
  HyperID: number;
  span: Span;
  url: string;
}

interface DisplayVid {
  date: string;
  quote: string;
  url: string;
}

interface vidArr {
  videos: DisplayVid[];
}


interface VideoResponse {
  messages: VideoMessage[];
}


function withinMinuteHour(span: Span, currentMins:number) {

  // in a better world n1 n2 n3
  const startMins = span.start;
  const endMins = span.end;



  if (startMins <= endMins) {
    return currentMins >= startMins && currentMins <= endMins; 
  } else {
    return currentMins >= startMins || currentMins <= endMins;  
  }

}

 async function FetchActiveVid(): Promise<vidArr> {

  const minutesInminute:number = 60
  const hoursInDay:number = 24
  const SpanBuilder = (start: number, end:number): Span => {
    return {start: start, end: end}
  }


  const TimeDictBuilder = (point: Date): TimeDict => {
    return {hour: point.getHours(), minute: point.getMinutes()}
  }



  const now = new Date()

  const toMinutes = (time: TimeDict) => (time.hour * minutesInminute + time.minute) % (hoursInDay * minutesInminute);

  const currentMins: number = toMinutes(TimeDictBuilder(now))

  


// Will route trough api find Json by name later
  const SourceDict: any = await jsonGrab("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/VidSource.json")
  const Source: VideoSource[] = SourceDict.messages
  const hiddenVideos: VideoResponse = await jsonGrab("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/sexvideos.json")
  for (const item of hiddenVideos.messages) {
    const HyperID: number = item.HyperID
    const IndexHyperID: number = HyperID -1

    // this may vary, as i store varing things in source. Will define functions at later time.
    const correspondingHidden: VideoSource = Source[IndexHyperID]
    const correspondingSpan: Span = correspondingHidden.span;
    console.log(correspondingSpan)
    if (withinMinuteHour(correspondingSpan, currentMins)) {
      return {videos: [{url: correspondingHidden.url, date:"0-0-0", quote:" "}]}
    }


  }



  return await fetchVideosData();
}

 async function fetchVideosData() {
  return await jsonGrab("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/DverseData_videos.json")
}
export { FetchActiveVid, fetchVideosData };