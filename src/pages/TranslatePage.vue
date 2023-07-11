<template>
  <my-spiner v-if='getPairs.showSpiner'></my-spiner>
  <my-canva>
    <my-header>Добавленные переводы</my-header>
    <select
      class='mb-2'
      v-model.number='pageSize'
      @change='getPairs.getPairsFromAPI(pageSize,0)'>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>
  </my-canva>
  <my-canva class='overflow-overflow-clip'
            v-if='getPairs.pairs.length>0'>
      <div
        v-for='(pair, index) in getPairs.pairs' :key='index'>
        <p>{{ pair.en.value }} - {{ pair.ru.value }}</p>
      </div>
  </my-canva>
  <div class='flex flex-row justify-center'>
    <div class='flex flex-row'>
      <my-button @click='getPairs.getPairsFromAPI(pageSize, 0)'>В начало</my-button>
      <my-button v-if='getPairs.currentPage>0'
                 @click='getPairs.getPairsFromAPI(pageSize, getPairs.currentPage-1)'>
        {{ getPairs.currentPage }}
      </my-button>
      <my-button class='border-2 bg-grape_mist border-dusky_grape'>{{ getPairs.currentPage + 1 }}</my-button>
      <my-button @click='getPairs.getPairsFromAPI(pageSize, getPairs.currentPage+1)'
                 v-if='getPairs.currentPage<getPairs.totalPages-1'>
        {{ getPairs.currentPage + 2 }}
      </my-button>
      <my-button @click='getPairs.getPairsFromAPI(pageSize, getPairs.totalPages-1)'>В конец</my-button>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue';
import { useGetPairsStore } from '../store/GetPairsStore.js';

const pageSize = ref(20);
const pageNum = ref('');
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
  data() {
    return {
      qtyOptions: [
        { value: 20, name: 20 },
        { value: 20, name: 50 },
        { value: 20, name: 10 },
      ],
    };
  },
};

</script>

<style scoped>

</style>