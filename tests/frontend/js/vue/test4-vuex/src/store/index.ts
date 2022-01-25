import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface State {
  value: number;
};
const state: State = { value: 100 };

interface Mutations {
  [K: string]: (arg: State) => void;
};
const mutations: Mutations = {
  // increment(state, payload) {}
  // must be sync
  increment(state) {
    state.value++;
  },
  decrement(state) {
    state.value--;
  }
};

interface Actions {
  [K: string]: (ctx: any) => void;
};
const actions: Actions = {
  // can be async
  // you can fetch stuff then commit
  increment(ctx) {
    ctx.commit('increment');
    // ctx.state
    // ctx.getters
    // ctx.dispatch
  }
};

export default new Vuex.Store<State>({
  state,
  mutations,
  actions,
  //modules: {},
  // getters: {}
});





// you can combine different modules
const users = {
  state: () => ({ name: 'user1' }),
  mutations: {},
  actions: {},
  getters: {}
};

const groups = {
  state: () => ({ name: 'admin' }),
  mutations: {},
  actions: {},
  getters: {}  
};

const myStore = new Vuex.Store({
  modules: {
    users,
    groups
  }
});

//myStore.state.users
//myStore.state.groups
//mutations with same name will be run in all stores
//you can use `namespace: true` to avoid
//commit('users/mutation')
