import Vue from 'vue';
import Vuex from 'vuex';
import deepClone from '@/lib/deepClone';
import createId from '@/lib/createId';

Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  currentTagReturnValue?: 'duplicated' | 'null' | 'success';
  removeTagReturnValue?: boolean;
  updateTagReturnValue?: 'duplicated' | 'not found' | 'nothing' | 'success';
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    currentTagReturnValue: undefined,
    removeTagReturnValue: undefined
  } as RootState,
  mutations: {
    createRecord(state, record) {
      const deepCloneRecord: RecordItem = deepClone(record);
      deepCloneRecord.createdAt = new Date();
      state.recordList?.push(deepCloneRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (name && names.indexOf(name) >= 0) {
        window.alert('标签名重复');
        state.currentTagReturnValue = 'duplicated';
      } else if (name === '' || name === null) {
        window.alert('标签名不能为空');
        state.currentTagReturnValue = 'null';
      } else {
        const id = createId().toString();
        state.tagList.push({id, name});
        store.commit('saveTags');
        state.currentTagReturnValue = 'success';
      }
    },
    removeTag(state, id: string) {
      const message = window.confirm(`确定要删除此标签吗？`);
      if (message) {
        let index = -1;
        for (let i = 0; i < store.state.tagList.length; i++) {
          if (state.tagList[i].id === id) {
            index = i;
            break;
          }
        }
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        state.removeTagReturnValue = true;
      } else {
        state.removeTagReturnValue = false;
      }
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      const tag = state.tagList.filter(item => item.id === id)[0];
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if (nameList.indexOf(name) >= 0) {
          tag.name = name;
          store.commit('saveTags');
          state.updateTagReturnValue = 'duplicated';
        } else if (name === '') {
          tag.name = name;
          store.commit('saveTags');
          state.updateTagReturnValue = 'nothing';
        } else {
          tag.name = name;
          store.commit('saveTags');
          state.updateTagReturnValue = 'success';
        }
      } else {
        state.updateTagReturnValue = 'not found';
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    saveTags() {//写数据
      window.localStorage.setItem('tagList', JSON.stringify(store.state.tagList));
    }
  }
});

export default store;