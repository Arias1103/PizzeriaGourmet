

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';
 import {createAppContainer} from 'react-navigation'
 import {createStackNavigator} from 'react-navigation-stack'

import bgImage from './src/ImagePizza/backG.jpeg'

const sign =({navigation}) => {
  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}> 

     <View style={styles.container}>
       <Text style={styles.title}> Pizzeria Gourmet </Text>
       <Text style={styles.subTitle}> Restuarante Italiano</Text>
     </View>

   <View style={styles.container}>
      <View>
         <TouchableHighlight style={styles.logIn} onPress={()=>navigation.push('Registro')}>
         <Text style={styles.buttonT}> Registrarse </Text>
         </TouchableHighlight>
      </View>

      <View>
         <TouchableHighlight style={{...styles.logIn, backgroundColor:'#123E9C'}} onPress={()=>navigation.push('Registro')}>
         <Text style={{...styles.buttonT, color: 'white'}}> Entrar con facebook </Text>
         </TouchableHighlight>
      </View>
   </View>
  </ImageBackground>

  )
}

sign.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#FCF3CF'
  },
 headerTintColor: '#222'
}
  const formulario =({navigation})=>{  
   return(
     
         <View style={styles.container}> 
           <TextInput  placeholder='Usuario'/>
         </View>
   )
  }

 formulario.navigationOptions ={
   title: 'Registro'
 }

  const AppNavigator  = createStackNavigator({
    Home:{
      screen: sign
    },
    Registro: {
      screen: formulario
    },
  },{initialRouteName: 'Home'})

  export default createAppContainer(AppNavigator)
  

styles = StyleSheet.create({
  logIn:{
  height: 70,
  width: 300,
  padding: 15,
  borderRadius: 50,
  backgroundColor: 'white',
  justifyContent: 'center',
  marginVertical: 5
  },
  buttonT: {
color: 'blue',
fontSize: 30,
textAlign: 'center'
  },
  subTitle:{
    color: 'white',
    fontSize: 30,
  },
  title: {
   color: 'white',
   fontSize: 50,
   fontFamily: "AppleSDGothicNeo-Bold",
   fontWeight: "bold"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  backgroundContainer: {
    flex: 2,
    width: null,
    height: null,
    opacity: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  }
})
