//#region Libs
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
  Linking
} from 'react-native';
import { Content, ListItem, Left, Right, Radio } from 'native-base';
import { observer, inject } from 'mobx-react';
import { SocialIcon, Avatar } from 'react-native-elements';
import { Constants, WebBrowser } from 'expo';
import I18n from '../../app/i18n/i18n';
import { RoundButton } from '../components/common';
import { colors } from '../config/colors';
import ChangeLanguageScreen from './ChangeLanguageScreen';

//#endregion

@inject('appStore')
@observer
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemSelected: I18n.locale,
      error: ''
    };
  }

  _handleInstagramLinking = () => {
    Linking.openURL('https://www.instagram.com/napatapay/?hl=en');
  }
  _handleYoutubeLinking = () => {
    Linking.openURL('https://www.youtube.com/channel/UCFwaOEdyyE0063Lbwpo1Q5A?view_as=subscriber');
  }
  _handleGoogleLinking = () => {
    Linking.openURL('https://plus.google.com/116261941142953121828');
  }

  bootstrapAsync = async () => {
    this.setState({ loading: true, error: '' });
    const isLogged = await AsyncStorage.getItem('isLogged');
    const isFirstrun = await AsyncStorage.getItem('isFirstrun');
    console.log('isLogged', isLogged);

    const appStore = this.props.appStore;
    console.log('apppStore', appStore);

    if (isLogged) {
      await appStore.currentUser.Load();
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
    }

    this.setState({ loading: false });

    //I18n.changLanguage('ar', this);
    console.log('isFirstrun ', isFirstrun);
    //isFirstRun null - first time
    if (!isFirstrun) {
      this.props.navigation.navigate('Intro');
    } else {
      this.props.navigation.navigate(isLogged ? 'App' : 'Auth');
    }
  };

  changLanguage = (lang) => async () => {
    this.setState({ itemSelected: lang });
    console.log('changing lang to', lang);
    I18n.changLanguage(lang, this);
    await AsyncStorage.clear();
    await AsyncStorage.setItem('lang', lang);

    Expo.Util.reload();
  }


  // TODO animate https://www.youtube.com/watch?v=Q9iFI2hg9ok
  render() {
    return (
      <ImageBackground
        source={require('../../assets/poof.jpg')}
        style={styles.container}
      >
        <View style={styles.overcontainer}>
          <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />

          <View style={{ position: 'absolute', top: 10, left: 10 }}>
            {

              this.state.itemSelected === 'ar' ?
                <TouchableOpacity
                  style={styles.buttonLang}
                  onPress={this.changLanguage('en')}
                  selected={this.state.itemSelected === 'ar'}
                >
                  <Text style={{ color: '#fff', fontSize: 25, }}>
                    EN
                  </Text>
                </TouchableOpacity>

                :

                <TouchableOpacity
                  style={styles.buttonLang}
                  onPress={this.changLanguage('ar')}
                  selected={this.state.itemSelected === 'en'}
                >
                  <Text style={{ color: '#fff', fontSize: 25, }}>
                    ع
                   </Text>
                </TouchableOpacity>



            }



          </View>
          {/* <StatusBar barStyle="default" /> */}
          <TouchableOpacity style={styles.buttonLogo}>
            <Image
              style={styles.logo}

              source={require('../../assets/logo.png')}
            />
          </TouchableOpacity>


          <View style={{ marginBottom: 60 }}>

            <Text style={{ color: colors.ACCENTCOLORLIGHT, fontWeight: 'bold', fontSize: 35, textAlign: 'center' }}>
              Napata
            <Text style={{ color: '#fff', fontSize: 35, textAlign: 'center' }}>
                Pay
            </Text>
            </Text>

            <Text style={{ color: 'white', fontSize: 20 }}>
              {I18n.t('Electronic Payment Services')}
            </Text>


          </View>
          {this.state.loading &&
            <View >
              <ActivityIndicator size="large" color={'#fff'} />
            </View>
          }
          {!this.state.loading &&
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.bootstrapAsync}
            >
              <Text style={styles.buttonText}>{I18n.t('Start').toUpperCase()}</Text>
            </TouchableOpacity>
          }


          <View style={styles.socialContainer}>
            <SocialIcon
              style={styles.socialIcon}
              type='youtube'
              onPress={this._handleYoutubeLinking}
            />
            <SocialIcon
              style={styles.socialIcon}
              type='google'
              onPress={this._handleGoogleLinking}
            />
            <SocialIcon
              style={styles.socialIcon}
              type='instagram'
              onPress={this._handleInstagramLinking}
            />
            <SocialIcon
              style={styles.socialIcon}
              type='facebook'

            />
            <SocialIcon
              style={styles.socialIcon}
              type='twitter'

            />
          </View>

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
  },
  overcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 153, 0, .9)',
    width: '100%',
    height: '100%',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: Image.resizeMode.contain
  },
  socialContainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10


  },
  so: {

    margin: 600
  },
  buttonLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 33
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    paddingVertical: 5,
    paddingHorizontal: 55,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 60

  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20
  },
  socialIcon: {
    margin: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.01)'


  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    bottom: 0,
    height: 100,
    backgroundColor: 'rgba(255,165,255,0.9)'
  },
});
