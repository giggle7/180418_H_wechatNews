const util = require('../../utils/util')

Page({
  data: {
    categoryList: [
      { key: 'cj', display: '财经'},
      { key: 'js', display: '科技' },
      { key: 'ty', display: '体育' },
      { key: 'other', display: '其他' }
    ],
    activeCategory: null,
    newsList: []
  },

  onTapArticle1() {
    console.log('onTapArticle1')
    wx.navigateTo({
      url: '/pages/articles/articleA1/a1'
    })
  },
  onTapArticle2() {
    console.log('onTapArticle2')
    wx.navigateTo({
      url: '/pages/articles/articleA1/a1'
    })
  },
  onTapArticle3() {
    console.log('onTapArticle3')
    wx.navigateTo({
      url: '/pages/articles/articleA1/a1'
    })
  },
  onTapArticle4() {
    console.log('onTapArticle4')
    wx.navigateTo({
      url: '/pages/articles/articleA1/a1'
    })
  },
  onTapArticle5() {
    console.log('onTapArticle5')
    wx.navigateTo({
      url: '/pages/articles/articleA1/a1'
    })
  },

  onLoad() {
    console.log('onLoad')
    this.setData(
      {
        activeCategory: this.data.categoryList[0].key
      },
      this.getList.bind(this)
    )
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.getList(() => {
      wx.stopPullDownRefresh()
    })
  },
  getList(callback) {
    console.log('getList')
    const category = this.data.activeCategory
    if (!!category) {
      const callbackWrap = () => {
        if (!!callback) {
          callback()
        }
      }
    }
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        'type': category
      },
      success: ({ data }) => {
        if (data.code === 200 && Array.isArray(data.result)) {
          const newsList = []
          data.result.forEach(news => {
            newsList.push ({
              title: news.title,
              source: news.source,
              firstImage: news.firstImage,
              firstImage: !!news.firstImage ? news.firstImage : '/images/a1p1.jpeg',
              //date: news.date
              date: util.formatTime(new Date(news.date))
            })
          })
          this.setData({ newsList })
          //this.setData({ newsList }, callbackWrap)
          //callbackWrap()
        }
      },
    })
  },
})
