import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class PostDisplay extends Component {
  constructor(){
    super();
    this.state = {
      user: '',
      details: ''
    }
  }

  render() {
    return(
      
          <View style={custom.postDisplay}>
            <Text style={{color: 'white'}}>
              Post info goes here.
            </Text>
          </View>
    );
  }
}

const custom = StyleSheet.create({
  postDisplay:{
    flex: 4
  }
});

export default PostDisplay;
