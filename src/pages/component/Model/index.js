import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
// import { AtIcon } from 'taro-ui'
// import img from './img/test2.jpg'
import './index.less'


export default class Index extends Component {
  constructor(props){
    super(props);
    if(props.bg==='test'){
      this.background = './img/test2.jpg'
    }else if(props.background==='test2'){

    }else{

    }
   
  }
  componentWillMount () { }

  componentDidMount () { 
    
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  model=()=>{
    console.log(this.props.url);
  }
  render () {
    const bg = this.background;
    return (
      <View 
        className='model' 
        onClick={this.model.bind(this)}
      >
        <Image
          src={bg}
          className='model_img' 
        >
        </Image>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}
Index.defaultProps={
  name:'',
  url:'',
  bg:''
};

