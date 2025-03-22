
export interface Span {
    start: number;
    end: number;
  }
  
  export interface VideoMessage {
    HyperID: number;
  }
  
  export interface DisplayVid {
    date: string;
    quote: string;
    url: string;
    music: string;
    span: Span;
    HyperTypeId: string;
    HyperID: number;
  }
  
  export interface vidArr {
    videos: DisplayVid[];
  }
  
  export interface VideoResponse {
    messages: VideoMessage[];
  }
  
  export interface SourceDictType {
    videos: DisplayVid[];
  }


  export interface output {
    videos: any[];
  }
  
  
  export interface TimeDict {
    hour: number;
    minute: number;
  }
  
  // Helper type for function signatures
  export type VideoProcessor = (item: DisplayVid, out: DisplayVid[]) => void;
  
  // Common type for API responses
  export interface ApiResponse {
    videos: DisplayVid[];
  }