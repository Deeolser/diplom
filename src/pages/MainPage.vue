<template>
<my-canva>
  <div class="flex flex-col">
    <my-header>Проверь свои знания</my-header>
  </div>
</my-canva>
    <my-canva>
      <trainer-list
        v-if="showOiVSE===false"
        :phrases="phrases"
        @createAnswer="addAnswer"
        @pushBtn="send"
      ></trainer-list>
      <div v-else>
          <my-header class="text-5xl text-center">Ой, ВСЕ!</my-header>
        <my-header class="text-xl text-center">Не работает твой сервер!</my-header>
      </div>
  </my-canva>


</template>

<script>

import { defineComponent } from "vue";

import TrainerList from "../components/TrainerList.vue";



export default defineComponent({
  components: { TrainerList },

  mounted() {
    this.fetchPhrases()
  },
  data() {
    return {
      phrases:[],
      answers: [],
      isPhrasesLoading: false,
      showOiVSE: false
    };
  },

  methods: {
    send () {
      console.log('Отправляю это на проверку: ', this.answers);
      this.postAnswers()
    },
    addAnswer (newAnswer) {
       this.answers.push(newAnswer)
      console.log('Массив с ответами', this.answers);
    },
    async fetchPhrases () {
      try {
        this.isPhrasesLoading = true;
        const query = 'http://localhost:8081/v1/phrases';
        const response = await fetch(query).then((response) => response.json());
        console.log('Пришло с сервера: ', response);
        this.phrases = response;
      } catch (e) {
        this.showOiVSE = true
        console.log(e);
      }
    },
    async postAnswers () {
      // const url = 'https://example.com/profile';
      // const data = { username: 'example' };

      try {
        const response = await fetch('http://localhost:8081/v1/check', {
          method: 'POST',
          body: JSON.stringify(this.answers), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
    }
    });
</script>

<style scoped></style>
