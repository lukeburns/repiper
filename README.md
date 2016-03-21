repiper
=====

repiper is a stream that repipes its sources and destinations.

```
src.pipe(repiper([writables], [readables])).pipe(dest)
```

pipes `src` to each writable in `writables` and pipes each readable in `readables` to dest.

Installation
============

```
npm install repiper
```

Examples
========

#### Forks


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
repiper([], [a,b]).pipe(dest);
```

becomes

```
a.pipe(dest)
b.pipe(dest)
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