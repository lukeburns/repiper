repiper
=====

repiper is a stream that repipes its sources and destinations.

```
src.pipe(repiper(writables, [readables])).pipe(dest)
```

pipes `src` to each writable in `writables` and pipes each readable in `readables` to `dest`. If `readables` is undefined, then the `readables` are treated as `writables`.

Installation
============

```
npm install repiper
```

Examples
========

#### Fork


```
source.pipe(repiper([a, b]))
```

becomes

```
source.pipe(a)
source.pipe(b)
```

#### Merge

```
repiper([a,b]).pipe(dest);
```

becomes

```
a.pipe(dest)
b.pipe(dest)
```

#### Fork and Merge

```
src.pipe(repiper([a,b])).pipe(dest);
```

becomes

```
src.pipe(a).pipe(dest)
src.pipe(b).pipe(dest)
```

#### Pipelines

```
inbound.pipe(middleware).pipe(outbound);
source.pipe(repiper(inbound, outbound)).pipe(destination);
```

becomes

```
source.pipe(inbound).pipe(middleware).pipe(outbound).pipe(destination);
```
