<template>
  <div class="home">
    <h1>Page d'accueil</h1>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {

    }
  },

}
</script>

<style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
</style>