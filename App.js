

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Modal,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
 import {createAppContainer} from 'react-navigation'
 import {createStackNavigator} from 'react-navigation-stack'

import bgImage from './src/ImagePizza/backG4.jpeg'
import logo from './src/ImagePizza/logo.jpeg'

const sign =({navigation}) => {
  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}> 

   <View style={styles.container}>
       <View style={styles.logoContainer}>
           <Image source={logo} style={styles.logo} />
           <Text style={styles.logoText}>Hazlo Gourmet</Text>
       </View>
   
      <View>
         <TouchableHighlight style={styles.logIn} onPress={()=>navigation.push('Registro')}>
         <Text style={styles.buttonT}> Registrarse </Text>
         </TouchableHighlight>
      </View>

      <View>
         <TouchableHighlight style={{...styles.logIn, backgroundColor:'#123E9C'}} onPress={()=>navigation.push('Registro')}>
         <Text style={{...styles.buttonT, color: 'white'}}> facebook </Text>
         </TouchableHighlight>
      </View>
   </View>
  </ImageBackground>

  )
}

sign.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: 'white'
  },
 headerTintColor: 'black'
}
  const formulario =({navigation})=>{  
   return(
    <View style={styles.container}> 
      <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>Hazlo Gourmet</Text>
       </View>
          <TextInput style={styles.form} placeholder='E-mail'/>
          <TextInput style={styles.form} placeholder='Contraseña'
           secureTextEntry={true}
          />
          <TouchableHighlight style={styles.formButton}>
              <Text style={styles.formText}> Registrar </Text>
          </TouchableHighlight>
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
 logoText:{
  color: 'black',
  fontSize: 30,
  fontWeight: '500',
  marginTop: 10,
  opacity: 0.5
 },
 logo:{
 width: 200,
 height: 200,
 borderRadius: 100
 },
 logoContainer:{
   alignItems: 'center',
   marginVertical: 20
 },
 formText:{
  textAlign: 'center',
  fontSize: 15,
  color: 'blue'
 },
 formButton:{
   height: 60,
   width: 100,
   justifyContent: 'center',
   borderColor: 'black',
   borderRadius: 50,
   borderWidth: 2,
   marginVertical: 20
  },
 form:{
   height:70,
   width:400,
   borderRadius:50,
   marginVertical: 10,
   padding: 15,
   borderColor: 'black',
   borderWidth: 2
 },
 logIn:{
    height: 70,
    width: 300,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'black',
    borderWidth:2
  },
  buttonT: {
    color: 'blue',
    fontSize: 25,
    textAlign: 'center'
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
