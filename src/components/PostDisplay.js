import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const PostDisplay = (props) => {
  return(
    <View style={custom.postDisplay}>
      <View style={custom.upperSection}> 
        <Text style={custom.authorLabel}>
          Author
        </Text>
        <Text style={custom.authorName}>
          {props.currentUser}
        </Text>
      </View>
      <View style={custom.lowerSection}> 
        <TextInput
          style={[custom.postInput, {fontWeight:'bold', height:"20%"}]}
          onChangeText={props.handleTitleChange}
          value={props.currentTitle}
          multiline={true}
        />
        <TextInput
          style={[custom.postInput, {height:"80%"}]}
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
    justifyContent: 'space-between',
    backgroundColor: '#D1D4DC'
  },
  upperSection:{
    flex: 1,
  },
  lowerSection:{
    flex: 5,
  },
  authorLabel:{
    alignSelf: 'flex-end',
    textAlign: 'center',
    fontSize: 18,
    color: '#23342B'
  },
  authorName:{
    height: 40, 
    width: "100%", 
    alignSelf: 'flex-end', 
    textAlign :'right', 
    fontSize: 20, 
    fontWeight: 'bold'
  },
  postInput:{
    width: "100%", 
    fontSize: 20
  }
});

export default PostDisplay;