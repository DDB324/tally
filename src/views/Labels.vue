<template>
  <Layout>
    <div class="tags">
      <router-link class="tag"
                   :to="`/labels/edit/${tag.id}`"
                   v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = store.tagList;

  createTag() {
    const name = window.prompt('请输入新增标签的名字');
    if (name) {
      store.createTag(name);
    }
  }
}
</script>

<style lang='scss' scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    border-bottom: 1px solid #e6e6e6;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTag-wrapper {
  padding: 16px;
  margin-top: 44-16px;
  text-align: center;

  > .createTag {
    background: green;
  }
}

</style>