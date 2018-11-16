import Taro from '@tarojs/taro'



export function showModel(str, isBack) {
  Taro.showModal({
    title: '提示',
    content: str,
    showCancel: false,
    success: function () {
      if (isBack) { Taro.navigateBack(); }
    }
  })
}
export function showToast(str, status = 0) {
  if (status==0){
    Taro.showToast({
      title: str,
      icon: "success",
      durantion: 2000
    })
  } else if(status == 1){
    Taro.showToast({
      title: str,
      icon: "loading",
      durantion: 2000
    })
  }else{
    Taro.showToast({
      title: str,
      image: '/images/warn.png',
      durantion: 2000
    })
  }
}
//日期少于10，前面加0
export function data_deal(time){
  if(time<10){
    time =  '0' + time;
  }
  return time;
}
//获取上一个月的天数
//2014 / 01 / 25
export function getPreMonth(date) {
  var arr = date.split('/');
  var year = arr[0]; //获取当前日期的年份  
  var month = arr[1]; //获取当前日期的月份  
  var day = arr[2]; //获取当前日期的日  
  // var days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前日期中月的天数  
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  var d = new Date(year2, month2, 0);
  return d.getDate();
}

//获取下一个月的天数
//2014 / 01 / 25
export function getNextMonth(date) {
  var arr = date.split('/');
  var year = arr[0]; //获取当前日期的年份  
  var month = arr[1]; //获取当前日期的月份  
  var day = arr[2]; //获取当前日期的日  
  // var days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前日期中的月的天数  
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  var d = new Date(year2, month2, 0);
  return d.getDate();
}  
// export function back(){
//   Taro.switchTab({
//     url: '../index/index',
//   })
// }
export function getCurrentDayString(){
  // var objDate = that.data.currentObj
  // if (objDate != '') {
  //   return objDate
  // } else {
    var c_obj = new Date()
    var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
    return new Date(a)
  // }
}
//发送消息
export function sendMessage(that, msg){
  console.log("发送信息", msg);
  Taro.sendSocketMessage({
    data: msg,
    success: function (res) {
      that.send_cb(res);
    }
  })
}
//接收消息
export function resiverMessage(that){
  Taro.onSocketMessage(function (res) {
    console.log("接收信息", JSON.parse(res.data));
    that.resiver_cb(JSON.parse(res.data));
  })
}




