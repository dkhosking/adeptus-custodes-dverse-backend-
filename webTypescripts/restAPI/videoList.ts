
interface DisplayVid {
  date: string;
  quote: string;
  url: string;
  span: Span;
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


interface vidArr {
  videos: DisplayVid[];
}


interface VideoResponse {
  messages: VideoMessage[];
}


function backTrace(videoData: vidArr, today: Date) {
  const nowMili: number = today.getTime()
  const videoDataArray: DisplayVid[] = videoData.videos
  let index: number = videoDataArray.length -1 
  let out: DisplayVid[] = []
  let minDisSmal = Infinity
  let currentMinWors: DisplayVid[] = []



  // ska göra så att server returnerar detta sen + plus en serie shit posts som dymiskt upptateras

  while (index >= 0) {
    const vid = videoDataArray[index]
    console.log(vid)
    const vidSpan: Span = vid.span;
    const vidDate: number = vidSpan.start

    const diff: number =  nowMili - vidSpan.start

    if (vidDate <= nowMili && diff < minDisSmal) {
      minDisSmal = diff
      currentMinWors = [vid]
    } else if (vidDate <= nowMili && diff === minDisSmal) {
      currentMinWors.push(vid)
    }

    index--
  }

  if (currentMinWors.length > 0) {
    return {videos: currentMinWors}
  }

  const vidPrime = videoDataArray[0]

  return {videos: [vidPrime]}

}

  
    



function millicent(date: string | Date ) {

    const trunc = (date: Date): Date => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    // mer min stil
    const toMili = (input: string | Date): number => {
  
      // i remember ternär oprator åk 8 tech
      const dateObj = typeof input === 'string' ? new Date(input) : input
      const truncDateObj = trunc(dateObj)
  
      return truncDateObj.getTime()
    }
  
    return toMili(date)
  
  
  }
  export { backTrace };