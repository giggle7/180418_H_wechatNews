const util = require('../../../utils/util')

Page({
  data: {
    categoryList: [
      { key: 'cj', display: '财经' },
      { key: 'js', display: '科技' },
      { key: 'ty', display: '体育' },
      { key: 'other', display: '其他' }
    ],
    activeCategory: null,
    newsDetail: null
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
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { 'type': category },
      success: ({ data }) => {
        if (data.code === 200) {
          this.setData({
            newsDetail: {
              title: data.result.title,
              source: data.result.source,
              firstImage: data.result.firstImage,
              readCount: data.result.readCount,
              content: data.result.content,
              date: util.formatTime(new Date(data.result.date))
            }
          })
        } 
      },
      
    })
  },
})
