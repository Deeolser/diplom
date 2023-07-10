<template>
  <div v-if="isLoading===true">
    <my-spiner/>
  </div>
  <div v-else-if="showOiVSE===true">
    <my-canva>
      <h1 class='font-bold text-head_over_heels text-5xl text-center'>Ой, ВСЕ!</h1>
      <my-header class='text-xl text-center'>Не работает твой сервер!</my-header>
    </my-canva>
  </div>
  <div v-else>
    <my-canva>
      <div class="flex flex-col">
        <my-header>Проверь свои знания</my-header>
      </div>
    </my-canva>
      <trainer-list
        v-if="showTrainerList===true"
        :phrases="phrases"
        @createAnswer="prepareAnswer"
        @send="send"
      ></trainer-list>

      <trainer-results
        v-if="showResults===true"
        :testResults='testResults'
        @repeatTest="repeatTest"
      ></trainer-results>
  </div>
  </template>

<script>

import { defineComponent } from "vue";

import TrainerList from "../components/TrainerList.vue";
import TrainerResults from '../components/TrainerResults.vue';

export default defineComponent({
  components: { TrainerResults,  TrainerList },

  mounted() {
    this.fetchPhrases();
  },
  data() {
    return {
      phrases: [],
      answers: [],
      isLoading: false,
      showOiVSE: false,
      showTrainerList: false,
      testResults: [],
      showResults: false
    };
  },

  methods: {
    repeatTest () {
      this.showResults = false;
      this.answers = []
      this.fetchPhrases();
    },
    send() {
      console.log("Отправляю это на проверку: ", this.answers);
      this.postAnswers();
      this.showTrainerList=false
    },

    prepareAnswer(newAnswer, index) {
      this.answers.splice(index,1, newAnswer)
    },

    async fetchPhrases() {
      try {
        this.isLoading = true;
        const query = "http://45.95.235.82:3000/v1/phrases";
        const response = await fetch(query).then((response) => response.json());
        console.log("Пришло с сервера: ", response);
        this.phrases = response;
        for (let i in this.phrases) {
          const newAnswerTemplate = {
            en: {
              id: this.phrases[i].en.id,
              value: '',
            },
            ru: {
              value: ''
            }
          };
          this.answers.push(newAnswerTemplate)
        }
        console.log("Template ответов ->", this.answers);
        this.isLoading = false
        this.showTrainerList = true
      } catch (e) {
        this.showTrainerList = false
        this.showOiVSE = true;
        this.isLoading = false
        console.log(e);
      }
    },
    async postAnswers() {
      this.isLoading = true
      console.log(JSON.stringify(this.answers));
      try {
        const response = await fetch("http://45.95.235.82:3000/v1/check", {
          method: "POST",
          body: JSON.stringify(this.answers),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        });
        const json = await response.json();
        console.log("Ответ на postAnswers -> ", json);
        this.testResults = json
        this.isLoading = false
        this.showResults = true
      } catch (error) {
        console.error("Ошибка:", error);
        this.showOiVSE = true;
        this.isLoading = false
      }
    }
  }
});
</script>

<style scoped></style>


