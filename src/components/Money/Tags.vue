<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: string[] | undefined;
  @Prop() readonly value!: string[];
  selectedTags = this.value;

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (this.selectedTags.length === 0) {
      this.selectedTags.push(tag);
    } else if (this.selectedTags.length === 1) {
      if (index < 0) {
        this.selectedTags.splice(index, 1, tag);
      } else {
        this.selectedTags.splice(index, 1);
      }
    }
    this.$emit('update:selected', this.selectedTags);
  }

  create() {
    const name = window.prompt('请输入标签名');
    console.log(name);
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) {
      this.$emit('update:dataSource', [...this.dataSource, name]);
    }
  }
}
</script>

<style lang='scss' scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap-reverse;
    overflow: auto;

    > li {
      $bg: #d9d9d9;
      display: flex;
      align-items: center;
      background: $bg;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    > button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid black;
      padding: 0 3px;
    }
  }
}

</style>