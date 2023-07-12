<template>
  <div class="container mx-auto px-2 mx-auto bg-errigal_white">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar },
};
</script>

<style scoped></style>