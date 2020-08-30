<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang='js'>
export default {
  name: 'Types',
  props:['xxx'],
  mounted() {
    console.log(this.xxx)
  },
  data() {
    return {
      type: '-'//减号表示输出，加号表示输入
    }
  },
  methods: {
    selectType(type) {//type只能时减号或者加号中的一个
      if (type !== '-' && type !== '+') {
        throw  new Error('type is unknown')
      }
      this.type = type
    }
  }

};
</script>

<style lang='scss' scoped>
.types {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;

  > li {
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