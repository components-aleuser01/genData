# genData
A normalization pattern to build, query, and manipulate everything.

(6/25/11)
version 0.3
by Bemi Faison


## DESCRIPTION


genData is a recursive, depth-first iterator and generic parser, that normalizes objects into _datasets_ (an array of sequenced _data_ objects). genData can be customized to exclude object-properties, and modify the prototype and structure of the data it generates. Customizations may be captured as _generators_ (curried functions), which are equally customizable.


## FILES


* gendata-min.js - genData source file (minified with [UglifyJS](http://marijnhaverbeke.nl/uglifyjs) )
* src/ - Directory containing the source code
* LICENSE - The legal terms and conditions under which this software may be used
* README.md - This readme file


## USAGE


Include `gendata-min.js` in your application.


**Caution** genData _does_ scan objects recursively! You can define a parser function to avoid infinite loops, but genData offers no built-in error handling.


### Basics


1) Convert stuff to a dataset.


```js

    var dataStuff = genData(stuff);

```

2) genData represents a given value as a sequence of normalized (i.e., identical) data objects, called a _dataset_.


```js

// `{foo: 'bar'}` becomes
[
  { // data object #1
   name: '',
   value: {foo: 'bar'},
   parent: undefined
  },
  { // data object #2
    name: 'foo',
    value: 'bar',
    parent: << data object 1 >>
  }
]

```


3) Use standard array functions like `.filter()` and `.map()`, to query and manipulate the returned dataset.

```js

    var functionsInStuff = dataStuff
      .filter(function (data) {
        return data.value === 'function'
      })
      .map(function (data) {
        return data.value;
      });

```


### Customizing genData


Modify the structure of data generated by stuff.


```js

    var metaStuff = genData(
      stuff,
      function (name, value, parent, index) {
        var data = this;
        data.uniqueId = (Math.random() * 1000).toString(20);
        data.shortName = name.substr(0,4);
      }
    );

```


Exclude parts of stuff from the dataset.


```js

    var someStuff = genData(
      stuff,
      function (name, value, parent, index) {
        return typeof value === 'string' // skip strings found in stuff
      }
    );

```


Receive a dataset full of objects you recognize and can manipulate.


```js

    var myObjs = genData(
      stuff,
      function (name, value, parent, index) {
        // access members of the prototype chain when modifying and filtering each data object
      },
      myConstructorWithMyMembers
    );

```


Pass multiple _parser_ functions, to piece together how stuff is modified and/or filtered.


```js

var multiParsedStuff = genData(
  stuff,
  [
    filterKeysWithUnderscores,
    denyKeysWithDollarSymbols,
    addUniqueIdProperty,
    addShortNameProperty
  ]
);

```


### Extending genData


Spawn _generators_ from genData to capture how you want to filter/modify stuff later.


```js

var genFilteredKeys = new genData(
  function (name, value, parent, index) {
    if (name.charAt(0) === '_') return 0; // falsy (except undefined) excludes this from the dataset but allows further parsing
  },
  function (name, value, parent, index) {
    if (name.indexOf('$') > -1) return false; // false to exclude this from the dataset and denies further parsing
  }
);

```


Extend spawned generators, to convert stuff into more complex data models (i.e., their prototype and structure).


```js

// cache the type of each data's value
var genTypeCaches = new genFilteredKeys(
  function (name, value, parent, index) {
    this.cachedType = typeof value; // capture the type of this data's value
  }
);
// init attributes property, and add name/value pair for children prefixed with an underscore
var genAttrData = new genFilteredKeys(
  function (name, value, parent, index) {
    this.attributes = {}; // add attributes property to data
    // if this data object has a parent and it's name begins with an underscore...
    if (parent && name.charAt(0) === '_') {
      parent.attributes[name.substr(1)] = value; // add to the parent's attribute property
    }
  }
);

```


Prototype members on generators (including genData), to manage various data models for different stuff.


```js

// add property to all data objects
genData.prototype.someMember = 'now available to all data objects';
// add method to data objects generated by this generator and any generators spawned from it
genAttrData.prototype.hasAttribute = function (key) {
  return this.attributes.hasOwnProperty(key);
};

```


---

Full documentation is under development.

## LICENSE

Flow is available under the terms of the [MIT-License](http://en.wikipedia.org/wiki/MIT_License#License_terms).

Copyright 2011, Bemi Faison