<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Chart :option="chartOption"/>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span class="tags">{{ tagString(item.tags) }}</span>
            <span class="notes">备注：{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constents/recordTypeList';
import dayjs from 'dayjs';
import deepClone from '@/lib/deepClone';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Chart, Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;
  get keyValueList(){
    const array = [];
    const today = dayjs();
    for (let i = 0; i < 7; i++) {
      const date = today.subtract(i, 'day').format('YYYY-MM-DD');
      const foundDate = this.groupedList.filter(item => item.title === date)[0];
      array.unshift({date: date, value: foundDate ? foundDate.total : 0});
    }
    return array
  }


  get chartOption() {
    const showDate = this.keyValueList.map(item=>item.date.slice(5))
    const showValue = this.keyValueList.map(item=>item.value)
    return {
      tooltip: {
        confine: true,
        show: true,
        position: 'top',
        triggerOn: 'mousemove|click',
        formatter: '{c}',
      },
      grid: {
        left: 0,
        top: '20%',
        right: 0,
        bottom: '20%',
      },
      xAxis: {
        type: 'category',
        data: showDate,
        axisTick: {show: false, alignWithLabel: true},
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [{
        symbolSize: 15,
        data: showValue,
        type: 'line',
        itemStyle: {
          color: '#5a5a5a'
        },
        symbol: 'circle',
        markLine: {
          symbol: ['none', 'none'],
          silent: true,
          data: [{
            type: 'average'
          }],
          label: {show: false},
          lineStyle: {color: '#d6d6d6'}
        }
      }]
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    type Result = {
      title: string;
      items: RecordItem[];
      total?: number;
    }[]
    const {recordList} = this;
    const newList = deepClone(recordList).filter(item => item.type === this.type).sort((a, b) => {
      return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
    });
    if (newList.length === 0) {return [] as Result;}
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(item => item.total = item.items.reduce((sum, item) => sum + item.amount, 0));
    return result;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags[0].name;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  beautify(title: string) {
    if (dayjs(title).isSame(dayjs(), 'day')) {
      return '今天';
    } else if (dayjs(title).isSame(dayjs().subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (dayjs(title).isSame(dayjs(), 'year')) {
      return dayjs(title).format('M月D日');
    } else {
      return title;
    }
  }
}
</script>

<style lang='scss' scoped>
.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep .type-tabs-item {
  background: #c4c4c4;

  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}

%item {
  padding: 6px 16px;
  line-height: 28px;
  display: flex;
  justify-content: space-between;
}

.title {
  @extend %item
}

.tags {
  white-space: nowrap;
}

.record {
  background: white;
  @extend %item
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  word-break: break-all;
  color: #999
}

</style>