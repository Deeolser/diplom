<template>
  <MySpinner v-if='showSpinner'/>
  <my-container>
    <MyHeader>
      Добавление перевода
    </MyHeader>
  </my-container>
  <my-container class='flex flex-col justify-center'>
    <div>
      <form class='flex flex-row justify-between' @submit.prevent>
        <div class='flex flex-row w-10/12 justify-between gap-4'>
          <div class='w-1/2'>
            <label class='font-bold text-head_over_heels text-sm uppercase mr-2 '>EN</label>
            <my-input
              class='w-10/12'
              v-model='pair.phrase'
              placeholder='Введи фразу'
              type='text'
            />
          </div>
          <div class='w-1/2'>
            <label class='font-bold text-head_over_heels text-sm uppercase mr-2'>RU</label>
            <my-input
              class='w-10/12'
              v-model='pair.translate'
              placeholder='Введи перевод'
              type='text'
            />
          </div>
        </div>
        <div class='flex flex-col justify-center'>
          <my-button @click='addPair'>Добавить</my-button>
        </div>
      </form>
    </div>
  </my-container>
  <oi-vse v-if='showOiVSE'/>
  <last-added
    v-if='showLastAdded && !showSpinner && !showOiVSE'
    :last-pairs='lastPairs' />
</template>

<script>

import { parseLocalStorage, saveToLocalStorage } from '../utils/storageUtils.js';
import LastAdded from './LastAdded.vue';
import OiVse from './OiVse.vue';

export default {
  name: 'AddingPairs',
  components: { OiVse, LastAdded },
  mounted() {
    if (parseLocalStorage('LAST_ADDED')) {
      this.lastPairs = parseLocalStorage('LAST_ADDED');
      this.showLastAdded = true
    }
  },

  data() {
    return {
      pair: {
        phrase: '',
        translate: '',
      },
      lastPairs: [],
      showSpinner: false,
      showLastAdded: false,
      showOiVSE: false
    };
  },
  methods: {
    addPair() {
      const newPair = [{
        en: {
          value: this.pair.phrase,
        },
        ru: {
          value: this.pair.translate,
        },
      }];
      this.postPair(newPair);
    },

    async postPair(newPair) {
      this.showSpinner = true
      try {
        const response = await fetch('http://45.95.235.82:3000/v1/admin/add-pairs', {
          method: 'POST',
          body: JSON.stringify(newPair),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        const json = await response.json();
        console.log('Последняя добавленная пара', json[0]);
        const lastAddedPair = json[0];
        this.addLastPair(lastAddedPair);
        this.pair.phrase = '';
        this.pair.translate = '';
        this.showSpinner = false
        this.showLastAdded = true
      } catch (e) {
        this.showSpinner = false
        this.showLastAdded = false
        this.showOiVSE = true
        console.log(e);
      }
    },

    addLastPair(lastAddedPair) {
      this.lastPairs.unshift(lastAddedPair);
      console.log('Массив последних добавленных', this.lastPairs);
      this.capitalizeFirstLetterInObject(this.lastPairs);
      console.log('capitalizeFirstLetterInObject', this.lastPairs);
      saveToLocalStorage('LAST_ADDED', this.lastPairs);
    },
    capitalizeFirstLetterInObject(lastPairs) {
      for (let pair of this.lastPairs) {
        pair.en.value = this.capitalizeFirstLetter(pair.en.value);
        pair.ru.value = this.capitalizeFirstLetter(pair.ru.value);
        console.log(pair.en.value);
      }
      return lastPairs;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

  },
};
</script>

<style scoped>

</style>