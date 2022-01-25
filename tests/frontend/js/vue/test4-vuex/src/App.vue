<template>
  <div id="app">
    <div>Value: {{ value }}</div>
    <div><button @click="handleIncrement">Increment</button></div>
    <div><button @click="handleDecrement">Decrement</button></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions } from 'vuex';
import { State } from './store';

interface AppInterface {
  value: number,
  increment: () => void,
  decrement: () => void,
  incrementAction: () => void,
  handleIncrement: () => void,
  handleDecrement: () => void
};

// AppInterface
// you can also map getters here with mapGetters
@Component({
  computed: {
    ...mapState({
      value: (state: any): any => state.value
    })
  },
  methods: {
    ...mapMutations({
      increment: 'increment',
      decrement: 'decrement'
    }),
    ...mapActions({
      incrementAction: 'increment',
    })
  }
})
export default class App extends Vue {

  readonly value!: number;
  incrementAction!: () => void;
  increment!: () => void;
  decrement!: () => void;

  mounted() {
    //console.log(this.$store);
  }

  handleIncrement() {
    this.incrementAction();
    //this.increment();
    //this.$store.commit('increment');
  }

  handleDecrement() {
    this.decrement();
    //this.$store.commit('decrement');
  }
}
</script>
