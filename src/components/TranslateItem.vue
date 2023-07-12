<template>
  <p>{{ pair.en.value }} - {{ pair.ru.value }}</p>
</template>

<script setup>

import { useGetPairsStore } from '../store/GetPairsStore.js';

const getPairs = useGetPairsStore();
</script>
<script>
export default {
  name: 'TranslateItem',
};
</script>

<style scoped></style>