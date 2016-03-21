var PassThrough = require('readable-stream/passthrough');
var piped = require('piped');

module.exports = function (writables, readables) {
  if (!(writables instanceof Array)) {
    writables = (writables && writables.pipe) ? [writables] : [];
  }
  if (!(readables instanceof Array)) {
    if (readables === undefined) readables = writables;
    else readables = (readables && readables.pipe) ? [readables] : [];
  }

  var piper = new PassThrough();
  piper.repiper = true;

  piper.on('pipe', function (src) {
    src.unpipe(piper);
    writables.forEach(function (dest) {
      src.pipe(dest);
    });
  });

  piper.on('piped', function (dest) {
    if (!(dest.repiper)) {
      piper.unpipe(dest);
      readables.forEach(function (src) {
        src.pipe(dest);
      });
    }
  });

  return piped(piper);
}