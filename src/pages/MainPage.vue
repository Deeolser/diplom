<template>
  <div v-if="isPhrasesLoading===true">
    <my-loading/>
  </div>
  <div v-else>
    <my-canva>
      <div class="flex flex-col">
        <my-header>Проверь свои знания</my-header>
      </div>
    </my-canva>
    <my-canva>
      <trainer-list
        v-if="showTrainerList===true"
        :phrases="phrases"
        @createAnswer="prepareAnswer"
        @pushBtn="send"
      ></trainer-list>
      <div v-if="showOiVSE===true">
        <my-header class="text-5xl text-center">Ой, ВСЕ!</my-header>
        <my-header class="text-xl text-center">Не работает твой сервер!</my-header>
      </div>
    </my-canva>
  </div>
  </template>

<script>

import { defineComponent } from "vue";

import TrainerList from "../components/TrainerList.vue";

export default defineComponent({
  components: { TrainerList },

  mounted() {
    this.fetchPhrases();
  },
  data() {
    return {
      phrases: [],
      answers: [],
      isPhrasesLoading: false,
      showOiVSE: false,
      showTrainerList: false,
    };
  },

  methods: {
    send() {
      console.log("Отправляю это на проверку: ", this.answers);
      this.postAnswers();
    },

    prepareAnswer(newAnswer, index) {
      this.answers.splice(index,1, newAnswer)
    },

    async fetchPhrases() {
      try {
        this.isPhrasesLoading = true;
        const query = "http://localhost:8081/v1/phrases";
        const response = await fetch(query).then((response) => response.json());
        console.log("Пришло с сервера: ", response);
        this.phrases = response;
        const qtyPhrases = this.phrases.length;
        const answerTemplate = {
          en: {
            id: '',
            value: '',
          },
          ru: {
            value: ''
          }
        };
        this.answers = Array(qtyPhrases).fill(answerTemplate);
        this.isPhrasesLoading = false
        this.showTrainerList = true
      } catch (e) {
        this.showTrainerList = false
        this.showOiVSE = true;
        console.log(e);
      }
    },

    async postAnswers() {
      console.log(JSON.stringify(this.answers));
      try {
        const response = await fetch("http://192.168.1.228:3000/v1/check", {
          method: "POST",
          body: JSON.stringify(this.answers),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        });
        const json = await response.json();
        console.log("Успех:", json);
      } catch (error) {
        console.error("Ошибка:", error);
        this.showOiVSE = true;
      }
    }
  }
});
</script>

<style scoped></style>


