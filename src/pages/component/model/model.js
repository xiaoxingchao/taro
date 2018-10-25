import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
// import { AtModal } from 'taro-ui'

import './model.less'
import jingdian from '../../image/jindian.png'
import jingdian2 from '../../image/1.png'
import duobao from '../../image/duobao.png'
import duobao2 from '../../image/3.png'
import xingyun from '../../image/choujiang.png'
import xingyun2 from '../../image/2.png'
import zhuanti from '../../image/dati.png'
import zhuanti2 from '../../image/4.png'
import jingji from '../../image/guanming.png'
import jingji2 from '../../image/5.png'
import jifen from '../../image/jifen.png'
import jifen2 from '../../image/6.png'
import gongyi from '../../image/hongbao.png'
import gongyi2 from '../../image/7.png'
// import senlin from '../../image/choujiang.png'
import senlin2 from '../../image/9.png'
import paihang from '../../image/paihang.png'
import paihang2 from '../../image/10.png'

export default class Index extends Component {
  constructor(props){
    super(props);
    if(props.bg==='jingdian'){
      this.background = jingdian;
      this.background2 = jingdian2;
    }else if(props.bg==='duobao'){
      this.background = duobao;
      this.background2 = duobao2;
    }else if(props.bg==='jingji'){
      this.background = jingji;
      this.background2 = jingji2;
    }else if(props.bg==='gongyi'){
      this.background = gongyi;
      this.background2 = gongyi2;
    }else if(props.bg==='xingyun'){
      this.background = xingyun;
      this.background2 = xingyun2;
    }else if(props.bg==='zhuanti'){
      this.background = zhuanti;
      this.background2 = zhuanti2;
    }else if(props.bg==='jifen'){
      this.background = jifen;
      this.background2 = jifen2;
    }else if(props.bg==='senlin'){
      this.background = xingyun;
      this.background2 = senlin2;
    }else if(props.bg==='paihang'){
      this.background = paihang;
      this.background2 = paihang2;
    }
   
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  button=()=>{
    
    
  }
  render () {
    const bg1 = this.background;
    const bg2 = this.background2;
    return (
      <View>
        <View 
          className='model'
          // style={{height:this.props.height||'80px',lineHeight:this.props.height||'80px'}}
        >
          {this.props.bg=='paihang'?<Image
            src={bg1}
            className='model_img'
            style={{height:'80px'}}
          > 
          </Image>:<Image
            src={bg1}
            className='model_img'
            mode='widthFix'
            style={{height:'auto'}}
          > 
          </Image>}
          {/* <Image
            src={bg}
            className='model_img'
            mode='widthFix'
            style={{height:'auto'}}
          > 
          </Image> */}
          <Image
            src={bg2}
            className='img2'
            
          > 
          </Image>
          <View className='model_text'>{this.props.name}</View>
        </View>
      </View>
      
    )
  }
}
Index.defaultProps={
  name:'',
  url:'',
  bg:'',
  height:'',
  num:''
};

