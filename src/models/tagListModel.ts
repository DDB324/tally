const localStorageKeyName = 'tagList';
type TagListModel = {
  data: string[];
  fetch: () => string[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';//success：成功，duplicated：name重复
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {//读数据
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    } else {
      this.data.push(name);
      this.save;
      return 'success';
    }
  }
};
// export {model}
export default tagListModel;