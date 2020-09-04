const localStorageKeyName = 'recordList';
const model = {
  deepClone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {//读数据
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];

  },
  save(data: RecordItem[]) {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));

  }
};
// export {model}
export default model;