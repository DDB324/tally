<template>
  <Layout class-prefix="xxx">
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script lang='ts'>
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';


export default {
  name: 'Money',
  components: {Tags, Notes, Types, NumberPad},
};
</script>

<style lang="scss">
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>
<style lang='scss' scoped>
</style>