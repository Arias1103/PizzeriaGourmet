import React, {Component} from 'react'
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
  KeyboardAvoidingView,
} from 'react-native';
import * as Permissions from 'expo-permissions'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {FontAwesome} from '@expo/vector-icons'
import Constants from 'expo-constants';
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import bgImage from './src/ImagePizza/backG4.jpeg'
import logo from './src/ImagePizza/logo.jpeg'
import AddButton from './src/ImagePizza/Add.jpeg'
import product from './src/ImagePizza/Peperoni.jpeg'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  title: 'Bienvenido',
    headerStyle: {
    backgroundColor: 'white'
  },
    headerTintColor: 'black'
}
 /* ----------------------------------> Formulario de registro de usuario */
  const formulario =({navigation})=>{  
   return(
     <KeyboardAvoidingView
     style={{flex: 1}}
     behavior="padding">
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
     </KeyboardAvoidingView>
 
   )
  }
   
   formulario.navigationOptions ={
   title: 'Registro'
 }

 /* -------------------------------------------------------------------------------------> Seccion de Menu */
 class principal extends React.Component{
   state = { 
     loading: true,
     datos: [],
     location: null,
     errorMessage: null,
   }
   
   constructor(props){
     super(props)
    this.fetchDatos()
   }

   fetchDatos = async()=>{
     const response = await fetch('http://192.168.20.195:5003/Api/Product');
     const pre = await response.json();
     const datos = pre.map(x=> ({...x, key:(x.id)}));
     this.setState({datos, loading: false});
     console.log(datos);
   }

   getLocation = async()=>{
    const{status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== "granted"){
      return this.setState({errorMessage: "Los permisos no fueron aceptados"})
    }
    const location = await Location.getCurrentPositionAsync();
    console.log("Loctaion", location)
  }
  render(){
    const {loading,datos}=this.state
    if(loading){
      return (<View style={styles.containerLoad}>
        <Text>Cargando ..</Text>
        </View>
      )
    }
   return ( 
  <ImageBackground source={bgImage} style={styles.MenuContainer}>
     <View style={styles.headerMenu}>
       <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer}>
         <FontAwesome name='bars' size={35} color='black'/>
       </TouchableHighlight>
     </View>
       <View>
        <Text style={styles.MenuText}> Elige tu pedido </Text>
          <FlatList data={datos} renderItem={({item})=>
          <TouchableOpacity style={styles.itemRender} 
              onPress={this.getLocation} title="Solicitar ubicacion">
              <Image source={{uri: `data:image/png;base64,${item.image}`}} style={{height: 100, width: 100}}/>
              <View style={styles.description}>
                  <Text> Pizza:{item.name}</Text>
                  <Text> Ingredientes:{item.description} </Text>
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
    const response = await fetch('http://192.168.20.195:5003/Api/Product')
    const pre = await response.json()
    const datos = pre.map(x=> ({...x, key:  (x.id)}));
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
              <Image source={{uri: `data:image/png;base64,${item.image}`}} style={{height: 100, width: 100}}/>
              <View style={styles.description}>
                  <Text> Pizza: {item.name}</Text>
                  <Text> Ingredientes:{item.description} </Text>
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

  state = {
    photo: null
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('se necesita el permiso, para usar la galeria!');
      }
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.uri) {
        this.setState({ photo: result});
      }

      console.log("result", result);
    } catch (E) {
      console.log(E);
    }
  };
  render(){
    const {photo} = this.state
    return(
      <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding">
      <View style={styles.MenuContainer}>
       <View style={styles.headerMenu}>
        <TouchableHighlight style={styles.burguerBottom} onPress={this.props.navigation.openDrawer} >
          <FontAwesome name='bars' size={35} color='black'/>
        </TouchableHighlight>
       </View>
       <View>
         <Text style={{...styles.MenuText, backgroundColor:
        'gray', color: 'white'}}>Nuevo producto</Text>
        </View>
       <View style={styles.logoContainer}>
          {photo && (
            <Image 
            source={{uri: photo.uri}}
            style={{height: 250, width: 250, borderRadius: 35}} 
            />
            )
          }
       </View>
       <View style={styles.container}>
       <Button title= " Seleccionar una foto" onPress={this.pickImage}/>
          <TextInput style={styles.form} placeholder='Nombre de la pizza'/>
          <TextInput style={styles.AddStyle} placeholder='Descripcion'/>

          <TextInput style={{...styles.form, width:100, textAlign:'center' }} placeholder='Precio'/>
          <TouchableHighlight style={styles.formButton} onPress={()=>navigation.navigate('Menu')}>
              <Text style={styles.formText}> Añadir </Text>
          </TouchableHighlight>
        </View>
      </View>
      </KeyboardAvoidingView>
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
    const response = await fetch('http://192.168.20.195:5003/Api/Product')
    const pre = await response.json()
    const datos = pre.map(x=> ({...x, key: (x.id)}));
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
              <Image source={product} style={{height: 100, width: 100}}/>
              <View style={styles.description}>
                  <Text> Pizza: {item.name}</Text>
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
    flex:3, 
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
