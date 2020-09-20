<template>
  <div>
    <label class="formItem">
      <template v-if="type">
        <span class="name">{{ fieldName }}</span>
        <input :type="type"
               :value="x(value)"
               @input="onInputValue($event.target.value)"
               :placeholder="placeHolder">
      </template>
      <template v-else>
        <span class="name">{{ fieldName }}</span>
        <input :type="'text'"
               :value="value"
               @input="onInputValue($event.target.value)"
               :placeholder="placeHolder">
      </template>
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({required: true}) readonly fieldName!: string;
  @Prop() readonly placeHolder?: string;
  @Prop({default: ''}) readonly value!: string;
  @Prop() type?: string;

  onInputValue(value: string) {
    this.$emit('update:value', value);
  }

  x(value: string) {
    return dayjs(value).format('YYYY-MM-DD');
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