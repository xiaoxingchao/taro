import Taro, { Component } from '@tarojs/taro'
import { View,Navigator} from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import { AtList, AtListItem  } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import editimg from '../image/editimg.png'
import './address.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'

// @connect(
//   ({ counter }) => ({
//     counter
//   }),
//   (dispatch) => ({
//     onGetUserList(parame,fun) {
//       dispatch(userlist(parame)).then((res)=>{
//         fun(res)
//       })
//     }
//   })
// )

export default class Index extends Component {

  config = {
    navigationBarTitleText: '收货地址',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:[]
    }
  }

  componentWillMount () {
    
  }

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
          data:res.data.data||[],
          // isload:false,
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel("网络连接失败" + JSON.stringify(errMsg))
    })
  }

  componentDidHide () { }
  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='address'>
          {data.length===0?<View className='addressbox'>
            <Navigator url='../addaddress/addaddress?type=add'>
              <View className='add'>添加地址</View>
            </Navigator>
          </View>:<View className='addressbox'>
            <View class='view-div address_divT displayflex_between'>
              <View class='view-span address_name'>{data[0].true_name}</View>
              <View class='view-span address_tel'>{data[0].mobile}</View>
            </View>
            <View class='view-div address_divM'>{data[0].contact_addr}</View>
            <Navigator url='../addaddress/addaddress?type=edit'>
              <View class='view-div address_divB'>
                <image src={editimg} style='height:1.1rem;width:1.1rem;'></image>
                <View class='view-span'>编辑</View>
              </View>
            </Navigator>
          </View>}
          
        </View>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}