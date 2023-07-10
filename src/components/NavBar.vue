<template>
  <div class="flex h-[50px] flex-row items-center justify-between gap-2 bg-errigal_white">
    <div class="flex flex-row items-center px-2 gap-4 m-3 border-t-2 border-b-2 border-dusky_grape hover:cursor-pointer hover:border-head_over_heels"
         @click="$router.push('/')">
      <img class="" src="/public/RiGraduationCapFill.svg" alt="logo">
      <h1 class="font-bold text-head_over_heels uppercase">Dictionary</h1>
    </div>

    <div class="mr-3 flex flex-row items-center justify-start gap-2">
      <my-button @click="$router.push('/')"> Тренироваться </my-button>
      <my-button @click="$router.push('/adding')"> Добавить перевод </my-button>
      <my-button @click="$router.push('/phrases')"> Переводы </my-button>
    </div>
  </div>
  <div class="h-[4px] bg-head_over_heels shadow"></div>
</template>

<script>
import DictionaryForm from "./DictionaryForm.vue";

export default {
  name: 'NavBar',
  components: { DictionaryForm }
};
</script>

<style scoped></style>