let _id = 1;

const _random = max => Math.round(Math.random() * 1000) % max;

// creates a new Array of items filled up to the specified length
export const buildData = length => {
  const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
  const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
  const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
  const data = new Array(length);
  for (let i = 0; i < length; i++) {
    data[i] = {
      id: _id++,
      label: adjectives[_random(adjectives.length)] + " " +
             colours[_random(colours.length)] + " " +
             nouns[_random(nouns.length)]
    };
  }
  return data;
};



const _new = (item, i, data) => {
  data[i] = {...item, label: item.label + ' !!!'};
};

const _update = item => {
  item.label += ' !!!';
};

// This utility creates a new, fully self-bound, state that will invoke
// the optional callback(state) whenever an action is performed.
// Shallow copies, as in {...state} would retain `data` and `selected`
// from the older state, as getters get lost in the process.
// If you need a shallow copy of a state, use the strategy
// suggested in `neverland` benchmark, which is:
// `let state = State($ => {state = $});`
// and refer to that `state` instead of the one passed along
// the reducer, or whatever mechanism you use for states.
export const State = (callback, immutable = false) => {

  // private readonly references
  let data = [];
  let selected = -1;

  // private utilities
  const update = callback || (() => {});
  const updateItem = immutable ? _new : _update;

  // the returned self bound state
  const state = {

    // state data and selected info
    get data() { return data; },
    get selected() { return selected; },

    // benchmark related methods for benchmark actions
    add() {
      if (immutable)
        data = data.slice(0);
      data.push(...buildData(1000));
      update(state);
    },
    clear() {
      data = [];
      update(state);
    },
    run() {
      data = buildData(1000);
      update(state);
    },
    runLots() {
      data = buildData(10000);
      update(state);
    },
    swapRows() {
      if (immutable)
        data = data.slice(0);
      if (data.length > 998) {
        const tmp = data[1];
        data[1] = data[998];
        data[998] = tmp;
      }
      update(state);
    },
    update() {
      if (immutable)
        data = data.slice(0);
      for (let i = 0, {length} = data; i < length; i += 10)
        updateItem(data[i], i, data);
      update(state);
    },

    // single item related methods for links actions
    remove(id) {
      if (immutable)
        data = data.slice(0);
      data.splice(data.findIndex(d => d.id === id), 1);
      update(state);
    },
    select(id) {
      selected = id;
      update(state);
    }
  };
  return state;
};
