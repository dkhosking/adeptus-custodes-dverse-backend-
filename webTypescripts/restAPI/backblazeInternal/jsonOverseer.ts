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

class jsonOverseer {
  static filenames;


  static async create(sourceUrl: string) {

    // will add func that aquires all json, then saves path
    // additionaly, if jsonOverseer detects absence of a particular file based upon its name
    // it will then begin repair procces and decemination 
    const filenames = {"source": "data/source.json"}
  }





  static async findFilePathByName(name: string) {
    // fix later
    return (jsonOverseer.filenames)[name]
  }



  static async fileByName() {
    return "sadas"
  }
    // deceminate

    // Find by name

    // upwards propagate
}

export {jsonOverseer} 