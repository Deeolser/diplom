<template>
<my-canva>
  <div class="flex flex-col">
    <my-header>Проверь свои знания</my-header>
  </div>
</my-canva>
  <my-canva>
    <div class="" v-for="phrase in phrases">
    <div class="font-bold text-head_over_heels text-l">  {{phrase.en.value}} </div>
  </div>
  </my-canva>

</template>

<script>

import { defineComponent } from "vue";
import TrainerList from "../components/TrainerList.vue";
import MyCanva from "../components/UI/MyCanva.vue";

export default defineComponent({
  components: { MyCanva, TrainerList },
  data() {
    return {
      phrases:[
        {
          en: {
            id: "5fe9971f-5e0b-4191-a68a-7cd42b9be222",
            value: "hello"
          }
        },{
          en: {
            id: "d636767e-89fe-4c8a-8f85-019107488e1a",
            value: "Olga"
          }
        }
      ]
      // isPhrasesLoading: false,
      // url: 'http://localhost:8081/v1/phrases',
    };
  },
});
</script>

<style scoped></style>
