// @ts-nocheck

import * as fs from 'fs';

import * as sharp from 'sharp';

import MediaSource from '../MediaUtil/models/MediaSource';
import MediaUrlUtils from '../MediaUrlUtils';

class ResizeUtil {

  public static GenerateDzi(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((resolve, reject) => {
      let outputPathParent = MediaUrlUtils.GetCacheFsPathAbsolute(mediaPath, mediaSource.sourceFiles[0].url);
      try {
        fs.mkdirSync(outputPathParent, {recursive:true});
        console.log(`created dir: ${outputPathParent}`);
      } catch (e) {
        console.log(`failed to create dir: ${outputPathParent}`);
      }
      let outputPath = MediaUrlUtils.GetCachItemFsPathAbsolute(mediaPath, mediaSource.sourceFiles[0].url, 'dzi');
      try {
        fs.mkdirSync(outputPath, {recursive:true});
        console.log(`created dir: ${outputPath}`);
      } catch (e) {
        console.log(`failed to create dir: ${outputPath}`);
      }
      let filePath = MediaUrlUtils.GetFsFullPathAbsolute(mediaPath, mediaSource.sourceFiles[0].url);
      sharp(filePath)
        .tile({
          size: 512
        })
        .toFile(outputPath + '\\dzi', function (err, info) {
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