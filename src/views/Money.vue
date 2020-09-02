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


//声明类型
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags: string[] = ['衣', '食', '住', '行'];
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  record: Record = {tags: [], notes: '', type: '-', amount: 0};


  saveRecord() {
    const deepCloneRecord = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(deepCloneRecord);
  }

  @Watch('recordList')
  onRecordListChanged() {
    localStorage.setItem('recordList', JSON.stringify(this.recordList));
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