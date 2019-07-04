import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import NinjaArea from './components/NinjaArea';
import PostCard from './components/PostCard';
import PostDisplay from './components/PostDisplay';

class App extends Component {
  constructor(){
    super();
    this.state = {
      //JSON attributes
      users: [],
      posts: [],
      //PostDisplay attributes
      currentUser: 'JM Fantin',
      currentTitle: 'Welcome to Ninja Posts!',
      currentBody: 'Building this code was kind of painful, but also fun. I feel like I\'ve learned a lot from this challenge, so thanks for that :)',
      userValue: '',
      bodyValue: '',
      //PostCard attributes
      lastClicked: -1
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
  
  handleTitleChange = (e) => {
    this.setState({currentTitle: e.value});
  }

  handleBodyChange = (e) => {
    this.setState({currentBody: e.value});
  }

  updateDisplay(itemId){
    const _ = require('lodash');
    const {users, posts} = this.state;
    const clickedPost = _.filter(posts, { id: itemId });
    const uid = clickedPost[0].userId;
    const clickedPostAuthor = _.filter(users, { id: uid });
    console.log('AUTHOR:', clickedPostAuthor[0].name)
    console.log('TITLE:', clickedPost[0].title);
    console.log('BODY:', clickedPost[0].body);
    this.setState({
      lastClicked: itemId,
      currentUser: clickedPostAuthor[0].name, 
      currentBody: clickedPost[0].body, 
      currentTitle: clickedPost[0].title
    });
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const {posts} = this.state

    return(
      <View style={[custom.screen, {height: height, width: width}]}>
        
        <View style={custom.leftSection}>
          <NinjaArea/>
          <PostDisplay
            handleTitleChange={this.handleTitleChange.bind(this)}
            handleBodyChange={this.handleBodyChange.bind(this)}
            currentUser={this.state.currentUser}
            currentTitle={this.state.currentTitle}
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
