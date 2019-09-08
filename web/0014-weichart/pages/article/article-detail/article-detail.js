// pages/article/article-detail/article-detail.js
var { articles } = require('../../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPalying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId
    var article = articles[articleId]
    // 处理收藏
    var isCollection=true
    // 获取storage中的收藏对象
    var articleCollection = wx.getStorageSync('articleCollection')
    if (articleCollection){
        isCollection= !!articleCollection[articleId]
    }
    // 没有对象初始化
    else{
      var data ={

      }
      data[articleId]=false
      wx.setStorageSync('articleCollection', data)

    }
    this.setData({...article,
    isCollection:isCollection})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 处理收藏
  tapCollection:function(){
    // wx.setStorageSync('key1',{name:'tome'})
    // var data = wx.getStorageSync('key1')
    // console.log(data)
    // 获取storage中的收藏对象
    var articleCollection = wx.getStorageSync('articleCollection')
    var currentIsCollection = articleCollection[this.data.articleId]
    articleCollection[this.data.articleId] = !currentIsCollection
    wx.setStorageSync('articleCollection', articleCollection)
    this.setData({ isCollection: !currentIsCollection},function(){
      wx.showToast({
        title: currentIsCollection ? '取消成功':'收藏成功',
        duration:2000

        })
    })
    
  },
  tapShare:function(){
    var itemList = ['分享到QQ', '分享到朋友圈', '分享到微博']
    wx.showActionSheet({
      itemList:itemList,
      success(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功'
        })
      }
    })
  },
   tapMusic:function(){
     console.log('ppp')
    var backgroundAudioManager  = wx.getBackgroundAudioManager()
     if (this.data.isPalying){//暂停播放
      backgroundAudioManager.pause()
      this.setData({ isPlaying: false })
    }
    else{//播放音乐
       console.log('aaa')
       backgroundAudioManager.src = 'http://oxoxtpvtn.bkt.clouddn.com/%E9%87%91%E5%BF%97%E6%96%87%20-%20%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.mp3'
      backgroundAudioManager.title = '演员'
      // backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl
      this.setData({ isPlaying:true})
    }
  }
})