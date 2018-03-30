var rpn = require("../../utils/rpn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: "back",
    id2: "clear",
    id3: "negative",
    id4: "+",
    id5: "9",
    id6: "8",
    id7: "7",
    id8: "-",
    id9: "6",
    id10: "5",
    id11: "4",
    id12: "*",
    id13: "3",
    id14: "2",
    id15: "1",
    id16: "/",
    id17: "0",
    id18: ".",
    id19: "history",
    id20: "=",
    screenData: "0",
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },history: function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  clickButton: function (event) {
    var id =  event.target.id;
    var sd = this.data.screenData+"";
    var firstWord = sd.substring(0, 1);
    var lastWord = sd.substring(sd.length - 1);
    var data = 0;
    console.log(id);
    if (id == this.data.id1){ //back
      if(sd==0||sd.length==1||sd=="-"){
        data = 0;
      } else {
        data = sd.substring(0, sd.length - 1);
      }
    } else if (id == this.data.id2){ //clear
      data = 0;
    } else if (id == this.data.id3) { //negative
      if(sd=="0"){
        data = 0;
      } else {
        if(firstWord=="-"){
          data = sd.substring(1, sd.length);
        } else {
          data = "-" + sd;
        }
      }
    } else if (id == this.data.id20) { //=
      if(isNaN(lastWord)){
        return;
      }
      var ary = [],num = "";
      for(var i=0;i<sd.length;i++){
        var s = sd.substring(i,i+1);
        if(isNaN(s)){
          ary.push(num);
          ary.push(s);
          num = "";
        }else{
          num+=s;
        }
      }
      ary.push(num);
      console.log(ary);
      for (var i in ary){
        
      }
      data = rpn.calCommonExp(sd);
      var log = sd + '=' + data;
      this.data.logs.push(log);
      wx.setStorageSync('callogs', this.data.logs);
    } else {
      if ((id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16)
        && (lastWord == this.data.id4 || lastWord == this.data.id8 || lastWord == this.data.id12 || lastWord == this.data.id16)){
        if(lastWord==id){
          return;
        } else {
          data = sd.substring(0, sd.length-1)+id;
        }
      } else if (sd == "0") {
        data = id;
      } else {
        data = sd + id;
      }
    }
    this.setData({ screenData: data });
  }
})