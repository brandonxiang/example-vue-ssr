<template>
  <div class="my-repos">
    <ul>
      <li v-for="(item, index) in reposList" :key="index">
        <a :href="item.html_url">
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'home',

  asyncData({ store }) {
    return store.dispatch('getReposList');
  },

  methods: {
    ...mapActions(['getReposList']),
  },

  computed: {
    ...mapState(['reposList']),
  },
};
</script>

<style>
.my-repos {
  text-align: center;
}
.my-repos li {
  width: 200px;
}
</style>
