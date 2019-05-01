import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>귀여운 To Do 앱</Text>

        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={"새로운 할일"}/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50,
    fontWeight: "200",
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
});
