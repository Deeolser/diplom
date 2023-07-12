<template>
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
  <my-container>
    <MyHeader>
      Недавно добавленные
    </MyHeader>
  </my-container>
  <my-container>
    {{lastPairs}}
  </my-container>
</template>

<script>

import { saveToLocalStorage } from '../utils/storageUtils.js';

export default {
  name: 'AddingPairs',
  mounted() {
    this.lastPairs = JSON.parse(localStorage.getItem('LAST_ADDED'))
  },
  data() {
    return {
      pair: {
        phrase: '',
        translate: '',
      },
      lastPairs: []
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
        const lastAddedPair = json[0]
        this.addLastPair (lastAddedPair)
        this.pair.phrase = '';
        this.pair.translate = '';
      } catch (e) {
        console.log(e);
      }
    },

    addLastPair (lastAddedPair) {
      this.lastPairs.push(lastAddedPair)
      console.log('Массив последних добавленных', this.lastPairs);
      saveToLocalStorage('LAST_ADDED', this.lastPairs)
    },

    saveToLocalStorage (key, v) {
      console.log('> saveToLocalStorage =', v);
      localStorage.setItem(key, JSON.stringify(v));
    },
  },
};
</script>

<style scoped>

</style>