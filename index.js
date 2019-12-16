const fs = require('fs');
let greeter = require('./build/src/main');
let MediaUtil = require('./build/src/MediaUtil').default;

console.log('hi');

var path = './media-server/media';

MediaUtil.GetMediaSource(path).then(function (result) {
  let toStringify = { sourceTextureJsons: result.sourceFiles }
  fs.writeFile(`${path}/sourceMedia.json`, JSON.stringify(toStringify, null, 2), (err) => {
    if (err) throw err;
    console.log('JSON saved!');
  });
});