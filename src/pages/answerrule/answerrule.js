import Taro, { Component } from '@tarojs/taro'
import { View  } from '@tarojs/components'
import Bottom from '../component/bottom/bottom'
import api from '../../service/api'
import {showModel} from '../../utils/tools'
import './answerrule.less'
// import { userlist } from '../../actions/counter'
import Loading from '../component/loading/loading'
import Login from '../component/login/login'
import WxParse from '../../wxParse/wxParse'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '答题规则',
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
        WxParse.wxParse('jd_rule', 'html', data.jd_rule, this.$scope, 5);
        WxParse.wxParse('jj_rule', 'html', data.jj_rule, this.$scope, 5);
        WxParse.wxParse('db_rule', 'html', data.db_rule, this.$scope, 5);
        WxParse.wxParse('zt_rule', 'html', data.db_rule, this.$scope, 5);
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
    console.log(this.state);
    return (
      <View className='con'>
        <import src='../../wxParse/wxParse.wxml' />
        <View>
        <View class='rulebox'>
          <View class='rulemodeltit'><View class='view-span'>竞技答题规则</View></View>
          <View class='wxParse'>
            <template is='wxParse' data='{{wxParseData:jj_rule.nodes}}' />
          </View>
        </View>
        <View class='rulebox'>
          <View class='rulemodeltit'><View class='view-span'>经典答题规则</View></View>
          <View class='wxParse'>
            <template is='wxParse' data='{{wxParseData:jd_rule.nodes}}' />
          </View>
        </View>
        <View class='rulebox'>
          <View class='rulemodeltit'><View class='view-span'>夺宝答题规则</View></View>
          <View class='wxParse'>
            <template is='wxParse' data='{{wxParseData:db_rule.nodes}}' />
          </View>
        </View>
        <View class='rulebox'>
          <View class='rulemodeltit'><View class='view-span'>专题答题规则</View></View>
          <View class='wxParse'>
            <template is='wxParse' data='{{wxParseData:zt_rule.nodes}}' />
          </View>
        </View>
        </View>
        <Bottom></Bottom>
        <Login />
        <Loading load={this.state.isload} />
      </View>
    )
  }
}
