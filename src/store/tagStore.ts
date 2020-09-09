import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  tagList: [] as Tag[],
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (name && names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      return 'duplicated';
    } else if (name === '' || name === null) {
      window.alert('标签名不能为空');
      return 'null';
    } else {
      const id = createId().toString();
      this.tagList.push({id, name});
      this.saveTags();
      return 'success';
    }
  },
  removeTag(id: string) {
    const message = window.confirm(`确定要删除此标签吗？`);
    if (message) {
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    } else {
      return false;
    }
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    const tag = this.tagList.filter(item => item.id === id)[0];
    if (idList.indexOf(id) >= 0) {
      const nameList = this.tagList.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        tag.name = name;
        this.saveTags();
        return 'duplicated';
      } else if (name === '') {
        tag.name = name;
        this.saveTags();
        return 'nothing';
      } else {
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  },
  saveTags() {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;