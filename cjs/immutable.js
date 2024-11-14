'use strict';
const { adjectives, colors, nouns, random } = require('./data.js');

module.exports = (render, bound = '') => {
  let selected = 0;
  let data = [];
  let id = 1;

  // immutable data by default
  const utils = {
    get data() { return data },
    get selected() { return selected },
    add() {
      data = [...data, ...buildData(1_000)];
      render(utils);
    },
    clear() {
      data = [];
      render(utils);
    },
    partialUpdate() {
      for (let i = 0; i < data.length; i += 10) data[i].label += " !!!";
      render(utils);
    },
    remove({ id }, update = true) {
      data = data.slice(0);
      data.splice(data.findIndex(row => row.id === id), 1);
      if (update) render(utils);
    },
    run() {
      data = buildData(1_000);
      render(utils);
    },
    runLots() {
      data = buildData(10_000);
      render(utils);
    },
    select({ id }, update = true) {
      selected = id;
      if (update) render(utils);
    },
    swapRows() {
      if (data.length > 998) {
        const clone = data.slice(0);
        const tmp = clone[1];
        clone[1] = clone[998];
        clone[998] = tmp;
        data = clone;
        render(utils);
      }
    },
  };

  // same class used in Svelte and/or others
  class Row {
    constructor() {
      this.id = id++;
      this.label = `${
        adjectives[random(adjectives.length)]
      } ${
        colors[random(colors.length)]
      } ${
        nouns[random(nouns.length)]
      }`;
    }
  }

  // signal-like class to remove a row
  class RowDrop extends Row {
    remove = () => utils.remove(this);
  }

  // signal-like class to select a row
  class RowSelect extends Row {
    select = () => utils.select(this);
  }

  // signal-like class to select or remove a row
  class RowAll extends Row {
    select = () => utils.select(this);
    remove = () => utils.remove(this);
  }

  // let's decide which class is desired:
  let Item = Row;
  switch (bound) {
    case 'remove':
      Item = RowDrop;
      break;
    case 'select':
      Item = RowSelect;
      break;
    case 'all':
      Item = RowAll;
      break;
  }

  const buildData = count => {
    const data = new Array(count);
    for (let i = 0; i < count; i++) data[i] = new Item;
    return data;
  };

  render(utils);
};
