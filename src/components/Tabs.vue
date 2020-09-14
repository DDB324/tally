<template>
  <ul class="tabs" :class="{[classPrefix + '-tabs-item']:classPrefix}">
    <li v-for="data in dataSource" :key="data.value"
        class="tabs-item"
        :class='liClass(data)'
        @click="select(data)">{{ data.text }}
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {
  text: string;
  value: string;
}
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;//!为变量绝对不是undefined
  @Prop(String) readonly classPrefix?: string;//？为变量可能为undefined
  liClass(data: DataSourceItem) {
    return {
      selected: data.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix
    };
  }

  select(data: DataSourceItem) {
    this.$emit('update:value', data.value);
  }
}
</script>

<style lang='scss' scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background: #333;
      bottom: 0;
      left: 0;
    }
  }
}
</style>