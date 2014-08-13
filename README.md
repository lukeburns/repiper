repiper
=====

repiper is a duplex stream that handles repiping from its source stream and to its destination stream.

Usage
=====

Require repiper.

```
var repiper = require('repiper');
```

Create a repiper stream.

```
repiper(writables, readables, [duplex])
```

  - writables `Stream | Array of Streams` Streams to pipe to (from source stream)
  - readables `Stream | Array of Streams` Streams to pipe from (to destination stream)
  - duplex (optional) `Stream` Duplex stream that repiper will return. If none provided, a noop duplex is used.

Examples
========

#### Forks

```
a.pipe(b);
c.pipe(d);
```
```
var r = repiper([a, c]);
source.pipe(r);
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
var r = repiper(inbound, outbound);
source.pipe(r).pipe(destination);
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