Repiper
=====

Repiper is a noop duplex stream that repipes its source stream to writable streams and readable streams to its destination stream.

Usage
=====

Require repiper.

```
var Repiper = require('repiper');
```

Create an instance.

```
new Repiper(writable, readable)
```

  - writable `Stream | Array of Streams`  Streams to pipe to (from source stream)
  - readable `Stream | Array of Streams`  Streams to pipe from (to destination stream)

Examples
========

#### Forks

```
a.pipe(b);
c.pipe(d);
```
```
var repiper = new Repiper([a, c]);
source.pipe(repiper);
```
becomes

```
source.pipe(a).pipe(b)
source.pipe(c).pipe(d)
```

#### Pipelines

```
inbound.pipe(middleware).pipe(outbound);
```
```
var repiper = new Repiper(inbound, outbound);
source.pipe(repiper).pipe(destination);
```

becomes

```
source.pipe(inbound).pipe(middleware).pipe(outbound).pipe(destination);
```

Installation
============

```
npm install repiper
```