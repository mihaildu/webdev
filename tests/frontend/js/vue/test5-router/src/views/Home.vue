<template>
  <div class="home">
    Hi from Home!
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    console.log('beforeRouteEnter in Home');
    //next({ name: 'About' });
    //next('/about');
    next();
  }
})
export default class Home extends Vue {

  beforeMount() {
    //console.log('hi');
    //this.$router.push('/about');
  }

  created() {
    //console.log('component created');
  }

  mounted() {
    //console.log(this.$router);
    //this.$router.push('/about');
    //console.log(this.$route.params);
  }
}
</script>
