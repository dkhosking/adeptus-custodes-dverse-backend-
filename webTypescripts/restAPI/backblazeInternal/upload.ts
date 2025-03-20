import B2 from 'backblaze-b2';
import { type Request, type Response } from 'express';

import { sourceVid } from "./source"

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
import { json } from 'stream/consumers';




const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID ?? '',
  applicationKey: process.env.B2_APP_KEY ?? ''
});

// vidarr stupid smh
function timeSort(data: DisplayVid[], og:Array<DisplayVid>) {

  sourceVid.create("https://dverse.s3.eu-central-003.backblazeb2.com/DverseData/VidSource.json")
  // it  that the added element is in the future, or it is infact almost certain
  // inspite of this i wish to retain future compatibility should i decide to make a timeline

  // until the new data is redred empty []
  // the first element will be taken and then backtraced to find its aproptriate placeing


  for (let item of og ) {
    sourceVid.backlog(data, item.span.start)
    const startMili =  item.span.start
    const insertIndex = sourceVid.backlog(og, startMili) + 1; // +1 to insert after
    
    // Insert at the right position
    og.splice(insertIndex, 0, item);
  }
  return og
}
// i dont like using any, but the data needs to be somewhat variable
function add(data:any, og: any, sort?: (data: any, og:any) => any) {

    // Create a copy of the original data
    const result = { ...og };
    // ew
    const arrayProperty = Object.keys(og).find(key => 
      Array.isArray(og[key])
    );

    // normaly i would do something more verbose but in this i case i do not care because itz internet stuff
    if (arrayProperty && data[arrayProperty] && Array.isArray(data[arrayProperty])) {
      // Add the new items to the existing array
      // this uses the spread operator. Again i would prefer something more verbose, but this would most certantly
      // be faster than a simple for loop

      if(sort) {
        result[arrayProperty] = sort(result[arrayProperty], data[arrayProperty])
      }

      result[arrayProperty] = [...result[arrayProperty], ...data[arrayProperty]];


      return result;
    }
    throw new Error('Well my dear shrigga, you have attempted a merge of incomaptible content');

}

async function updateUnsortedJson(data: any, og:any, fileName:string): Promise<boolean> {
  
  await b2.authorize();


  const addedData = add(data, og, timeSort);
  const jsonString = JSON.stringify(addedData, null, 2);
  const buffer = Buffer.from(jsonString);

  const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID ?? ''
  });


  // will add find url by filename etc later 
  await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName: `DverseData/${fileName}.json`,
    data: buffer,
    contentType: 'application/json'
  });

  return true;
  
}


