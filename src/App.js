import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import NinjaArea from './components/NinjaArea';
import PostCard from './components/PostCard';
import PostDisplay from './components/PostDisplay';

class App extends Component {
  constructor(){
    super();
    this.state = {
      //fetching
      users: [],
      posts: [],
      //
      //postdisplay things
      currentUser: 'JM Fantin',
      currentBody: 'Welcome to Ninja Posts! \n\nBuilding this code was kind of painful, but also fun. \nI feel like I\'ve learned a lot from this challenge, so thanks for that :)',
      userValue: '',
      bodyValue: ''
      //postcard things

    }
  }
  
  componentDidMount(){
    this.fetchPostsData()
    this.fetchUsersData()
  }

  fetchPostsData(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }

  fetchUsersData(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }
  //POST DISPLAY
  handleUserChange = (e) => {
    this.setState({currentUser: e.value});
  }

  handleBodyChange = (e) => {
    this.setState({currentBody: e.value});
  }
  //POST DISPLAY

  updateDisplay(itemId){
    const _ = require('lodash');
    const {users, posts} = this.state;
    const clickedPost = _.filter(posts, { id: itemId });
    console.log('BODY', clickedPost[0].body);
    const uid = clickedPost[0].userId;
    const clickedPostAuthor = _.filter(users, { id: uid });
    console.log('AUTHOR', clickedPostAuthor[0].name)
    this.setState({currentBody: clickedPost[0].body, currentUser: clickedPostAuthor[0].name});
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const {posts} = this.state

    return(
      <View style={[custom.screen, {height: height, width: width}]}>
        
        <View style={custom.leftSection}>
          <NinjaArea/>
          <PostDisplay
            handleBodyChange={this.handleBodyChange.bind(this)}
            handleUserChange={this.handleUserChange.bind(this)}
            currentUser={this.state.currentUser}
            currentBody={this.state.currentBody}
          />
        </View>
        
        <View style={custom.rightSection}>
          <ScrollView>
            <FlatList
              style={{ marginTop: 20 }}
              data={posts}
              numColumns={1}
              renderItem={({ item, index }) => (
                <PostCard title={item.title} body={item.body}
                  onPress={this.updateDisplay.bind(this,item.id)}
                />
                //todo: onpress dessa coisa
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
  }
});

export default App;
