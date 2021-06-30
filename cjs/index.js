'use strict';
let _id = 1;

const _random = max => Math.round(Math.random() * 1000) % max;

// creates a new Array of items filled up to the specified length
const buildData = (length, cache, data) => {
  const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
  const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
  const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
  for (let i = 0; i < length; i++) {
    data.push({
      id: _id,
      html: cache(data, _id++),
      label: adjectives[_random(adjectives.length)] + " " +
             colours[_random(colours.length)] + " " +
             nouns[_random(nouns.length)]
    });
  }
};
exports.buildData = buildData;

const _new = (item, i, data) => {
  data[i] = {...item, label: item.label + ' !!!'};
};

const _update = item => {
  item.label += ' !!!';
};

// This utility creates a new, fully self-bound, state that will invoke
// the optional callback(state) whenever an action is performed.
// Shallow copies, as in {...state} would retain `data` and `selected`
// from the older state.
// If you need a shallow copy of a state, use the strategy
// suggested in `neverland` benchmark, which is:
// `let state = State($ => {state = $});`
// and refer to that `state` instead of the one passed along
// the reducer, or whatever mechanism you use for states.
const State = (callback, immutable = false, cache = () => {}) => {

  // private utilities
  const update = callback || (() => {});
  const updateItem = immutable ? _new : _update;
  let danger = null;

  // the returned self bound state
  const state = {

    // state data and selected info
    data: [],
    selected: -1,

    // benchmark related methods for benchmark actions
    add() {
      if (immutable)
        state.data = state.data.slice(0);
      buildData(1000, cache, state.data);
      update(state);
    },
    clear() {
      state.data = [];
      update(state);
    },
    run() {
      buildData(1000, cache, state.data = []);
      update(state);
    },
    runLots() {
      buildData(10000, cache, state.data = []);
      update(state);
    },
    swapRows() {
      if (immutable)
        state.data = state.data.slice(0);
      const {data} = state;
      if (data.length > 998) {
        const tmp = data[1];
        data[1] = data[998];
        data[998] = tmp;
      }
      update(state);
    },
    update() {
      if (immutable)
        state.data = state.data.slice(0);
      const {data} = state;
      for (let i = 0, {length} = data; i < length; i += 10)
        updateItem(data[i], i, data);
      update(state);
    },

    // single item related methods for links actions
    remove(id) {
      if (immutable)
        state.data = state.data.slice(0);
      const {data} = state;
      data.splice(data.findIndex(d => d.id === id), 1);
      update(state);
    },
    select(id) {
      state.selected = id;
      update(state);
    },

    // non delegated handlers
    /* istanbul ignore next */
    removeRow({currentTarget}) {
      const id = +currentTarget.closest('tr').id;
      const {data} = state;
      if (immutable)
        state.data = data.slice(0);
      data.splice(data.findIndex(d => d.id === id), 1);
      update(state);
    },
    /* istanbul ignore next */
    selectRow({currentTarget}) {
      if (danger)
        danger.remove('danger');
      danger = currentTarget.closest('tr').classList;
      danger.add('danger');
      state.selected = +danger.id;
    }
  };
  return state;
};
exports.State = State;
