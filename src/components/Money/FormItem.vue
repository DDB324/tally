<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             :value="currentValue"
             @input="onInput"
             :placeholder="this.placeHolder">
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({required: true}) readonly fieldName!: string;
  @Prop() readonly placeHolder?: string;
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
.formItem {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 16px;

  > .name {
    padding-right: 16px;
  }

  > input {
    height: 40px;
    background: transparent;
    border: none;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>