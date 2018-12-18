import React from 'react';

import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity
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
      userName: 'ali',
      password: 'userPassword',
      loading: false,
      error: ''
    };
  }

  handleLoginPress = async () => {
    this.setState({ loading: true, error: '' });
    //TODO: Login lgic here
    const appStore = this.props.appStore;
    const user = appStore.currentUser;
    user.login(this.state.userName, this.state.password)
      .then(async () => {
        await AsyncStorage.setItem('isLogged', 'true');
        await AsyncStorage.setItem('username', this.state.userName);

        //const user = this.props.appStore.currentUser;

        appStore.getCards(appStore.currentUser.userName)
          .then(res => {
            console.log('bootstrapAsync user cards');
            console.log(res);
          })
          .catch(err => console.log(err));

        appStore.getPhones(appStore.currentUser.userName)
          .then(res => {
            console.log('bootstrapAsync user phones');
            console.log(res);
          })
          .catch(err => console.log(err));

        appStore.getMeters(appStore.currentUser.userName)
          .then(res => {
            console.log('bootstrapAsync user meters');
            console.log(res);
          })
          .catch(err => console.log(err));

        appStore.ebsSettings.getpublicKey()
          .then(res => {
            console.log('bootstrapAsync publicKey');
            console.log(appStore.ebsSettings.publicKey);
          })
          .catch(err => console.log('err getting public key', err));

        this.setState({ loading: false });

        this.props.navigation.navigate('App');
      })
      .catch(err => {
        console.log('catch handleLoginPress ', err);
        this.setState({
          error: err.response.data.message,
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
    //console.log('LoginScreen', user);
    return (
      <ImageBackground
        source={require('../../assets/poof.jpg')}
        style={styles.container}
      >
        <View style={styles.overcontainer}>
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
                color: '#ffffff',
                fontSize: 18,

              }}
            >
              {I18n.t('Login')}
            </Text>
          </View>

          {this.state.loading &&
            <View >
              <ActivityIndicator size="large" color={colors.statusBarBackgroundColor} />
            </View>
          }

          {!this.state.loading &&

            <Content>
              <Form>
                <Field

                  placeholderStyle="white"
                  autoCapitalize="none"
                  value={this.state.userName}
                  onChangeText={(value) => { this.setState({ userName: value }); }}
                  placeholder={I18n.t('Enter your User name')}
                />

                <Field
                  placeholderStyle="white"
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={(value) => { this.setState({ password: value }); }}
                  placeholder={I18n.t('Enter your Password')}
                />

                <Text
                  style={{ color: 'white', margin: 10, marginHorizontal: 20, textDecorationLine: 'underline' }}
                  onPress={this.forgetPasswor}
                >
                  {I18n.t('Forget password?')}
                </Text>


                <RoundButton
                  title={I18n.t('Login')}
                  onPress={this.handleLoginPress}
                />

                <Text
                  style={{ color: 'white', margin: 5, marginHorizontal: 20, justifyContent: 'center' }}
                  onPress={this.register}
                >
                  {I18n.t('New User')}
                  <Text
                    style={{ color: 'white', paddingHorizontal: 3, textDecorationLine: 'underline' }}
                    onPress={this.register}
                  >
                    {I18n.t('Register now')}
                  </Text>

                </Text>
                {!this.state.loading && this.state.error.length > 0 &&
                  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 16,
                      paddingVertical: 10,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {this.state.error}
                  </Text>

                  // </View>
                }

                {/* // <RoundButton
                //   title={I18n.t('Register')}
                //   onPress={this.register}
                // />
                // <RoundButton
                //   title={I18n.t('Toast')}
                //   onPress={this.toast}
                // /> */}
              </Form>
            </Content>
          }
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(10,163,222, .8)'
  },
  overcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 153, 0, .9)',
    width: '100%',
    height: '100%',
  },

  textStyle: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 5,
  }
});
