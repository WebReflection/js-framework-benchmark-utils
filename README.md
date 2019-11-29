# js-framework-benchmark-utils

[![Build Status](https://travis-ci.com/WebReflection/js-framework-benchmark-utils.svg?branch=master)](https://travis-ci.com/WebReflection/js-framework-benchmark-utils) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/js-framework-benchmark-utils/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/js-framework-benchmark-utils?branch=master)

An utility to centralize and rule common js-framework-benchmark test cases.

```js
import {State, buildData} from 'js-framework-benchmark-utils';
// or const {State, buildData} = require('js-framework-benchmark-utils');

buildData(1000);  // creates an Array with 1000 items
buildData(10000); // creates an Array with 10000 items

const state = State(
  // function that will receive the state reference per each update
  function update(state = {
    // database
    data,     // the Array containing all items
    selected, // the currently selected item.id or -1

    // methods (self bound)
    add,      // add 1000 rows/items to the data
    clear,    // remove all rows/items from the data
    remove,   // remove(item.id) to remove only a specific row/item
    run,      // create 1000 rows/items
    runLots,  // create 10000 rows/items
    select,   // select(item.id) to select a specific row/item
    swapRows, // to swap the second row/item with the one before the last one
    update    // to update every 10th row/item label
  },
  immutable   // if `true`, will always create a new Array per each change,
              // and items will also be replaced when the label is modified
) {
  // this function will be invoked whenever an action/update happens
  // use the body of this function to render the benchmark table
  // or do anything else
});

// the state has all its utilities in here too
state.run();
state.select(123);
state.remove(1);
```

The `state` reference can be used to add actions within the `update` function, or outside it, keeping the update related to rows/items changes only.
