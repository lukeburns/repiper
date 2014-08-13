var util = require('util');
var Duplex = require('readable-stream/duplex');
var duplexer = require('duplexer2');
var piped = require('piped');

module.exports = repiper;

function repiper (writables, readables, duplex) {
  if (!(writables instanceof Array)) {
    writables = (writables && writables.pipe) ? [writables] : [];
  }
  if (!(readables instanceof Array)) {
    readables = (readables && readables.pipe) ? [readables] : [];
  }
  if (!duplex) {
    duplex = new Duplex;
    duplex._read = function () {}
    duplex._write = function () {}
  }
  duplex.repiper = true;

  duplex.on('pipe', function (src) {
    src.unpipe(duplex);
    writables.forEach(function (dest) {
      src.pipe(dest);
    });
  });

  duplex.on('piped', function (dest) {
    if (!(dest.repiper)) {
      duplex.unpipe(dest);
      readables.forEach(function (src) {
        src.pipe(dest);
      });
    }
  });

  return piped(duplex);
}