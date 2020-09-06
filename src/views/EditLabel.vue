<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" @click="fallBack" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightSpan"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button class="button" @click="remove">删除标签</Button>
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
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    const tags = tagListModel.data;
    const tag = tags.filter(item => item.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      // this.$router.push('/404');//回退回不去
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }

  fallBack() {
    console.log('后退');
    this.$router.back();
  }

  remove() {
    const message = window.confirm(`确定要删除此标签吗？`);
    if (this.tag && message && tagListModel.remove(this.tag.id)) {
      this.$router.replace('/labels');
    } else {
      window.alert('删除失败');
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
  >.button{
    background: red;
  }
}
</style>