import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
  Share,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Rate, { AndroidMarket } from 'react-native-rate';

import { observer, inject } from 'mobx-react';
import { NavBar } from '../components/navbar/NavBar';
import I18n from '../i18n/i18n';
import { colors } from '../config/colors';


@inject('appStore')
@observer
export default class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rated: false
    };
  }
  sections = [
    { //Account Section
      title: I18n.t('Account'),
      data: [
        // {
        //   title: 'Edit profile',
        //   screen: 'ProfileEdit',
        //   icon: 'edit',
        // },
        {
          title: I18n.t('Change password'),
          screen: 'ChangePassword',
          icon: 'edit',
        },
        {
          title: I18n.t('Manage Cards'),
          screen: 'Cards',
          icon: 'credit-card',
        },
        {
          title: I18n.t('Manage Phones'),
          screen: 'Phones',
          icon: 'tablet',
        },
        {
          title: I18n.t('Manage Meters'),
          screen: 'Meters',
          icon: 'add',
        },
      ]
    },
    {//App Section
      title: I18n.t('App'),
      data: [
        {
          title: I18n.t('Change Language'),
          screen: 'Language',
          icon: 'language',
        },
        {
          title: I18n.t('Rate App'),
          screen: 'RateApp',
          icon: 'star',
          onPress: () => { this.rateApp(); }
        },
        {
          title: I18n.t('Share App'),
          screen: 'ShareApp',
          icon: 'share',
          onPress: () => { this.shareApp(); }
        },
      ]
    },
    { //Using Section
      title: I18n.t('Using'),
      data: [
        {
          title: I18n.t('About'),
          screen: 'About',
          icon: 'info',
        },
        {
          title: I18n.t('Help'),
          screen: 'Help',
          icon: 'help',
        },
        {
          title: I18n.t('Contact Us'),
          screen: 'Contact',
          icon: 'email',
        },
        {
          title: I18n.t('Terms of Use'),
          screen: 'Terms',
          icon: 'book',
        },
      ]
    },

  ];

  navigateToScreen = (screen) => {
    console.log('Open screen', screen);
    this.props.navigation.navigate(screen);
  }

  shareApp() {
    //TODO: rewrite links and content
    //Translate conetnt
    Share.share({
      title: 'Share App',
      url: 'www.mazin.biz',
      message: 'I recomende to see this awsome app'
    }, {
        //android
        dialogTitle: 'Share this awesome content',
        //ios
        excludedActivityTypes: [
          'com.apple.UIkit.activity.PostToTwitter',
        ]
      })
      .then(() => { })
      .catch(error => { console.log(error) })
  }
  rateApp = () => {
    //TODO: rewrite links and content
    //Translate conetnt
    const options = {
      AppleAppID: '2193813192',
      GooglePackageName: 'com.mazin.userapp',
      AmazonPackageName: 'com.mazin.userapp',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
    };
    Rate.rate(options, success => {
      if (success) {
        // this technically only tells us if the user successfully
        //went to the Review Page. Whether they actually did anything,
        // we do not know.
        this.setState({ rated: true });
        console.log(this.state.rated);
      }
    });
  }


  pressItem = (item) => () => {
    console.log(item.onPress);
    var isPressFunc = (typeof item.onPress === 'function');
    console.log(isPressFunc);
    if (isPressFunc) {
      console.log('press');
      item.onPress();
    } else {
      console.log('navig', item.screen);
      this.navigateToScreen(item.screen)

    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={this.pressItem(item)}
    >
      <View
        style={[styles.sectionCntentVie, {
          flex: 1,
          flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
        }]}
      >
        <MaterialIcons
          name={item.icon} color='gray'
          style={{ paddingHorizontal: 5 }}
          size={20}
        />
        <Text style={styles.sectionContent} key={item.screen}>{item.title}</Text>
      </View>
    </TouchableOpacity >
  )

  renderSectionHeader = ({ section }) => (
    <View style={{ flex: 1 }}>
      <Text
        style={[styles.sectionHeader, {
          flex: 1,
          alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start',
          fontFamily: I18n.isRTL() ? 'DroidKufi-Bold' : 'Roboto',
        }]}
      >
        {section.title}
      </Text >
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusBarBackgroundColor}
        />

        <NavBar
          centerTitle={I18n.t('Settings')}
          centerStle={{ color: '#fff' }}
          iconSize={30}
          leftIcon='menu'
          leftOnPress={() => this.props.navigation.openDrawer()}
        />

        {/* <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        /> */}
        {/* <Text style={styles.screenHeader}>
          Settings Screen
        </Text> */}


        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.sections}
          keyExtractor={(item) => item.screen}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  screenHeader: {
    color: 'red',
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sectionHeader: {
    color: 'red',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  sectionCntentVie: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray'
  },
  sectionContent: {
    color: 'gray',
  }
});
