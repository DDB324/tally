<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes-wrapper">
      <FormItem :value.sync="record.notes"
                field-name="备注"
                place-holder="在这里输入备注"/>
    </div>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const version = window.localStorage.getItem('version' || '0');
if (version === '0.0.1') {
  //数据升级，数据迁移
  recordList.forEach(record => {
    record.createdAt = new Date(0);
  });
  //保存数据
  recordListModel.save();
}
//保存后就能升级版本了，0.0.2版本新增了创建时间
window.localStorage.setItem('version', '0.0.2');

@Component({
  components: {Tags, FormItem, Types, NumberPad},
})
export default class Money extends Vue {
  tags = window.tagList;
  recordList = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


  saveRecord() {
    recordListModel.create(this.record);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save();
    console.log(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>
<style lang='scss' scoped>
.notes-wrapper {
  padding: 12px 0;
}
</style>