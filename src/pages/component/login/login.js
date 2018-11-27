import Taro, { Component } from '@tarojs/taro'
import { View,Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import api from '../../../service/api'
import {showModel} from '../../../utils/tools'
import './login.less'
// import {checkToken } from '../../../actions/counter'

@connect(
  ({ counter }) => ({
    counter
  }),
  (dispatch) => ({
    onCheckToken(params) {
      dispatch(params)
    },
  })
)

export default class Index extends Component {
  state={
    isShow:false
  }
  componentWillMount () { }

  componentDidMount () { 
    let token = Taro.getStorageSync('token');
    if (!token){
      this.props.onCheckToken({type:'CHECKTOKEN',payload:{checkToken:true}})
      this.setState({
        isShow:true
      })
    }
    // this.props.onCheckToken({});
  }
  componentWillUnmount () { }

  componentDidShow () { 
    
  }

  componentDidHide () { }

  getUserInfoAction=async (res)=>{
    console.log(res);
    var that = this;
    var encryptedData = res.detail.encryptedData;
    var iv = res.detail.iv;
    if (encryptedData && iv) {
      // console.log("允许")
      console.log(that.login());
      let login = await that.login();
      var data = {
        "code": login.code,
        "encryptedData": encryptedData,
        "iv": iv,
      }
      api.post('jsonapi/wx_app/Login.json', data).then((res2) => {
        if (res2.data.code == 0) {
          var token = res2.data.token;
          Taro.setStorageSync("token", token);
          that.props.onCheckToken({type:'CHECKTOKEN',payload:{checkToken:false}})
          that.setState({
            isShow:false
          })
          // that.hideDialog();
        } else {
          that.props.onCheckToken({type:'CHECKTOKEN',payload:{checkToken:true}})
        }
      }).catch((errMsg) => {
        showModel("网络连接失败" + JSON.stringify(errMsg))
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
            console.log(res.code);
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

