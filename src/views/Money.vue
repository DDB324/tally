<template>
  <Layout class-prefix="xxx">
    {{ record }}
    <NumberPad :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
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
  record: Record = {tags: [], notes: '', type: '-', amount: 0};
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