import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const PostDisplay = (props) => {
  return(
    <View style={custom.postDisplay}>
      <View style={custom.upperSection}> 
        <Text style={custom.authorLabel}>
          Author
        </Text>
        <TextInput
          style={{height: 40, width: "100%", alignSelf: 'flex-end', textAlign :'right', fontSize: 20}}
          onChangeText={props.handleUserChange}
          value={props.currentUser}
        />
      </View>
      <View style={custom.lowerSection}> 
        <TextInput
          style={{height: "100%", width: "100%", fontSize: 20}}
          onChangeText={props.handleBodyChange}
          value={props.currentBody}
          multiline={true}
        />
      </View>
    </View>
  );
}

const custom = StyleSheet.create({
  postDisplay:{
    flex: 4,
    flexDirection: 'column',
    padding: 15,
    borderRadius: 10,
    margin: 100,
    minHeight: 85,
    justifyContent: 'space-between',
    backgroundColor: '#D1D4DC'
  },
  upperSection:{
    flex: 1,
    alignItems: 'right'
  },
  lowerSection:{
    flex: 5,
  },
  authorLabel:{
    alignSelf: 'flex-end',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#23342B'
  },
  postBody:{
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'normal',
    marginRight: 5,
    marginTop: 10
  },
});

export default PostDisplay;