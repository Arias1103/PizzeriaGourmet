/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

import bgImage from './src/ImagePizza/backG.jpeg'
 
class App extends React.Component {
  state ={
    visible: false,
  }

 handlePress =()=> {
  this.setState({visible: !this.state.visible})
 
 }
  
  render() {
  return (

  <ImageBackground source={bgImage} style={styles.backgroundContainer}> 

     <View style={styles.container}>
       <Text style={styles.title}> Pizzeria Gourmet </Text>
       <Text style={styles.subTitle}> Restuarante Italiano</Text>
     </View>

   <View style={styles.container}>
      <View>
         <TouchableHighlight style={styles.logIn} onPress={this.handlePress}>
         <Text style={styles.buttonT}> Log In </Text>
         </TouchableHighlight>
      </View>

      <View>
         <TouchableHighlight style={{...styles.logIn, backgroundColor:'#123E9C'}} onPress={this.handlePress}>
         <Text style={{...styles.buttonT, color: 'white'}}> In with facebook </Text>
         </TouchableHighlight>
      </View>
   </View>

     <Modal animationType='slide' visible={this.state.visible}>
         <View style={styles.container}> 
            <TouchableHighlight style={styles.logIn} onPress={this.handlePress}>
             <Text style={styles.buttonT}> back </Text>
            </TouchableHighlight> 
         </View>
      </Modal>

  </ImageBackground>
  )
  }
}

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

export default App;