<template>
  <Layout>
    编辑标签
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();

@Component
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

</style>