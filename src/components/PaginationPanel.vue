<template>
  <div class='flex flex-row justify-center'>
    <div class='flex flex-row'>
      <my-button @click='getPairs.getPairsFromAPI(pageSize, 0)'>В начало</my-button>
      <my-button v-if='getPairs.currentPage>0'
                 @click='getPairs.getPairsFromAPI(pageSize, getPairs.currentPage-1)'>
        {{ getPairs.currentPage }}
      </my-button>
      <my-button class='border-2 bg-dark_errigal_white border-dusky_grape'>{{ getPairs.currentPage + 1 }}</my-button>
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
const getPairs = useGetPairsStore();
</script>
<script>
export default {
  name: 'PaginationPanel',
};
</script>
