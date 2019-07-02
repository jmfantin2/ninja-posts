import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {ScrollView, TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native';

//todo: fundo tá feio

class App extends Component {
  state = {color:''}
  render() {
    const {height, width} = Dimensions.get('window');
    return(
      <ScrollView style={custom.screen}>
        <TouchableOpacity style={custom.post}>
          <Text>
            oi
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const custom = StyleSheet.create({
  screen:{
    flex: 1, 
    flexDirection: 'column',
  },
  post:{
    backgroundColor:'#ebeef0',
    flex:1,
    alignItems:'center'
  },
  label:{
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }
});

export default App;
