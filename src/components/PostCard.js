
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default class CardSalaVotacao extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { status, mensagem, titulo, onPress } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.content}>
            <View>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
                {titulo}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode='tail'>
                {mensagem}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    flexGrow: 1,
    margin: 10,
    width: "90%",
    backgroundColor: "#BDDF7A",
  },
  content: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    minHeight: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#7EBC0A'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    marginRight: 5,
    fontWeight: 'bold',
    color: "white",
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'normal',
    color: "white",
    marginRight: 5
  },
});

