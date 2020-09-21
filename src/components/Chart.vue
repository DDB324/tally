<template>
  <div class="echarts-wrapper">
    <div ref="container" class="echarts">
      chart
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() readonly option?: EChartOption;
  myChart?: ECharts;

  mounted() {
    this.myChart = echarts.init(this.$refs.container as HTMLDivElement);
    if (this.option) {
      this.myChart.setOption(this.option);
    }
  }

  @Watch('option')
  onOptionChanged(option: EChartOption) {
    if (this.myChart) {
      this.myChart.setOption(option);
    }
  }
}
</script>

<style lang='scss' scoped>
.echarts {
  max-width: 100vw;
  height: 150px;
  border-bottom: 1px solid #d5d5d5;
  border-top: 1px solid #d5d5d5;
}
</style>