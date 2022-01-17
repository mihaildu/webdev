// defining a component
// you can also use pascal case
// this is a global component
Vue.component('my-component', {
  // props here are camelCase, kebab-case in html/template
  props: ['p1', 'p2'],
  template: `
    <div>
      Hello from My Component! Prop1 is {{ p1 }} Prop 2 is {{ p2.text }}
      <div>Kids are <slot></slot></div>
    </div>`
});

Vue.component('lol-name1', {
  // prop type validation
  props: { p1: Number, p2: { type: String, required: true } },
  // this is so attributes are not passed down
  // attributes in <lol-name1 attr1 ...> will be passed down to <div> from template
  // attributes can also be accessed from $attrs
  inheritAttrs: false
});

Vue.component('compi', {
  // here data is a function
  data: function () {
    // here you can get values from props
    // this.prop1
    // you can also use props in computed
    return {
      count: 0
    }
  },
  props: ['message'],
  template: `
    <div>
      Sup, count is {{ count }}
      <button @click='handleClick'>Click</button>
      <div>Message is {{ message }}</div>
    </div>`,
  methods: {
    handleClick: function(event) {
      // I want to change data in parent.data
      // props are read only, even if I bind them it won't work!
      //this._props.message = 'LOL';

      // I can emit a message
      // you can also add values $emit('event', value);
      this.$emit('change-message');
    }
  }
});

const localComp1 = {
  template: ``,
  methods: {},
  data: function () { return {}; }
};

// use this component in another component
const localComp2 = {
  components: { 'my-comp': localComp1 }
};

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    title: 'Span Title',
    seen: false,
    arr: [1, 2, 3],
    dataProp: { text: "Prop 2 binded" },
    extraMessage: '',
    isActive: true
  },
  methods: {
    // no arrow functions here
    handleClick: function (event) {
      console.log('handle click was called');
      // access to data here
      //console.log(this.message);
    },
    changeMessage: function (event) {
      //console.log('change message was called');
      this.message = this.message + ' x';
    }
  },
  // lifecycle hooks
  // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  created: function () { // after it was created
    console.log('vue instance was created');
    // can access data with this
    console.log(this.message);
  },
  beforeCreate: function () {}, // they all have before
  mounted: function() {
    // after mount, I assume this is where we fetch
    // const app = this;
    // fetch(url).then((data) => { app.variable = ... })
  }, 
  updated: function() {}, // after update
  destroyed: function() {}, // after detroyed
  computed: {
    // computed properties
    reversedMessage: function () {
      // this only runs once
      // it's cached based on their reactive deps (this.message)
      return this.message.split('').reverse().join('');
    },
    sweetMessage: {
      // getter
      get: function () {
        return this.message + ' xoxo';
      },
      // setter
      set: function (newValue) {
        // from this value the reactive deps should be updated
        // remove the xoxo
        const words = newValue.split(' ');
        this.message = words.slice(0, words.length - 1).join(' ');
      },
    }
  },
  watch: {
    // watch variables for changes
    message: function(val) {
      // better to define this as a computed prop
      // not a big diff, just cleaner code
      this.extraMessage = this.message + 'xx';
    }
  }
})

function inspectApp () {
  // we can access stuff from app
  console.log(app.$data);
  console.log(app.$el === document.getElementById('app'));

  // watching variable changes
  app.$watch('a', function (newval, oldval) { /* do something */ });
}

