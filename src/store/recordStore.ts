import deepClone from '@/lib/deepClone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {//读数据
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const deepCloneRecord: RecordItem = deepClone(record);
    deepCloneRecord.createdAt = new Date();
    this.recordList?.push(deepCloneRecord);
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords();
export default recordStore;