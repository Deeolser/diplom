<template>
  <my-canva>
    <my-header>Добавленные переводы</my-header>
  </my-canva>
<translates-list :pairs="pairs">

</translates-list>
</template>

<script>

import TranslatesList from '../components/TranslatesList.vue';

export default {
  name: 'TranslatePage',
  components: { TranslatesList },
  data() {
    return {
      pairs: [],
    };
  },
  mounted() {
    this.fetchPairs();
  },
  methods:{
    async fetchPairs() {
      try {
        const query = "http://45.95.235.82:3000/v1/admin/phrases" ;
        const response = await fetch(query).then((response) => response.json());
        this.pairs = response;
        console.log(response);
        // const response = await fetch(query);
        // this.totalPages = Math.ceil(response.headers.get('X-Total-Count') / this.limit);
      } catch (e) {
        // alert('Error');
      }
      // finally {
      //   this.isCouplesLoading = false;
      // }
    },
  }

};
</script>

<style scoped>

</style>