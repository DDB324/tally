<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightSpan"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

tagListModel.fetch();
@Component({
  components: {Button, FormItem}
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
.navBar {
  background: white;
  padding: 12px 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {
    height: 24px;
    width: 24px;
  }

  > .rightSpan {
    height: 24px;
    width: 24px;
  }
}

.form-wrapper {
  font-size: 16px;
  margin-top: 8px;
  background: white;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>