<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
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
  </Layout>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constents/recordTypeList';
import dayjs from 'dayjs';
import deepClone from '@/lib/deepClone';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
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
    if (recordList.length === 0) {return [] as Result;}
    const newList = deepClone(recordList).filter(item => item.type === this.type).sort((a, b) => {
      return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
    });
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

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style lang='scss' scoped>
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