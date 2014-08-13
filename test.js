var test = require('tape');
var PassThrough = require('readable-stream/passthrough');
var piped = require('piped');
var repiper = require('./');

test('pipes source to writable streams', function (t) {
  t.plan(2);

  var source = new PassThrough;
  var writables = [new PassThrough, new PassThrough];

  writables.forEach(function (writable) {
    writable.on('pipe', function (src) {
      t.equal(src, source);
    });
  })

  var r = repiper(writables, null);
  source.pipe(r)
});

test('pipes to readable streams to destination', function (t) {
  t.plan(2);

  var readables = [piped(new PassThrough), piped(new PassThrough)];
  var destination = new PassThrough;

  readables.forEach(function (readable) {
    readable.on('piped', function (dest) {
      t.equal(dest, destination);
    });
  })

  var r = repiper(null, readables);
  r.pipe(destination);
});