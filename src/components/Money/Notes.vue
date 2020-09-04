<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             :value="currentValue"
             @input="onInput"
             placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop() readonly value!: string;
  currentValue = this.value;

  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.currentValue = input.value;
    this.$emit('update:value', this.currentValue);
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