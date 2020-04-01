

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  Image,
  FlatList
} from 'react-native';
 import {createAppContainer} from 'react-navigation'
 import {createStackNavigator} from 'react-navigation-stack'
 import {createDrawerNavigator} from 'react-navigation-drawer'

import bgImage from './src/ImagePizza/backG4.jpeg'
import logo from './src/ImagePizza/logo.jpeg'
import peperoni from './src/ImagePizza/Peperoni.jpeg'
import hawaiana from './src/ImagePizza/Hawaiana.jpeg'


/* ------------- Seccion del LogIn*/

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
 /* ----------------------------------> Formulario de registro de usuario */
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
          <TouchableHighlight style={styles.formButton} onPress={()=>navigation.push('Menu')}>
              <Text style={styles.formText}> Registrar </Text>
          </TouchableHighlight>
    </View>
   )
  }

 formulario.navigationOptions ={
   title: 'Registro'
 }

 /* ---------------------------------------> Seccion de Menu */
 class principal extends Component {
  render () {
 ({navigation})
   return (
     <View style={styles.main}>
      <FlatList 
        data={[
          {
           nombre: 'peperoni',
           source: 'peperoni',
          },
          {
           nombre: 'hawaiana',
           source: 'hawaiana'
          }
        ]}
        renderItem={({item})=> <Image>{item.source}</Image>}
      />
     </View>
   )
  }
 }
/* ------------------------------> Seccion de React-Navigation */ 
  const AppNavigator  = createStackNavigator({
    Home:{
      screen: sign
    },
    Registro: {
      screen: formulario
    },
    Menu:{
      screen: principal
    }
  },{initialRouteName: 'Home'})

  export default createAppContainer(AppNavigator)
  
/*  ------------------------------------------> StyleSheet*/

styles = StyleSheet.create({
  pizza:{
   height: 200,
   width: 200
  },
  main:{
   width: 100,
   height: 100, 
   backgroundColor: 'red',
   alignItems: 'center'
  },
 /* Estilos de logIn y Formulario */ 
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
