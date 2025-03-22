

import B2 from 'backblaze-b2';
const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID ?? '',
    applicationKey: process.env.B2_APP_KEY ?? ''
  });
  

class jsonOverseer {
  static filenames: Record<string, string>
  static folder: string = "DverseData"
  static basePath: string = "https://dverse.s3.eu-central-003.backblazeb2.com"


  static async create(sourceUrl: string) {

    // will add func that aquires all json, then saves path
    // additionaly, if jsonOverseer detects absence of a particular file based upon its name
    // it will then begin repair procces and decemination

  }





  static async findFilePathByName(name: string) {
    // fix later
    return (jsonOverseer.filenames)[name]
  }

  static async uploadJsonFile(path:string, data:string) {

    
  const jsonString = JSON.stringify(data, null, 2);
  const buffer = Buffer.from(jsonString);

    
  const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID ?? ''
  });


  // will add find url by filename etc later 
  await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName: `${path}.json`,
    data: buffer,
    contentType: 'application/json'
  });

  }



    // deceminate

    // Find by name


    async jsonByName(fileName: string): Promise<any> {

      // could implement a function that finds the folder with the filename in it ¨
      // seems execive however

      const response = await fetch(`${jsonOverseer.basePath}/${jsonOverseer.folder}/${fileName}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}.json: ${response.status}`);
      }
      
      const jsonData = await response.json();
      return jsonData;
  
    }

    // upwards propagate
}

export {jsonOverseer} 