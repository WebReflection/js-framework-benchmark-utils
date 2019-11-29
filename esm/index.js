let did = 1;
const buildData = (count) => {
    const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            id: did++,
            label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]
        });
    }
    return data;
};

const _random = max => Math.round(Math.random() * 1000) % max;

export default update => {
  const scope = {
    add() {
      scope.data.push(...buildData(1000));
      update(scope);
    },
    clear() {
      scope.data = [];
      update(scope);
    },
    remove(id) {
      const {data} = scope;
      const idx = data.findIndex(d => d.id === id);
      data.splice(idx, 1);
      update(scope);
    },
    run() {
      scope.data = buildData(1000);
      update(scope);
    },
    runLots() {
      scope.data = buildData(10000);
      update(scope);
    },
    select(id) {
      scope.selected = id;
      update(scope);
    },
    swapRows() {
      const {data} = scope;
      if (data.length > 998) {
        const tmp = data[1];
        data[1] = data[998];
        data[998] = tmp;
      }
      update(scope);
    },
    update() {
      const {data} = scope;
      for (let i = 0, {length} = data; i < length; i += 10)
        data[i].label += ' !!!';
      update(scope);
    },
    selected: -1,
    data: [],
  };
  return scope;
};
