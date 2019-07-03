import React, { Component } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import './App.css';
import PostCard from './components/PostCard';

class App extends Component {
  constructor(){
    super();
    this.state = {
      greeting: 'Hey. What\'s up?',
      ninjaClickCount: 0,
      users: [],
      posts: [],
    }
  }

  componentWillMount(){
    this.animatedValue = new Animated.Value(0);
  }
  
  componentDidMount(){
    //animated API declaration
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 3000
    }).start();
    //fetch user and post data
    this.fetchPostsData()
    this.fetchUsersData()
  }

  fetchPostsData(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }

  fetchUsersData(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }


  onNinjaPress = () => {
    this.setState(prevState => 
      ({ninjaClickCount: prevState.ninjaClickCount + 1})
    );
    if(this.state.ninjaClickCount < 1){
      this.setState({
        greeting: 'Exactly.'
      });
    } else {
      this.setState({
        greeting: 'Uhh.. why don\'t you try clicking the buttons on your right?'
      });
    }
  }


  render() {
    const {height, width} = Dimensions.get('window');
    const {posts} = this.state
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
          <View style={custom.postDisplay}>
            <Text style={{color: 'white'}}>
              Post info goes here.
            </Text>
          </View>
        </View>
        
        <View style={custom.rightSection}>
          <ScrollView>
            <FlatList
              style={{ marginTop: 20 }}
              data={posts}
              numColumns={1}
              renderItem={({ item, index }) => (
                <PostCard title={item.title} body={item.body}/>
                //todo: onpress dessa coisa
                //todo: limitar linhas
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
