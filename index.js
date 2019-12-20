const fs = require('fs');
let greeter = require('./build/src/main');
let MediaUtil = require('./build/src/MediaUtil').default;
let ResizeUtil = require('./build/src/ResizeUtil').default;

console.log('hi');

var myArgs = process.argv.slice(2);

const TEST_DATA_PATH = './_test_data';

var path = myArgs.length > 0 ? myArgs[0] : TEST_DATA_PATH;

let generateDzi = true;
let generateThumbnails = true;

for (let ix = 1; ix < myArgs.length; ix++) {
  const arg = myArgs[ix];
  if (arg === 'dzi') {
    generateDzi = true;
  } else if (arg === 'tn') {
    generateThumbnails = true;
  }
}

MediaUtil.GetMediaSource(path).then(function (result) {
  let toStringify = { sourceTextureJsons: result.sourceFiles }

  if (generateDzi) {
    ResizeUtil.generateDzi(path, result);
  }

  if (generateThumbnails) {
    ResizeUtil.generateThumbnails(path, result);
  }

  fs.writeFile(`${path}/sourceMedia.json`, JSON.stringify(toStringify, null, 2), (err) => {
    if (err) throw err;
    console.log('JSON saved!');
  });
});