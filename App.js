

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  Image,
  FlatList,
  Button,
  Alert,
} from 'react-native';
 import {createAppContainer} from 'react-navigation'
 import {createStackNavigator} from 'react-navigation-stack'
 import {FontAwesome} from '@expo/vector-icons'

import bgImage from './src/ImagePizza/backG4.jpeg'
import logo from './src/ImagePizza/logo.jpeg'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          <Text style={styles.buttonT}> Inicia </Text>
          </TouchableHighlight>
       </View>

       <View>
          <TouchableHighlight style={{...styles.logIn, backgroundColor:'#123E9C'}} onPress={()=>navigation.navigate('Menu')}>
          <Text style={{...styles.buttonT, color: 'white'}}> Facebook </Text>
          </TouchableHighlight>
       </View>
    </View>
  </ImageBackground>
  )
}

sign.navigationOptions = {
  title: 'Bienvenuto',
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
          <View style={styles.formIn}>
             <TouchableHighlight style={styles.formButton} onPress={()=>navigation.navigate('Menu')}>
                 <Text style={styles.formText}> Registrar </Text>
             </TouchableHighlight>

              <TouchableHighlight style={styles.formButton} onPress={()=>navigation.navigate('Menu')}>
                 <Text style={styles.formText}> Entrar </Text>
              </TouchableHighlight>
          </View>
     </View>
   )
  }

   formulario.navigationOptions ={
   title: 'Registro'
 }

 /* -------------------------------------------------------------------------------------> Seccion de Menu */
 class principal extends React.Component{
   state ={
     loading: true,
     datos: [],
   }

   constructor(props){
     super(props)
    this.fetchDatos()
   }

   fetchDatos = async()=>{
     const response = await fetch('https://jsonplaceholder.typicode.com/photos')
     const pre = await response.json()
     const datos = pre.map(x=>({...x, key: x.id}))
     this.setState({datos, loading: false})
   }
  render(){
    const {loading,datos}=this.state
    if(loading){
      return (<View style={styles.containerLoad}>
        <Text>Cargando ..</Text>
        </View>
      )
    }
    const pressHandler = () => {
      Alert.alert('Pedido', 'Presiona aceptar si deseas pedir esta pizza',[
      {text: 'Aceptar', onPress:()=>Alert.alert('Tu pedido esta en proceso')},
      {text: 'Cancelar', onPress:()=>Alert.alert('El pedido ha sido cancelado')}
    ])
    }
   return ( 
  <ImageBackground source={bgImage} style={styles.MenuContainer}>
     <View style={styles.headerMenu}>
       <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer}>
         <FontAwesome name='bars' size={35} color='black'/>
       </TouchableHighlight>
     </View>
       <View>
        <Text style={styles.MenuText}> Elige tu pizza!! </Text>
          <FlatList data={datos} renderItem={({item})=>
          <TouchableOpacity style={styles.itemRender} onPress={()=> pressHandler()}>
              <Image style={{width: 100, height: 100}} source={{uri:item.url}}/>
              <View style={styles.description}>
                  <Text> Pizza: {item.title}</Text>
                  <Text> Ingredientes </Text>
              </View>
          </TouchableOpacity>}/>
      </View>
 </ImageBackground>

   )
  }
}
/*  Screen Administrador **************************************************************************************/

class Modify extends React.Component {
  state ={
    loading: true,
    datos: [],
  }

  constructor(props){
    super(props)
   this.fetchDatos()
  }

  fetchDatos = async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    const pre = await response.json()
    const datos = pre.map(x=>({...x, key: x.id}))
    this.setState({datos, loading: false})
  }
  render() {
    const {loading,datos}=this.state
    if(loading){
      return (<View style={styles.containerLoad}>
        <Text>Cargando ..</Text>
        </View>
      )
    }

    return(
    <View style={styles.MenuContainer}>
      <View style={styles.headerMenu}>
        <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer}>
          <FontAwesome name='bars' size={35} color='black'/>
        </TouchableHighlight>
       </View>
       <FlatList data={datos} renderItem={({item})=>
          <View style={styles.itemRender}>
              <Image style={{width: 100, height: 100}} source={{uri:item.url}}/>
              <View style={styles.description}>
                  <Text> Pizza: {item.title}</Text>
                 <Button
                  title="Modificar"
                  />
              </View>
          </View>}/>
               
       </View>
    )
  }
}
class Add extends React.Component{
  render(){
    return(
      <View style={styles.MenuContainer}>
       <View style={styles.headerMenu}>
        <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer} >
          <FontAwesome name='bars' size={35} color='black'/>
        </TouchableHighlight>
       </View>
       <View>
         <Text style={styles.MenuText}>Nueva Pizza</Text>
       </View>
       <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}> Añade un producto </Text>
       </View>
       <View style={styles.container}>
          <TextInput style={styles.form} placeholder='Nombre de la pizza'/>
          <TextInput style={styles.AddStyle} placeholder='Descripcion'/>

          <TextInput style={{...styles.form, width:100 }} placeholder='Precio'/>
          <TouchableHighlight style={styles.formButton} onPress={()=>navigation.navigate('Menu')}>
              <Text style={styles.formText}> Añadir </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
class Delete extends React.Component{
  state ={
    loading: true,
    datos: [],
  }

  constructor(props){
    super(props)
   this.fetchDatos()
  }

  fetchDatos = async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    const pre = await response.json()
    const datos = pre.map(x=>({...x, key: x.id}))
    this.setState({datos, loading: false})
  }
  render() {
    const {loading,datos}=this.state
    if(loading){
      return (<View style={styles.containerLoad}>
        <Text>Cargando ..</Text>
        </View>
      )
    }

    return(
    <View style={styles.MenuContainer}>
      <View style={styles.headerMenu}>
        <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer} >
          <FontAwesome name='bars' size={35} color='black'/>
        </TouchableHighlight>
       </View>
       <FlatList data={datos} renderItem={({item})=>
          <View style={styles.itemRender}>
              <Image style={{width: 100, height: 100}} source={{uri:item.url}}/>
              <View style={styles.description}>
                  <Text> Pizza: {item.title}</Text>
                 <Button
                  title="Eliminar"
                  />
              </View>
          </View>}/>            
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
  },{initialRouteName: 'Home'})

  const RootLog = createDrawerNavigator({
    Registro: AppNavigator,
    Eliminar:{
      screen: Delete
    },
    Añadir:{
       screen: Add
    },
    Modificar:{
      screen: Modify
      },
    Menu:{
    screen: principal
    },
  })

  export default createAppContainer(RootLog)



/*  ------------------------------------------> StyleSheet*/

styles = StyleSheet.create({
   AddStyle:{
    height:80,
    width:300,
    borderRadius:20,
    marginVertical: 10,
    padding: 15,
    borderColor: 'black',
    borderWidth: 2
   },
   AdminOptions: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 15
   },
   OptionsList:{
    fontSize: 25,
    color: 'blue'
   },
   description:{
    flexDirection: 'column', 
    flex:1, 
    alignItems: 'center',
    justifyContent: 'space-around'
   },
   itemRender:{ 
     flex:1,
     flexDirection: 'row',
     marginBottom: 10,
     marginVertical: 5,
     opacity: 0.7,
     backgroundColor: '#E2EEE6',
   },
   burguerBottom:{
    alignItems: 'flex-start',
    marginTop: 35,
    width: null
  },
  MenuContainer:{
    flex: 1,
    opacity: 10,
    resizeMode: 'contain',
    padding: 7,
  },
  MenuText:{
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 15,
    marginTop: 10,
    padding: 10,
    opacity: 0.8,
    backgroundColor: '#343332',
    borderRadius: 50
  },
  containerLoad:{
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
 /* Estilos de logIn y Formulario */ 
 logoText:{
   color: 'black',
   fontSize: 25,
   fontWeight: '500',
   marginTop: 10,
   opacity: 0.5
 },
 logo:{
   width: 150,
   height: 150,
   borderRadius: 100
 },
 logoContainer:{
    alignItems: 'center',
    marginVertical: 20
 },
 formText:{
   textAlign: 'center',
   fontSize: 15,
   color: '#123E9C'
 },
 formIn:{
   flexDirection: 'row'
 },
 formButton:{
   height: 60,
   width: 100,
   marginTop:5 
  },
 form:{
   height:50,
   width:300,
   borderRadius:50,
   marginVertical: 10,
   padding: 15,
   borderColor: 'black',
   borderWidth: 2
 },
 logIn:{
    height: 70,
    width: 250,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'black',
    borderWidth:2
  },
  buttonT: {
    color: '#123E9C',
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
