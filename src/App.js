import React, { Component } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './App.css';
import PostCard from './components/PostCard';

class App extends Component {

  state = {
    greeting: 'Hey. What\'s up?',
    ninjaClickCount: 0
  }

  componentWillMount(){
    this.animatedValue = new Animated.Value(0);
  }
  
  componentDidMount(){
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 3000
    }).start();
  }

  onNinjaPress = () => {
    this.setState(prevState => 
      ({ninjaClickCount: prevState.ninjaClickCount + 1})
    );
    if(this.state.ninjaClickCount < 3){
      this.setState({
        greeting: 'Exactly.'
      });
    } else if (this.state.ninjaClickCount < 6) {
      this.setState({
        greeting: 'You should stop now.'
      });
    } else {
      this.setState({
        greeting: 'Uhh.. why don\'t you try \nclicking the buttons on your right?'
      });
    }
  }


  render() {
    const {height, width} = Dimensions.get('window');

    const interpolateNinjaOpacity = this.animatedValue.interpolate({
      inputRange: [50,100],
      outputRange: [0, 1]
    });

    const animatedNinja = {
      opacity: interpolateNinjaOpacity
    }

    return(
      <View style={[custom.screen, {height: height, width: width}]}>
        
        <View style={custom.leftSection}>
          <View style={[custom.ninjaArea, animatedNinja]}>
            <Animated.Text style={[custom.ninjaGreeting, animatedNinja]}>
              {this.state.greeting}
            </Animated.Text>
            <View style={custom.ninjaSpot}>
              <TouchableOpacity
              onPress={this.onNinjaPress}>
                <Animated.Image 
                  source={require('./assets/ninja.png')} 
                  style={[{width: 145, height: 81}, animatedNinja]}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={custom.postDisplay}>
            <Text style={{color: 'white'}}>
              Post info goes here.
            </Text>
          </View>
        </View>
        
        <View style={custom.rightSection}>
          <ScrollView>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
            <PostCard titulo={"Hardcoded"} mensagem={"Please Stand by"}/>
          </ScrollView>
        </View>

      </View>
    );
  }
}

const custom = StyleSheet.create({
  screen:{
    flex: 1,
    backgroundColor: "#383838",
    flexDirection: 'row'
  },
  leftSection:{ 
    flex: 1,
  },
  rightSection:{ 
    flex: 1,
  },
  ninjaArea:{
    flex: 1,
    flexDirection: 'row'
  },
  ninjaGreeting:{
    flex: 3,
    color: 'white',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'right'
  },
  ninjaSpot:{
    flex: 1
  },
  postDisplay:{
    flex: 4
  }
});

export default App;
