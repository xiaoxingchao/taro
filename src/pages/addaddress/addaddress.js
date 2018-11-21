import Taro, { Component } from '@tarojs/taro'
import { View,Form,Button,Input,Label  } from '@tarojs/components'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import './addaddress.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '编辑收货地址',
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
          <Form
            onSubmit={this.formSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
            className='form'
          > 
            <View className='mui-input-row'>
              <Label >联系人：</Label >
              <Input type='text' placeholder='请输入...' name='true_name' value={data.true_name} />
            </View>
            <View className='mui-input-row'>
              <Label >电话：</Label >
              <Input type='number' placeholder='请输入...' name='mobile' value={data.mobile} />
            </View>
            <View className='mui-input-row'>
              <Label >详细地址：</Label >
              <Input type='text' placeholder='请输入...' name='contact_addr' value={data.contact_addr} />
            </View>
            <Button size='normal' formType='submit' className='nalsubmitapply'>提交</Button>
          </Form>
          
        </View>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}