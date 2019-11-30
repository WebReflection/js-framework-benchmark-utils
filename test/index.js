const {State} = require('../cjs');

test(State(Object, true));
test(State(Object));
test(State());

function test(state) {
  console.assert(state.data.length === 0);
  state.run();
  console.assert(state.data.length === 1000);
  const {id} = state.data[1];
  state.swapRows();
  console.assert(state.data[1].id === (id + 997));
  console.assert(state.data[998].id === id);
  state.update();
  console.assert(/ !!!$/.test(state.data[0].label));
  console.assert(/ !!!$/.test(state.data[10].label));
  console.assert(/ !!!$/.test(state.data[20].label));
  state.add();
  console.assert(state.data.length === 2000);
  state.runLots();
  console.assert(state.data.length === 10000);
  state.select(1);
  console.assert(state.selected === 1);
  const item = state.data.find(item => item.id === id + 2003);
  console.assert(item != null);
  state.remove(id + 2003);
  console.assert(!state.data.includes(item));
  state.clear();
  console.assert(state.data.length === 0);
  state.swapRows();
}
