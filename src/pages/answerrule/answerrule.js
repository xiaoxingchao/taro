import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import './answerrule.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'
// import WxParse from '../../wxParse/wxParse'


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
    api.post('jsonapi/wx_app/getRule.json', {}).then((res) => {
      if (res.data.code == 0) {
        var data = res.data.result;
        // WxParse.wxParse('jd_rule', 'html', data.jd_rule, this.$scope, 5);
        // WxParse.wxParse('jj_rule', 'html', data.jj_rule, this.$scope, 5);
        // WxParse.wxParse('db_rule', 'html', data.db_rule, this.$scope, 5);
        this.setState({
          data:res.data.result?res.data.result:{},
        })
      } else {
        showModel(JSON.stringify(res.errMsg))
      }
    }).catch((errMsg) => {
      showModel('网络连接失败' + JSON.stringify(errMsg))
    })
  }

  componentDidHide () { }

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
