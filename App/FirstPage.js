
import React,{Component,useEffect } from "react";
import { View, Text,TouchableOpacity,FlatList,
    StyleSheet,Image, Dimensions,Alert } from "react-native";
    import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Constant from './Constant'
const axios = require('axios').default;
const displayWidth=Math.round(Dimensions.get('window').width);
//import messaging from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

export default class FirstPage extends Component {

    constructor(props){
        super(props)
       
    }
   
    state={
        populardata:[],
    };
    
    componentDidMount(){

        messaging().getToken().then(token => {
          console.log(token);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            alert(remoteMessage)
          });

          messaging().onMessage(async onMessageReceived=>{
            alert(JSON.parse(onMessageReceived));
          });

        this.getData();

        // NetInfo.fetch().then(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
            
        //     if(state.isConnected)
           

        //   });


    }

    getData(){

        axios.post(Constant.BaseURl+'popularproducts?',{
        page: 1,
        limit: 6
    })
     .then(response=> {

         if(response.data.success==true){
         
            var responseData=response.data;
            var data=responseData.data;
            this.setState({populardata:data}); 
            
                console.log('RES....',this.state.populardata);
        
         }
         else
         console.error("PARAM.....ERROR")
         
     })
     .catch(error=> {
         debugger
       console.log(error);
      });
}
gotoNextActivity(item){
    const {navigate}=this.props.navigation;
    AsyncStorage.setItem("item",JSON.stringify(item));
    navigate("ProductDetail",{product_id:item.id})
}
    render(){
    
        const {navigate}=this.props.navigation;
        
        return(<View style={{flex:1}}>
        
             <FlatList
            data={this.state.populardata}
             renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>this.gotoNextActivity(item)}>
                <View style={styles.item}>
                    <View>
                        <Image style={{width:displayWidth/3,height:displayWidth/3}}
                        source={{uri:item.image}}></Image>
                    </View>

                <Text style={{marginLeft:10}}>
                    {item.name}
                </Text>
            </View>
            <View style={{height:1,backgroundColor:'gray'}}></View>
           </TouchableOpacity>
        )}
    
        keyExtractor={item => item.id}
      />
        
        </View>)
    }
}

  const styles = StyleSheet.create({

    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection:'row'
    },
    title: {
      fontSize: 32,
    },
  });