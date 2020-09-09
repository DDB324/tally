import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
//record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
//tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    } else if (message === 'null') {
      window.alert('标签名不能为空');
    }
  },
  removeTag: (id: string) => {
    const message = window.confirm(`确定要删除此标签吗？`);
    return message && tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  }
};
export default store;