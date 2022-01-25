<template>
  <div id="app">
    Hi from App! {{ message }} {{ hello }}
    <div>
      <button @click="handleClick">Click</button>
      <input v-model="name" />
      <div>
        First name: {{ firstName }}
      </div>
      <div>
        Last name: {{ lastName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // this is not reactive
  // doesn't get updated in template when updated in function
  // apparently they are reactive?
  message = 'test';
  firstName = 'John';
  lastName = 'Jim';

  // this is reactive
  data() {
    return {
      hello: 'hello string'
    }
  }

  // you can define methods as class components
  handleClick() {
    console.log('clicked!');
  }

  // computed props with set/get
  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  set name(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }

  // lifecycle hooks
  mounted() {
    console.log('component was mounted');
  }

  render() {
    console.log('render was called');
    // this replaces <template>??
    //return <div>Lol</div>;
  }
}

// you can create custom decorators with createDecorator
// you can use mixins(Class1, Class2) to combine classes to be extended
</script>
