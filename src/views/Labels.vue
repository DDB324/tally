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
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Button from '@/components/Button.vue';

tagListModel.fetch();
@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入新增标签的名字');
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    } else if (message === 'null') {
      window.alert('标签名不能为空');
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
}

</style>