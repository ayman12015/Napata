import React from 'react';

import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Content, Form } from 'native-base';
import { observer, inject } from 'mobx-react';
import Toast, { DURATION } from 'react-native-easy-toast';
import Expo from 'expo';

import { Field, RoundButton } from '../components/common/index';
import I18n from '../i18n/i18n';
import { colors } from '../config/colors';
// import axios from '../services/api/axios';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const { width } = Dimensions.get('window');


@inject('appStore')
@observer
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'usertest4',
      password: 'tester',
      loaging: false,
      error: ''
    };
  }

  handleLoginPress = async () => {
    this.setState({ loaging: true, error: '' });
    //TODO: Login lgic here
    const user = this.props.appStore.currentUser;
    user.login(this.state.userName, this.state.password)
      .then(async results => {
        await AsyncStorage.setItem('isLogged', 'true');
        await AsyncStorage.setItem('username', this.state.userName);

        //const user = this.props.appStore.currentUser;
        console.log(results);

        this.setState({ loaging: false });

        this.props.navigation.navigate('App');
      })
      .catch(err => {
        debugger;
        console.log(err);
        this.setState({

          error: err.response,
          loading: false
        });
      });
  }


  register = async () => {
    //TODO: Login lgic here
    console.log('Register start');
    this.props.navigation.navigate('Register');
  };

  forgetPasswor = async () => {
    //TODO: Login lgic here
    console.log('Forget start');
    this.props.navigation.navigate('ForgetPassword');
  };


  render() {
    const user = this.props.appStore.currentUser;
    console.log('LoginScreen', user);
    return (
      <View style={styles.container}>
        {/* <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" /> */}

        <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />

        <View
          style={{
            height: 100,
            justifyContent: 'flex-end',
            paddingBottom: 10,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#334393',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {I18n.t('Login')}
          </Text>
        </View>

        {this.state.loaging &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.statusBarBackgroundColor} />
          </View>
        }
        {/* {this.state.error &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                color: '#334393',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {this.state.error}
            </Text>

          </View>
        } */}

        {!this.state.loaging &&

          <Content>
            <Form>
              <Field

                value={this.state.userName}
                onChangeText={(value) => { this.setState({ username: value }); }}
                placeholder='Enter your User name'
              />

              <Field

                value={this.state.password}
                onChangeText={(value) => { this.setState({ password: value }); }}
                placeholder='Enter your Password'
              />

              <Text
                style={{ color: 'blue', margin: 10, marginHorizontal: 20 }}
                onPress={this.forgetPasswor}
              >
                Forget password?
              </Text>

              <RoundButton
                title={I18n.t('Login')}
                onPress={this.handleLoginPress}
              />

              <RoundButton
                btnStyle={{
                  backgroundColor: '#fff',
                  borderColor: colors.ACCENTCOLOR,
                }}
                textStyle={{ color: colors.ACCENTCOLOR }}
                title={I18n.t('Register')}
                onPress={this.register}
              />

              {/* <RoundButton
                title='Toast'
                onPress={this.toast}
              /> */}

            </Form>
          </Content>


        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center'
  },

  textStyle: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 5,
  }
});
