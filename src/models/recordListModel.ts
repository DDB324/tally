import deepClone from '@/lib/deepClone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {//读数据
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(record: RecordItem) {
    const deepCloneRecord: RecordItem = deepClone(record);
    deepCloneRecord.createdAt = new Date();
    this.data.push(deepCloneRecord);
    this.save();
  }
};
export default recordListModel;