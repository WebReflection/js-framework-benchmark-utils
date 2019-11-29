let _id = 1;
const _build = (count) => {
    const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: _id++,
            label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]
        });
    }
    return data;
};

const _new = (item, i, data) => {
  data[i] = {...item, label: item.label + ' !!!'};
};

const _random = max => Math.round(Math.random() * 1000) % max;

const _update = item => {
  item.label += ' !!!';
};

export default (update, immutable = false) => {
  const scope = {
    add() {
      if (immutable)
        scope.data = scope.data.slice(0);
      scope.data.push(..._build(1000));
      update(scope);
    },
    clear() {
      scope.data = [];
      update(scope);
    },
    remove(id) {
      if (immutable)
        scope.data = scope.data.slice(0);
      const {data} = scope;
      data.splice(data.findIndex(d => d.id === id), 1);
      update(scope);
    },
    run() {
      scope.data = _build(1000);
      update(scope);
    },
    runLots() {
      scope.data = _build(10000);
      update(scope);
    },
    select(id) {
      scope.selected = id;
      update(scope);
    },
    swapRows() {
      if (immutable)
        scope.data = scope.data.slice(0);
      const {data} = scope;
      if (data.length > 998) {
        const tmp = data[1];
        data[1] = data[998];
        data[998] = tmp;
      }
      update(scope);
    },
    update() {
      if (immutable)
        scope.data = scope.data.slice(0);
      const {data} = scope;
      const {length} = data;
      for (let cb = immutable ? _new : _update, i = 0; i < length; i += 10)
        cb(data[i], i, data);
      update(scope);
    },
    selected: -1,
    data: []
  };
  return scope;
};
