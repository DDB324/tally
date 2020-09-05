const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string | null) => 'success' | 'duplicated' | 'null';//success：成功，duplicated：name重复，null name为空
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {//读数据
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {//写数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    console.log('save函数触发了');
  },
  create(name) {
    const names = this.data.map(item=>item.name)
    if (name && names.indexOf(name) >= 0) {
      return 'duplicated';
    } else if (name === '' || name === null) {
      return 'null';
    } else {
      this.data.push({id:name, name:name});
      this.save();
      return 'success';
    }
  }
};
export default tagListModel;