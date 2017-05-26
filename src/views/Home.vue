/*
 * @Author: fish119 
 * @Date: 2017-05-19 13:21:06 
 * @Last Modified by: fish119
 * @Last Modified time: 2017-05-23 15:04:12
 */

<template>
  <div class="content" style="height: 100vh;">
    <mu-toast style="bottom:50%;text-align: center;" v-if="toast" :message="toastMsg" @close="hideToast" />
    <mu-tabs class="tabs box-shadow" :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部" />
      <mu-tab value="good" title="精华" />
      <mu-tab value="weex" title="weex" />
      <mu-tab value="share" title="分享" />
      <mu-tab value="ask" title="问答" />
      <mu-tab value="job" title="招聘" />
    </mu-tabs>
    <div class="tab-content" style=" position: relative;">
      <mu-refresh-control :refreshing="refreshing" :trigger="scroller" @refresh="getTopics" />
      <mu-list style="padding: 0;">
        <div v-if="topics" v-for="(topic,idx) in topics" :key="topic.id">
          <mu-list-item style="padding:0">
            <mu-avatar :src="topic.author.avatar_url" @click="toUser(topic.author.loginname)" slot="left" style="margin-bottom: -4px;" />
            <router-link :to="{path:'/content',query:{id:topic.id}}">
              <div class="mu-item-title">
                <span v-if="topic.top">
                  <span class="top-topic">置顶</span>
                </span>
                <span v-else-if="topic.good">
                  <span class="good-topic">精华</span>
                </span>
                {{topic.title}}
              </div>
              <div class="topic-content">
                <span>
                  {{topic.author.loginname}}&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="material-icons" style="font-size:14px;">remove_red_eye</i>&nbsp; {{topic.visit_count}}&nbsp;&nbsp;/&nbsp;&nbsp;
                  <i class="material-icons" style="font-size:14px;">comment</i>&nbsp; {{topic.reply_count}}
                </span>
                <span>{{topic.last_reply_at | time_ago}}</span>
              </div>
            </router-link>
          </mu-list-item>
          <mu-divider/>
        </div>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
      </mu-list>
  
    </div>
  </div>
</template>

<script>
import appHeader from '../components/Header'
import bottomNavigation from '../components/BottomNavigation'

export default {
  components: {
    appHeader,
    bottomNavigation
  },
  data() {
    return {
      activeTab: 'all',
      page: 1,
      toastMsg: '',
      toast: false,
      topics: null,
      scroller: null,
      loading: false,
      refreshing: false
    }
  },
  methods: {
    handleTabChange(val) {
      this.loading = false;
      this.activeTab = val;
      this.getTopics();
    },
    getTopics() {
      this.page = 1;
      let url = this.$store.state.svrUrl + 'topics?tab=' + this.activeTab + '&page=' + this.page;
      const self = this;
      self.refreshing = true;
      this.axios.get(url).then(function (res) {
        if (res.status == 200) {
          self.topics = [];
          self.topics = res.data.data;
        } else {
          self.showToast('获取数据失败，请稍后重试');
        }
        self.refreshing = false;
      }).catch(function (err) {
        console.log(err);
        self.refreshing = false;
      })
    },
    loadMore() {
      this.page++;
      let url = this.$store.state.svrUrl + 'topics?tab=' + this.activeTab + '&page=' + this.page;
      const self = this;
      self.loading = true;
      this.axios.get(url).then(function (res) {
        if (res.status == 200) {
          self.topics = self.topics.concat(res.data.data);
        } else {
          self.showToast('获取数据失败，请稍后重试');
          self.page--
        }
        self.loading = false;
      }).catch(function (err) {
        self.loading = false;
        console.log(err);
        self.page--
      })
    },
    showToast(msg) {
      this.toastMsg = msg
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toast = false
      }, 1500)
    },
    hideToast() {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    toUser(val) {
      this.$router.push('/user/' + val);
    }
  },
  mounted: function () {
    this.$store.dispatch('changeTabValue', '首页');
    this.scroller = this.$el;
    this.getTopics('all');
  }
}


</script>

<style scoped>
a {
  color: black;
}

.tab-content {
  padding-top: 48px;
}

.topic-content {
  margin-top: 3px;
  margin-bottom: -8px;
  display: flex;
  justify-content: space-between
}

.top-topic {
  background-color: #009688;
  color: #fff;
  padding: .2rem;
  border-radius: .2rem;
  font-size: 14px;
}

.good-topic {
  background-color: darkorange;
  color: white;
  padding: .2rem;
  border-radius: .2rem;
  font-size: 14px;
}

.mu-item-title {
  font-weight: bold;
}
</style>
