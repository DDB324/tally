import createId from '@/lib/createId';

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
  update: (id: string, name: string) => boolean;
  remove: (id: string) => boolean;
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
    const names = this.data.map(item => item.name);
    if (name && names.indexOf(name) >= 0) {
      return 'duplicated';
    } else if (name === '' || name === null) {
      return 'null';
    } else {
      const id = createId().toString();
      this.data.push({id, name});
      this.save();
      return 'success';
    }
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return false;
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return true;
      }
    } else {
      return false;
    }
  },
  remove(id) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  }
};
export default tagListModel;