<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" :value="value"
             @input="onInput"
             placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Notes extends Vue {
  value: '';

  onInput(event: KeyboardEvent) {
    this.value = event.target.value;
  }
}
</script>

<style lang='scss' scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding-left: 16px;

  > .name {
    padding-right: 16px;
  }

  > input {
    height: 64px;
    background: transparent;
    border: none;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>