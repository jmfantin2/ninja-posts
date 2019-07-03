import React, { Component } from 'react';

import { 
  Animated, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  FlatList
} from 'react-native';

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
      mock: [{
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },{
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }]
    }
  }

  componentWillMount(){
    this.animatedValue = new Animated.Value(0);
  }
  
  componentDidMount(){
    //fetch user and post data
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(responseJson => {
      this.setState({ posts : responseJson})
    })

    console.log('Posts in state:', this.state.posts)
    //animated API declaration
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 3000
    }).start();
  }

  fetchData(){
    //posts  
    
    console.log('Users in state:', this.state.users)
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
        greeting: 'Uhh.. why don\'t you try clicking the buttons on your right?'
      });
    }
  }


  render() {
    const {height, width} = Dimensions.get('window');
    const {mock} = this.state
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
              data={mock}
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
