import { 
    Span,
    VideoMessage,
    DisplayVid,
    vidArr,
    VideoResponse,
    SourceDictType,
    TimeDict,
    ApiResponse,
    VideoProcessor 
  } from './types';




class sourceVid {


    static source: vidArr;
    static sourceArr: DisplayVid[];
    static async create(sourceUrl: string) {
      const data = await sourceVid.jsonGrab(sourceUrl);
      this.source = data
      this.sourceArr = (data.videos)
    }


    static async jsonGrab(url:string): Promise<any> {
      const out = await fetch(url)
      const outData = await out.json()
      return outData
    }


    // should add min max later for backtrace, more modular code
    static backlog(videoData: DisplayVid[], mili:number) {
      let index = videoData.length -1
      
      while (index >= 0) {
        let current: number = videoData[index].span.start
        if (current < mili) {
          return index
        }
        index--;
      }

      return 0
    }

    // kommer kalla backlog här. För brute sort kan jag använda C/c++ eller rust. 
    // Tror inte att det är så lät att decimenera däremot. använder bara det för sorteringsteget.
    // behöver dock inte är bara roligt
    static backTrace(videoData: vidArr, today: Date) {
      const nowMili: number = today.getTime()
      const videoDataArray: DisplayVid[] = videoData.videos
      let index: number = videoDataArray.length -1 
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


    
  
    
    static equals(HyperTypeId: string, item:DisplayVid) {
      if (item.HyperTypeId === HyperTypeId) {
        return true
      }
    }
  
  
    static async parseHyperIDType(type: string) {
      return this.parseIDFiler(type, this.equals.bind(this))
    
    }
  
    static async returnData() {
      return await sourceVid.source
    }
  
    static async returnDataTrace() {
      return sourceVid.backTrace( sourceVid.source, new Date())
    }
    
  
    static async parseIDFiler(type: string, cond: Function ) {
      let out: DisplayVid[] = []
      for (const item of (sourceVid.source).videos) {
  
        if (cond(type, item)) {
          out.push(item)
        }
      }
      return out
    }
  
    async parseByGivenIDsHigherOrder(Ids: VideoMessage[], type:string, cond: Function ): Promise<Array<any>> {
      let out: any = []
      for (const item of Ids) {
        const HyperID: number = item.HyperID
        const IndexHyperID: number = HyperID -1
    
        // this may vary, as i store varing things in source. Will define functions at later time.
        const corresponding: DisplayVid = (sourceVid.sourceArr)[IndexHyperID]
    
        if (corresponding.HyperTypeId == type) {
    
          cond(corresponding, out)
    
        }
      }
      return await out 
    }
  
  
    async parseByGivenID(Ids: VideoMessage[], type:string): Promise<any[]> {
  
      const simplePush = (corresponding: DisplayVid, out: DisplayVid[]) => {
        out.push(corresponding)
      }
  
    return await this.parseByGivenIDsHigherOrder(Ids, type, simplePush)
  
  }}



class subVid {
  
    static source: SourceDictType;
    static sourceArr: DisplayVid[];
    static async create(sourceUrl: string) {
      const data = await sourceVid.jsonGrab(sourceUrl);
      this.source = data
      this.sourceArr = (data.videos)
    }
  
  }
  
export {sourceVid} 