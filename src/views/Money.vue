<template>
  <Layout class-prefix="xxx">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
const version = window.localStorage.getItem('version' || '0');
if (version === '0.0.1') {
  //数据升级，数据迁移
  recordList.forEach(record => {
    record.createdAt = new Date(0);
  });
  //保存数据
  recordListModel.save(recordList);
}
//保存后就能升级版本了，0.0.2版本新增了创建时间
window.localStorage.setItem('version', '0.0.2');

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags: string[] = tagList;
  recordList = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


  saveRecord() {
    const deepCloneRecord: RecordItem = recordListModel.deepClone(this.record);
    deepCloneRecord.createdAt = new Date();
    this.recordList.push(deepCloneRecord);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>
<style lang='scss' scoped>
</style>