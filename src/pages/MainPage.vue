<template>
  <my-spinner v-if='showSpinner'/>
  <oi-vse v-if='showOiVSE' />
  <div v-if='phrases.length > 0 && !showOiVSE'>
    <my-container>
      <div class='flex flex-col'>
        <my-header>Проверь свои знания</my-header>
      </div>
    </my-container>
    <trainer-list
      v-if='showTrainerList'
      :phrases='phrases'
      @createAnswer='prepareAnswer'
      @send='send' />
    <trainer-results
      v-if='showResults'
      :testResults='testResults'
      @repeatTest='repeatTest' />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TrainerList from '../components/TrainerList.vue';
import TrainerResults from '../components/TrainerResults.vue';
import OiVse from '../components/OiVse.vue';

export default defineComponent({
  components: { OiVse, TrainerResults, TrainerList },

  mounted() {
    this.fetchPhrases();
  },
  data() {
    return {
      phrases: [],
      answers: [],
      showSpinner: false,
      showOiVSE: false,
      showTrainerList: false,
      testResults: [],
      showResults: false,
    };
  },

  methods: {
    repeatTest() {
      this.showResults = false;
      this.answers = [];
      this.fetchPhrases();
    },

    send() {
      this.postAnswers();
      this.showTrainerList = false;
    },

    prepareAnswer(newAnswer, index) {
      this.answers.splice(index, 1, newAnswer);
    },

    async fetchPhrases() {
      try {
        this.showSpinner = true;
        const url = 'http://45.95.235.82:3000/v1/phrases';
        const response = await fetch(url).then((response) => response.json());
        this.phrases = response;
        for (let i in this.phrases) {
          const newAnswerTemplate = {
            en: {
              id: this.phrases[i].en.id,
              value: '',
            },
            ru: {
              value: '',
            },
          };
          this.answers.push(newAnswerTemplate);
        }
        this.showSpinner = false;
        this.showTrainerList = true;
      } catch (e) {
        this.showTrainerList = false;
        this.showOiVSE = true;
        this.showSpinner = false;
        console.log(e);
      }
    },
    async postAnswers() {
      this.showSpinner = true;
      try {
        const response = await fetch('http://45.95.235.82:3000/v1/check', {
          method: 'POST',
          body: JSON.stringify(this.answers),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        this.testResults = await response.json();
        this.showSpinner = false;
        this.showResults = true;
      } catch (error) {
        console.error('Ошибка:', error);
        this.showOiVSE = true;
        this.showSpinner = false;
        this.showTrainerList = false;
      }
    },
  },
});
</script>

<style scoped></style>


