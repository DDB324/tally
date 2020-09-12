<template>
  <div class="holeWindow">
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
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    this.$store.commit('fetchTags');
    const id = this.$route.params.id;
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      // this.$router.push('/404');//回退回不去
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag', {id: this.tag.id, name});
    }
  }

  fallBack() {
    const message = this.$store.state.updateTagReturnValue;
    if (message === 'duplicated') {
      window.alert('输入的标签名已存在，请重新输入');
    } else if (message === 'nothing') {
      window.alert('输入的标签名为空，请重新输入');
    } else if (message === 'success' || message === undefined) {
      this.$router.back();
    }
  }

  remove() {
    this.$store.commit('removeTag', this.tag.id);
    if (this.tag && this.$store.state.removeTagReturnValue) {
      window.alert('删除成功');
      this.$router.replace('/labels');
    } else {
      window.alert('删除失败');
    }
  }
}
</script>

<style lang='scss' scoped>
.holeWindow {
  min-height: 100vh;
}

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
  padding-top: 16px;
  margin-top: 44-16px;
  flex-grow: 1;

  > .button {
    background: red;
  }
}
</style>