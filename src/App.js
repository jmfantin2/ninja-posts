import React, { Component } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import NinjaArea from './components/NinjaArea';
import PostCard from './components/PostCard';
import PostDisplay from './components/PostDisplay';

class App extends Component {
  constructor(){
    super();
    this.state = {
      //fetching and keeping
      users: [],
      posts: [],
      //postdisplay things
      currentUser: 'placeholder user',
      currentBody: 'placeholder body',
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
    fetch('https://jsonplaceholder.typicode.com/posts')
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
                <PostCard title={item.title} body={item.body}/>
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
