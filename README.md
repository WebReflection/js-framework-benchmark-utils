# js-framework-benchmark-utils
An utility to centralize and rule common js-framework-benchmark test cases.

```js
import Scope from 'js-framework-benchmark-utils';
// or const Scope = require('js-framework-benchmark-utils');

const scope = Scope(function update({

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
}) {
  // this function will be invoked whenever an action/update happens
  // use the body of this function to render the benchmark table
});
```

The `scope` reference can be used to add actions within the `update` function, or outside it, keeping the update related to rows/items changes only.
