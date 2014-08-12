var util = require('util');
var Duplex = require('readable-stream/duplex');
var piped = require('piped');

module.exports = Repiper;

function Repiper (inbound, outbound, options) {
  if (!(inbound instanceof Array)) {
    inbound = (inbound && inbound.pipe) ? [inbound] : [];
  }
  if (!(outbound instanceof Array)) {
    outbound = (outbound && outbound.pipe) ? [outbound] : [];
  }

  Duplex.call(this, options);
  piped(this);

  this.on('pipe', function (src) {
    src.unpipe(this);
    inbound.forEach(function (dest) {
      src.pipe(dest);
    });
  });

  this.on('piped', function (dest) {
    if (!(dest instanceof Repiper)) {
      this.unpipe(dest);
      outbound.forEach(function (src) {
        src.pipe(dest);
      });
    }
  });
}

util.inherits(Repiper, Duplex);
Repiper.prototype._read = Repiper.prototype._write = function () {};