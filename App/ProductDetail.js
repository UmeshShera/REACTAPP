import React,{ Component } from "react";
import { View,Text, ScrollView,Dimensions,Image} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Constant from './Constant';
import AsyncStorage from '@react-native-community/async-storage';
const axios =require("axios").default;

const deivceWidth=Math.round(Dimensions.get("window").width);

export default class ProductDetail extends Component {

    constructor(props){
        super(props)
        this.state={
            productID:this.props.route.params.product_id,
            additional_info:'',
            product_info:'',
            related_products:[],

        }
    }
    
    componentDidMount(){

        console.log("DATA>>>>>",user)
        
     this.getProductDetail();

    }

getProductDetail(){

axios.post(Constant.BaseURl+'productdetail?', {
    product_id: this.state.productID,
    user_id:20
})
 .then(response => {
    
     if(response.data.success==true){
     
        var responseData=response.data;
        var data=responseData.data;
        this.setState({additional_info:data.additional_info}); 
        this.setState({product_info:data.product_info}); 
        this.setState({related_products:data.related_products}); 
        
        console.log('RES....',data);
    
     }
     else
     console.error("PARAM.....ERROR")
     
 })
 .catch(error=> {
     debugger
   console.log(error);
  });

}
    render(){
        const {navigate}=this.props.navigation;
        return(
            <ScrollView style={{flex:1,flexDirection:'column'}}>
           
           <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
           
           <Text style={{color:'red',fontWeight:'bold',fontSize:16}}>
               {this.state.additional_info.brand}
           </Text>
           
           <Text style={{color:'black',fontSize:14}}>{this.state.additional_info.category}
           </Text>
           </View>
           
           <View style={{marginLeft:10,marginRight:10,marginTop:10}}>
            <Text style={{justifyContent:'center',textAlign:'center',fontSize:20}}> Product INfo:</Text>
            <Text style={{color:'green'}}>{"Availability: "}{this.state.product_info.availability}</Text>
            <Text style={{marginTop:10}}>{"Name: "+this.state.product_info.name}</Text>
            <Image style={{marginTop:10,backgroundColor:'gray',width:deivceWidth,height:(deivceWidth/2)}}source={{uri:this.state.product_info.image}}></Image>
             <Text style={{marginTop:10}}>{"Price: "+this.state.product_info.price}</Text>
             <Text style={{marginTop:10}}>{"Description: "+this.state.product_info.description}</Text>
           </View>
             <Text style={{marginTop:10,fontSize:16,fontWeight:'700'}}>Related Product:</Text>
            
            <FlatList 
          
            horizontal={true}
            style={{marginTop:10}}
            data={this.state.related_products}
            renderItem={({item})=>
           <TouchableOpacity onPressOut={()=>navigate("ProductDetail",{product_id:item.id})}>

            <View style={{flexDirection:'column',borderRadius:3,padding:5,backgroundColor:'parpal'}}>
               <Text>{item.name}</Text>
               <Image style={{marginTop:10,width:(deivceWidth/3),height:(deivceWidth/3)}}
               source={{uri:item.image}}/>
            </View>
               </TouchableOpacity>
          }

          keyExtractor={item=>item.id}>

            </FlatList>
            </ScrollView>
        )
    }
}