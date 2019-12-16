import * as fs from 'fs';

import * as sharp from 'sharp';
import * as mkdirp from 'mkdirp';

import MediaSource from '../MediaUtil/models/MediaSource';
import MediaUrlUtils from '../MediaUrlUtils';
import FileInfo from '../MediaUtil/models/FileInfo';

class ResizeUtil {

  public static generateDzi(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    console.log('generateDzi');
    return new Promise((resolve) => {
      for (let ix = 0; ix < mediaSource.sourceFiles.length; ix++) {
        const sourceFile = mediaSource.sourceFiles[ix];
        this.generateDziForImage(mediaPath, sourceFile);
      }
      resolve(null);
    });
  }

  private static generateDziForImage(mediaPath: string, sourceFileInfo: FileInfo) {
    let outputPath = MediaUrlUtils.GetCacheItemFsPathAbsolute(mediaPath, sourceFileInfo.url, 'dzi');
    mkdirp(outputPath, function (err) {
      if (err) {
        console.error(err)
      } else {
        let outputPathParent = MediaUrlUtils.GetCacheFsPathAbsolute(mediaPath, sourceFileInfo.url);
        let filePath = MediaUrlUtils.GetFsFullPathAbsolute(mediaPath, sourceFileInfo.url);
        sharp(filePath)
          .jpeg({
            quality: 90,
            chromaSubsampling: '4:4:4'
          }) 
          .tile({
            size: 512
          })       
          .toFile(outputPath + '\\dzi', function (/*err, info*/) {
            // output.dzi is the Deep Zoom XML definition
            // output_files contains 512x512 tiles grouped by zoom level
            debugger;
          });
      }
    });
  }

  public static generateThumbnails(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    return new Promise((/*resolve, reject*/) => {

      // NOTE: Likely don't need this? DZI should be all that is needed.

      console.log(`TODO - GenerateThumbnails, mediaPath:${mediaPath}, mediaSource.sourceFiles.length:${mediaSource.sourceFiles.length}`);
    });
  }
}

export default ResizeUtil;