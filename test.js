var test = require('tape');
var PassThrough = require('readable-stream/passthrough');
var piped = require('piped');
var Repiper = require('./');

test('pipes source to inbound streams', function (t) {
  t.plan(1);

  var source = new PassThrough;
  var inbound = [new PassThrough];

  inbound[0].on('pipe', function (src) {
    t.equal(src, source);
  });

  var repiper = new Repiper(inbound, null);
  source.pipe(repiper)
});

test('pipes to outbound streams to destination', function (t) {
  t.plan(1);

  var outbound = [piped(new PassThrough)];
  var destination = new PassThrough;

  outbound[0].on('piped', function (dest) {
    t.equal(dest, destination);
  });

  var repiper = new Repiper(null, outbound);
  repiper.pipe(destination);
});