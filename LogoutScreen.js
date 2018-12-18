import React, { Component } from 'react';
import { Constants } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';


import { observer, inject } from 'mobx-react';


@inject('appStore')
@observer
export default class LogoutScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: 'ali',
      password: 'userPassword',
      loading: false,
      error: ''
    };
  }


  async componentWillMount() {
    this.signOutAsync();
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.paragraph}>
          Logout...
        </Text>
      </View>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.removeItem('isLogged');

    const user = this.props.appStore.currentUser;
    user.logout(this.state.userName);
   
      


    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
