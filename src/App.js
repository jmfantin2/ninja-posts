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
      currentUser: 'Leanne Graham',
      currentTitle: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      currentBody: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      userValue: '',
      bodyValue: '',
      //PostCard attributes
      lastCardPressed: 1
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
  
  handleTitleChange = (value) => {
    this.setState({currentTitle: value});
  }

  handleBodyChange = (value) => {
    this.setState({currentBody: value});
  }

  //Sends the info which was previously displayed to its matching card 
  updateDisplay(itemId){
    if(itemId === this.state.lastCardPressed){
      return 
      //this statement prevents the method from running 
      //if the user didn't click on a different card
      //(I wanted the ninja to inform the user that he/she should choose another card)
      //(but i made him stateful, so I'm not gonna change it right now...)
    }
    this.applyPreviousChanges();

    //The Lodash dependency allowed me to filter the arrays with ease.
    const _ = require('lodash');
    const {users, posts} = this.state;

    //One information leads to another..
    const clickedPost = _.filter(posts, { id: itemId });
    const uid = clickedPost[0].userId;
    const clickedPostAuthor = _.filter(users, { id: uid });
    
    //Wrap everything up, finally
    this.setState({
      lastCardPressed: itemId,
      currentUser: clickedPostAuthor[0].name, 
      currentBody: clickedPost[0].body, 
      currentTitle: clickedPost[0].title
    });
  }

  //Manipulates the posts JSON and updates a single entry, which is the previously edited post.
  applyPreviousChanges(){
    let postsClone = JSON.parse(JSON.stringify(this.state.posts))
    //Here's something tricky: JSON indexing starts at 0, while the post IDs start at 1.
    const newTitle = this.state.currentTitle
    postsClone[this.state.lastCardPressed-1].title = newTitle;
    const newBody = this.state.currentBody
    postsClone[this.state.lastCardPressed-1].body = newBody;
    //That's why I had to use lastCardPressed-1.
    this.setState({posts: postsClone})
  }

  render() {
    //I wanted to color the background, so I needed the window dimensions
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