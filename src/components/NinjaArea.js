import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

class NinjaArea extends Component {
  constructor(){
    super();
    this.state = {
      greeting: 'Hey. What\'s up?',
      ninjaClickCount: 0,
    }
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
    if(this.state.ninjaClickCount > 1){
      this.setState({
        greeting: 'When you are done editing a post, just click another one.'
      })
    } else if(this.state.ninjaClickCount > 0){
      this.setState({
        greeting: 'Uhh.. why don\'t you try and click the tiles on your right?'
      });
    } else {
      this.setState({
        greeting: 'Yea I know it lags a bit, but you get the idea.'
      });
    }
  }

  render() {
    const interpolateNinjaOpacity = this.animatedValue.interpolate({
      inputRange: [50,100],
      outputRange: [0, 1]
    });

    const animatedNinja = {
      opacity: interpolateNinjaOpacity
    }

    return(
        <View style={[custom.ninjaArea]}>
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
    );
  }
}

const custom = StyleSheet.create({
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
});

export default NinjaArea;