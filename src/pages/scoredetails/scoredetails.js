import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import './scoredetails.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '积分详情',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:{}
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.setState({
      isload:false,
    })
  }
  componentWillUnmount () { }

  componentDidShow () { 
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/iwebshop_member/get.json', {user_id:userId}).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          data:res.data.data?res.data.data[0]:{},
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }

  componentDidHide () { }
  formSubmit=(e)=>{
    let userId = Taro.getStorageSync('userId');
    let {data} = this.state;
    var value = e.detail.value;
    for(var i in value){
      if(value[i]==''){
        showModel("请填写完整");
        return;
      }
    }
    if(JSON.stringify(data)==='{}'){
      api.post('jsonapi/iwebshop_member/add.json', {...{user_id:userId},...value}).then((res) => {
        if (res.data.code == 0) {
          Taro.navigateBack();
        } else {
          showModel(JSON.stringify(res.errMsg))
        }
      }).catch((errMsg) => {
        showModel('网络连接失败' + JSON.stringify(errMsg))
      })
    }else{
      api.post('jsonapi/iwebshop_member/update.json', {...{ID:data.ID},...value}).then((res) => {
        if (res.data.code == 0) {
          Taro.navigateBack();
        } else {
          showModel(JSON.stringify(res.errMsg))
        }
      }).catch((errMsg) => {
        showModel('网络连接失败' + JSON.stringify(errMsg))
      })
    }
  }
  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='address'>
          
          
        </View>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}