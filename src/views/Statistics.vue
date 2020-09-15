<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
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
import intervalList from '@/constents/intervalList';
import recordTypeList from '@/constents/recordTypeList';
import dayjs from 'dayjs';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    type HashTableValue = { title: string; items: RecordItem[] }
    const {recordList} = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
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
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

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