const fs = require('fs');
let greeter = require('./build/src/main');
let MediaUtil = require('./build/src/MediaUtil').default;

console.log('hi');

var myArgs = process.argv.slice(2);

const TEST_DATA_PATH = './media-server/media';

var path = myArgs.length > 0 ? myArgs[0] : TEST_DATA_PATH;

MediaUtil.GetMediaSource(path).then(function (result) {
  let toStringify = { sourceTextureJsons: result.sourceFiles }
  fs.writeFile(`${path}/sourceMedia.json`, JSON.stringify(toStringify, null, 2), (err) => {
    if (err) throw err;
    console.log('JSON saved!');
  });
});