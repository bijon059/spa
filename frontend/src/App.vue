<template>
  <div v-if="!this.indexStore.isLoggedIn">
    <router-view/>
  </div>
  <div v-else>
    <NavBar />
    <router-view/>
  </div>
</template>
<script>
import {useIndexStore} from "./stores/index";
import {mapStores} from 'pinia'
import NavBar from "@/components/NavBar.vue";

export default {
  components: {NavBar},
  mounted() {
    this.getCsrf();
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  methods: {
    async getCsrf() {
      let res = await this.indexStore.loadCsrf()
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
