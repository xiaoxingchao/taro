import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'

// import {AtSearchBar } from 'taro-ui'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import './productdetails.less'
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

export default class Index extends Component {
  config = {
    navigationBarTitleText: '兑换详情',
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
  // 获取当前页参数
  getCurrParame=()=>{
    let par_id = '';
    let arr = Taro.getCurrentPages();
    par_id=arr[arr.length-1].options.id;
    return par_id;
  }
  componentDidShow () {
    let id = this.getCurrParame();
    if(id){
      this.getResult({id:id});
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
  componentDidHide () { }
  toNowchange=()=>{
    let {data}=this.state;
    Taro.navigateTo({
      title:"立即兑换",
      url: '/pages/nowchange/nowchange?id='+data.id+'&is_virtual='+data.is_virtual
    })
  }
  render () {
    let {data} = this.state;
    return (
      <View className='con'>
        <View className='intexch_productbox'>
          <View className='intexch_productul'>
            <View className='intexch_productli'>
                <Image src={rootUrl+data.img} className='intexch_proimg' mode='widthFix'></Image>
                <View className='intexch_proinfor displayflex_between'>
                  <View className='intexch_proinfor_divL'>
                    <View className='intexch_proinfor_pT'><View className='wrap'>{data.name}</View></View>
                    <View className='intexch_proinfor_pB'><View className='wrap'>{data.sell_price}积分</View></View>
                  </View>
                  <View className='intexch_proinfor_divM'>
                    <View className='intexch_proinfor_pN'>
                      <View className='wrap'>
                        已兑换数量{data.sell_nums}
                      </View>
                    </View>
                    <View className='intexch_proinfor_pN'><View className='wrap'>库存数量{data.store_nums}</View></View>
                  </View>
                </View>
              </View>
          </View>
        </View>
        <View className='detail'>
          <View className='detail-tit'>商品详情</View>
          <View>{data.content}</View>
        </View>
        <Bottom />
        <View className='exchangenowbtn' onClick={this.toNowchange.bind(this)}>立即兑换</View>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
