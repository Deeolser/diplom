const parseLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const saveToLocalStorage = (key, v) => {
  console.log('> saveToLocalStorage =', v);
  localStorage.setItem(key, JSON.stringify(v));
};
export {
  parseLocalStorage,
  saveToLocalStorage
};