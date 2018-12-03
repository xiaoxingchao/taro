import Taro, { Component } from '@tarojs/taro'
import { View,Image,Form,Label,Input,Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import {AtSearchBar } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './nowchange.less'
import Login from '../component/login/login'
import Loading from '../component/loading/loading'
import {showModel,rootUrl} from '../../utils/tools'


/**
 *京环之声首页
 *
 * @export 
 * @class Index
 * @extends {Component}
 */
@connect(
  ({ counter }) => ({
    counter
  })
)
export default class Index extends Component {
  config = {
    navigationBarTitleText: '立即兑换',
  }
  constructor(props){
    super(props);
    this.state={
      isload:true,
      data:{},
      virtual:'0',
      addressData:{}
    }
  }

  componentWillMount () { }
  componentDidMount () {
    this.setState({
      isload:false,
    })
  }
  componentWillUnmount () { }
  // 获取当前页参数
  getCurrParame=()=>{
    let par_id = '';
    let arr = Taro.getCurrentPages();
    par_id=arr[arr.length-1].options;
    return par_id;
  }
  componentDidShow () {
    let p = this.getCurrParame();
    console.log(p);
    if(p.id){
      this.getResult({id:p.id});
      this.getAddressInfo();
      this.setState({
        virtual:p.is_virtual
      })
    }else{
      showModel('无参数!!')
    }
    
  }
  getResult=(parame)=>{
    api.post('jsonapi/iwebshop_goods/get.json', parame).then((res) => {
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
  // 获取地址信息
  getAddressInfo=()=>{
    let userId = Taro.getStorageSync('userId');
    if(!userId) return;
    api.post('jsonapi/iwebshop_member/get.json', {user_id:userId}).then((res) => {
      if (res.data.code == 0) {
        this.setState({
          addressData:res.data.data?res.data.data[0]:{},
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }
  componentDidHide () { }
  toNowchange=(value)=>{
    let p = this.getCurrParame();
    // console.log({...{goods_id:p.id},...value});
    api.post('jsonapi/cashPrize/cash.json', {...{goods_id:p.id},...value}).then((res) => {
      if (res.data.code == 0) {
        Taro.redirectTo({
          url: '../changesuccess/changesuccess?data=' + JSON.stringify(res.data.data[0]),
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }

  formSubmit=(e)=>{
    let score = this.props.counter.USERLIST.data.data[0].score;
    let {data} = this.state;
    var value = e.detail.value;
    for(var i in value){
      if(value[i]==''){
        showModel("请填写完整");
        return;
      }
    }
    if(Number(score)<Number(data.sell_price)){
      showModel("积分不足");
    }else{
      this.toNowchange(value);
    }
  }
  render () {
    let {data,virtual,addressData} = this.state;
    return (
      <View className='con'>
        <Form
          onSubmit={this.formSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
          className='form'
        > 
          {virtual==='0'?<View className=''>
            <View className='mui-input-row'>
              <Label >联系人：</Label >
              <Input type='text' placeholder='请输入...' name='accept_name' value={addressData.true_name} />
            </View>
            <View className='mui-input-row'>
              <Label >电话：</Label >
              <Input type='number' placeholder='请输入...' name='tel' value={addressData.mobile} />
            </View>
            <View className='mui-input-row'>
              <Label >详细地址：</Label >
              <Input type='text' placeholder='请输入...' name='addr' value={addressData.contact_addr} />
            </View>
          </View>:<View className=''>
            <View className='mui-input-row'>
              <Label >会员账号：</Label >
              <Input type='text' placeholder='请输入会员账号' name='user_no' />
            </View>
          </View>}
          <View className='intexch_productbox'>
            <View className='intexch_productul'>
              <View className='intexch_productli'>
                <Image src={rootUrl+data.img} className='intexch_proimg' mode='widthFix'></Image>
                <View className='intexch_proinfor'>
                  <View className='intexch_proinfor_divL'>
                    <View className='intexch_proinfor_pT'><View className='wrap'>{data.name}</View></View>
                    <View className='intexch_proinfor_pB'><View className='wrap'>{data.sell_price}积分</View></View>
                  </View>
                </View>
              </View>
            </View>
          </View>  
          <Button size='normal' formType='submit' className='nalsubmitapply'>确定兑换</Button>
        </Form>
        <Bottom />
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
