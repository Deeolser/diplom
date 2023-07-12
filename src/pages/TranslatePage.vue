<template>
  <div class='flex flex-col'>
  <my-spinner v-if='getPairs.loadPairs'/>
    <oi-vse v-if='getPairs.showOiVSE'></oi-vse>
  <my-container>
    <my-header>Все переводы</my-header>
    <div class='flex flex-row gap-2 px-1 font-bold text-head_over_heels text-base'><p>Выводить по: </p>
      <select
        class='py-1 px-2 w-20 text-sm text-head_over_heels bg-transparent border-0 border-b-2
        border-grape_mist appearance-none focus:outline-none focus:ring-0 focus:border-grape_mist peer'
        v-model.number='pageSize'
        @change='getPairs.getPairsFromAPI(pageSize,0)'>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>

  </my-container>
  <my-container v-if='getPairs.pairs.length > 0 && !getPairs.loadPairs'>
    <div
      v-for='(pair, index) in getPairs.pairs' :key='index'>
      <div class='flex flex-row gap-2 font-sans text-head_over_heels text-base px-4 border-b-2'>
        <p>{{ pair.en.value }} </p>
        <p> - </p>
        <p> {{ pair.ru.value }}</p>
      </div>
    </div>
  </my-container>
  <pagination-panel
    v-if='!getPairs.loadPairs'
    :page-size='pageSize'/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGetPairsStore } from '../store/GetPairsStore.js';
import PaginationPanel from '../components/PaginationPanel.vue';
import OiVse from '../components/OiVse.vue';

const pageSize = ref(20);
const getPairs = useGetPairsStore();

</script>

<script>
import { useGetPairsStore } from '../store/GetPairsStore.js';

export default {
  name: 'TranslatePage',
  mounted() {
    const preload = useGetPairsStore();
    preload.getPairsFromAPI(20, 0);
  },
};

</script>

<style scoped>

</style>