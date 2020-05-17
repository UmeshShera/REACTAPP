
import React,{ Component } from "react";
import { View, Text,TouchableOpacity } from "react-native";

export default class SecondPage extends Component{
    
    render(){
        const{navigate}=this.props.navigation;
        return(
            <View>
                <Text>
                    This is Second Page
                </Text>
                <TouchableOpacity onPressOut={()=>this.props.navigation.goBack()}>
                    <Text>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>    
        )
    }
}