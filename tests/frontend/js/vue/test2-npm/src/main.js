import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/* const app = new Vue({ */
/*   el: '#app', */
/*   data: { */
/*     message: 'Hello Vue!' */
/*   } */
/* }); */

new Vue({
  render: h => h(App),
  //el: '#app',
  data: {
    message: 'My message'
  }
}).$mount('#app')
