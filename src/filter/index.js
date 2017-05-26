import timeAgo from 'timeago.js'

export default {
  install: function (Vue, options) {
    Vue.filter('time_ago', function (val) {
      let time = new Date(val)
      var thisTime = timeAgo()
      return thisTime.format(time, 'zh_CN')
    }),
    Vue.filter('tab', function (val) {
      if (val === 'share') {
        return '分享'
      } else if (val === 'ask') {
        return '问答'
      } else if (val === 'job') {
        return '招聘'
      }
    }),
    Vue.filter('comment',function(val){
      return val.replace('<a href="/user','<a href="#/user');
    })
  }
}
