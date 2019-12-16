let greeter = require('./build/src/main');
let MediaUtil = require('./build/src/MediaUtil');

console.log('hi');

// This is a simple NodeJS app meant to be deployed to the VM that is using IIS to host the
// media as static content. This app does not do the hosting, just builds a JSON file
// by scanning the media hosted. The JSON is then also served by the IIS site, made avaiable
// for the Spread Blend UI app to read.

// Short term, if this needs to be more robust, consider scaffolding a simply Express app:
// https://expressjs.com/en/starter/generator.html

// Medium term, this could be a simple NodeJS app that exposes an API.

// Long term, this will be a full-fledged DAM/media server that hopefully runs in a serverless
// fashion, with a very highly scalable and fault-tollerant architecture.

const fs = require('fs');

const sizeOf = require('image-size');

const mediafiletypes = ['jpg', 'png'];

// For getting arg from command line:
// if (process.argv.length <= 2) {
//   console.log("Usage: " + __filename + " path/to/directory");
//   process.exit(-1);
// }
// var path = process.argv[2];

// var path = `C:\\_GIT\\microservice-skeleton\\src\\frontend\\test_data`;
// var path = `..\\..\\test_data`;
var path = './media-server/media';

var walk = function (rootdir, dir) {
  var results = [];
  if (dir.indexOf("$Recycle.Bin") === -1) {
    var fulldir = rootdir + '/' + dir;
    var list = fs.readdirSync(fulldir);
    list.forEach(function (file) {
      let fullfilepath = fulldir + '/' + file;
      let relfilepath = dir + '/' + file;
      var stat = fs.statSync(fullfilepath);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results = results.concat(walk(rootdir, relfilepath));
      } else if (file.endsWith('.jpg')) {
        let relfilepathnoslash = relfilepath.substring(1, relfilepath.length);
        /* Is a file */
        stat.fulldir = fulldir;
        stat.file = file;
        stat.dir = dir;
        stat.fullfilepath = fullfilepath;
        stat.relfilepath = relfilepathnoslash;
        results.push(stat);
      }
    });
  }
  return results;
}

function sizeofmany(filestats, oncomplete) {
  let results = [];
  let numremaining = filestats.length;

  for (let ix = 0; ix < filestats.length; ix++) {
    const fullfilepath = filestats[ix].fullfilepath;
    const relfilepath = filestats[ix].relfilepath;

    console.log(`getting sizeof '${fullfilepath}'`);
    sizeOf(fullfilepath, function (err, dimensions) {
      results[ix] = { url: relfilepath, width: dimensions.width, height: dimensions.height };
      numremaining--;
      if (numremaining === 0) {
        oncomplete(results);
      }
    });
  }
}

// sizeOf('20190203_105152.tn.jpg', function (err, dimensions) {
//   let results = walk(path, "");
//   let mediaSource = {width:dimensions.width, height:dimensions.height, results:results};
//   fs.writeFile('mediaSource.json', JSON.stringify(mediaSource, null, 2), (err) => {
//     if (err) throw err; 
//     console.log('JSON saved!');
//   });
// });

let filestats = walk(path, "");
sizeofmany(filestats, function (results) {
  let sourceMedia = {sourceTextureJsons:results};
  fs.writeFile(`${path}/sourceMedia.json`, JSON.stringify(sourceMedia, null, 2), (err) => {
    if (err) throw err;
    console.log('JSON saved!');
  });
});