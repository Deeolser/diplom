<template>
  <div v-if="isLoading===true">
    <my-spiner/>
  </div>
  <div v-else-if="showOiVSE===true">
    <my-canva>
      <my-header class='text-5xl text-center'>Ой, ВСЕ!</my-header>
      <my-header class='text-xl text-center'>Не работает твой сервер!</my-header>
    </my-canva>
  </div>
  <div v-else>
    <my-canva>
      <div class="flex flex-col">
        <my-header>Проверь свои знания</my-header>
      </div>
    </my-canva>
    <my-canva>
      <trainer-list
        v-if="showTrainerList===false"
        :phrases="phrases"
        @createAnswer="prepareAnswer"
        @pushBtn="send"
      ></trainer-list>

      <trainer-results
        v-if="showResults===true"
        :testResults='testResults'
      ></trainer-results>

    </my-canva>
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
      testResults: [
        {
          en: {
            id: "5fe9971f-5e0b-4191-a68a-7cd42b9be222",
            value: "hello"
          },
          ru: {
            correctPhrases: [{
              id: "d636767e-89fe-4c8a-8f85-019107488e1a",
              value: "привет",
            },{
              id: "d636767e-89fe-4c8a-8f85-019107488e1b",
              value: "дарова",
            }],
            checkResult: {
              enteredValue: "приве",
              success: false,
              tries: 1,
              failures: 1
            }
          }
        },{
          en: {
            id: "d636767e-89fe-4c8a-8f85-019107488e1a",
            value: "Olga"
          },
          ru: {
            correctPhrases: [{
              id: "d636767e-89fe-4c8a-8f85-019107488e1a",
              value: "Ольга",
            }],
            checkResult: {
              enteredValue: "Ольга",
              success: true,
              tries: 1,
              failures: 0
            }
          }
        }
      ],
      showResults: true
    };
  },

  methods: {
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
        this.isLoading = false
        this.showTrainerList = true
      } catch (e) {
        this.showTrainerList = false
        this.showOiVSE = true;
        console.log(e);
      }
    },

    async postAnswers() {
      this.isLoading = true
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
        this.testResults = json
        console.log(this.testResults);
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


