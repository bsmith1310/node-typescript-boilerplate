// @ts-nocheck

import * as fs from 'fs';

import * as sharp from 'sharp';

import MediaSource from '../MediaUtil/models/MediaSource';
import MediaUrlUtils from '../MediaUrlUtils';
import FileInfo from '../MediaUtil/models/FileInfo';

class ResizeUtil {

  public static GenerateDzi(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((resolve, reject) => {
      this.GenerateDziForImage(mediaPath, mediaSource.sourceFiles[0]);
    });
  }

  private static GenerateDziForImage(mediaPath:string, sourceFileInfo:FileInfo) {
    let outputPathParent = MediaUrlUtils.GetCacheFsPathAbsolute(mediaPath, sourceFileInfo.url);
    try {
      fs.mkdirSync(outputPathParent, {recursive:true});
      console.log(`created dir: ${outputPathParent}`);
    } catch (e) {
      console.log(`failed to create dir: ${outputPathParent}`);
    }
    let outputPath = MediaUrlUtils.GetCachItemFsPathAbsolute(mediaPath, sourceFileInfo.url, 'dzi');
    try {
      fs.mkdirSync(outputPath, {recursive:true});
      console.log(`created dir: ${outputPath}`);
    } catch (e) {
      console.log(`failed to create dir: ${outputPath}`);
    }
    let filePath = MediaUrlUtils.GetFsFullPathAbsolute(mediaPath, sourceFileInfo.url);
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
  }

  public static GenerateThumbnails(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((resolve, reject) => {

      // NOTE: Likely don't need this? DZI should be all that is needed.

      console.log('TODO - GenerateThumbnails');
    });
  }
}

export default ResizeUtil;