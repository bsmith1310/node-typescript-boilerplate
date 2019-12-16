// @ts-nocheck

import * as sharp from 'sharp';

import MediaSource from '../MediaUtil/models/MediaSource';

class ResizeUtil {

  public static GenerateDzi(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((resolve, reject) => {
      let filePath = mediaPath + '/' + mediaSource.sourceFiles[0].url;
      sharp(filePath)
        .tile({
          size: 512
        })
        .toFile('./output/bar2', function (err, info) {
          // output.dzi is the Deep Zoom XML definition
          // output_files contains 512x512 tiles grouped by zoom level
          debugger;
        });
      console.log('TODO - GenerateDzi');
    });
  }

  public static GenerateThumbnails(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((resolve, reject) => {
      console.log('TODO - GenerateThumbnails');
    });
  }
}

export default ResizeUtil;