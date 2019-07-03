import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import NinjaArea from './components/NinjaArea';
import PostCard from './components/PostCard';
import PostDisplay from './components/PostDisplay';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: [],
    }
  }
  
  componentDidMount(){
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


  render() {
    const {height, width} = Dimensions.get('window');
    const {posts} = this.state

    return(
      <View style={[custom.screen, {height: height, width: width}]}>
        
        <View style={custom.leftSection}>
          <NinjaArea/>
          <PostDisplay/>
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
