<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="createRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="createAt">
      <FormItem :value.sync="record.createdAt"
                type="date"
                field-name="日期"
                place-holder="在这里输入日期"/>
    </div>
    <div class="notes-wrapper">
      <FormItem :value.sync="record.notes"
                field-name="备注"
                place-holder="在这里输入备注"/>
    </div>
    <Tags :value="record.tags"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constents/recordTypeList';

// const recordList = recordListModel.fetch();
// const version = window.localStorage.getItem('version' || '0');
// if (version === '0.0.1') {
//   //数据升级，数据迁移
//   recordList.forEach(record => {
//     record.createdAt = new Date(0);
//   });
//   //保存数据
//   recordListModel.save();
// }
// //保存后就能升级版本了，0.0.2版本新增了创建时间
// window.localStorage.setItem('version', '0.0.2');

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};
  recordTypeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords');
    this.$store.commit('fetchTags');
  }

  createRecord() {
    this.$store.commit('createRecord', this.record);
  }
}

</script>

<style lang='scss' scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes-wrapper {
  padding: 12px 0;
}
</style>