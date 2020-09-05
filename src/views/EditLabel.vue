<template>
  <Layout>
    <div class="editTag">
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <Notes field-name="标签名" place-holder="请输入标签名"/>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Notes from '@/components/Money/Notes.vue';

tagListModel.fetch();
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.data;
    const tag = tags.filter(item => item.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      // this.$router.push('/404');//回退回不去
      this.$router.replace('/404');
    }

  }
}
</script>

<style lang='scss' scoped>
.editTag{
 > .tagName {

 }
}
.deleteTag{

}
</style>