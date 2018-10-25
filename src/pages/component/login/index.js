import Taro, { Component } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import {post} from '../../../utils/network'
import {showModel} from '../../../utils/tools'
import './index.less'


export default class Index extends Component {
  state={
    isShow:false
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //隐藏弹框
  hideDialog=()=>{
    this.setState({
      isShow: false
    })
  }
  //展示弹框
  showDialog=()=>{
    this.setState({
      isShow: true
    })
  }
  //验证token
  checkToken() {
    var that = this;
    Taro.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        //验证token是否有效
        post('app_applet/checkToken', { "token": token }, false).then(function (res1) {
          if (res1.code == 0) {
            // that.triggerEvent("init");
          } else {
            that.showDialog();
            return;
          }
        })
      },
      fail: function () {
        that.showDialog();
        return;
      }
    })
  }
  getUserInfoAction=(res)=>{
    console.log(res);
    var that = this;
    var encryptedData = res.detail.encryptedData;
    var iv = res.detail.iv;
    if (encryptedData && iv) {
      // console.log("允许")
      that.login().then((res1) => {
        var data = {
          "code": res1.code,
          "encryptedData": encryptedData,
          "iv": iv,
        }
        post('app_applet/login', data).then((res2) => {
          if (res.code == 0) {
            var token = res2.result.token;
            Taro.setStorageSync("token", token);
            that.hideDialog();
          } else {
            showModel(res.message);
          }
        }).catch((errMsg) => {
          showModel("网络连接失败" + errMsg)
        })
      }).catch((errMsg) => {
        showModel("登录:" + errMsg)
      })
    } else {
      showModel("登录失败，请重新授权");
    }
  }
  // 登录
  login=()=>{
    let promise = new Promise((resolve, reject) => {
      Taro.login({
        success: function (res) {
          if (res.code) {
            resolve(res)
          } else {
            showModel("登录失败")
          }
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
    return promise;
  }
  render () {
    return (
      <View className='wx_dialog_container' hidden={!this.state.isShow}>
        <View className='wx-mask'></View>
        <View className='wx-dialog'>
            <View className='wx-dialog-title'>欢迎进入京环之声答题小程序</View>
            <View className='wx-dialog-footer'>
              <Button className='wx-dialog-btn' openType='getUserInfo' onGetUserInfo={this.getUserInfoAction.bind(this)}>登录</Button>
            </View>
        </View>
      </View>
    )
  }
}

