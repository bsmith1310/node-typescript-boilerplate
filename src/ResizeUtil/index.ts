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

  public static generateThumbnails(mediaPath: string, mediaSource: MediaSource): Promise<null> {
    console.log('generateTn');
    return new Promise((resolve) => {
      for (let ix = 0; ix < mediaSource.sourceFiles.length; ix++) {
        const sourceFile = mediaSource.sourceFiles[ix];
        this.generateThumbnailForImage(mediaPath, sourceFile);
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

  public static generateThumbnailForImage(mediaPath: string, sourceFileInfo: FileInfo) {
    let outputPath = MediaUrlUtils.GetCacheItemFsPathAbsolute(mediaPath, sourceFileInfo.url, 'tn');
    mkdirp(outputPath, function (err) {
      if (err) {
        console.error(err)
      } else {
        // let outputPathParent = MediaUrlUtils.GetCacheFsPathAbsolute(mediaPath, sourceFileInfo.url);
        let filePath = MediaUrlUtils.GetFsFullPathAbsolute(mediaPath, sourceFileInfo.url);
        sharp(filePath)
          .resize(512, 512, {
            kernel: sharp.kernel.nearest,
            fit: 'inside',
          })
          .toFile(outputPath + '\\tn_512.jpg', function (err, info) {
            // output.dzi is the Deep Zoom XML definition
            // output_files contains 512x512 tiles grouped by zoom level
            console.log(`TN toFile`);
            console.log(`err`);
            console.log(JSON.stringify(err));
            console.log(`info`);
            console.log(JSON.stringify(info));
          });
        // sharp(filePath)
        //   .resize(512, 512)
        //   .max()
        //   .toFormat('jpeg')
        //   .toFile(outputPath + '\\tn_512.jpg', function (/*err, info*/) {
        //     // output.dzi is the Deep Zoom XML definition
        //     // output_files contains 512x512 tiles grouped by zoom level
        //     debugger;
        //   })
        //   .then(function(outputBuffer) {
        //     // outputBuffer contains JPEG image data no wider than 200 pixels and no higher
        //     // than 200 pixels regardless of the inputBuffer image dimensions
        //   });
        // sharp(filePath)
        //   .jpeg({
        //     quality: 90,
        //     chromaSubsampling: '4:4:4'
        //   }) 
        //   .tile({
        //     size: 512
        //   })       
        //   .toFile(outputPath + '\\dzi', function (/*err, info*/) {
        //     // output.dzi is the Deep Zoom XML definition
        //     // output_files contains 512x512 tiles grouped by zoom level
        //     debugger;
        //   });
      }
    });
  }
}

export default ResizeUtil;