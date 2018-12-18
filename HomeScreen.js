import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  I18nManager,
  AsyncStorage
} from 'react-native';

import Expo from 'expo';

import { observer, inject } from 'mobx-react';

import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';
import { NavBar } from '../components/navbar/NavBar';
import { EbsService } from '../models/EbsServices';
import globalStyle from '../config/styles';

import I18n from '../../app/i18n/i18n';
import { colors } from '../config/colors';

const extractKey = ({ id }) => id.toString();

const numColumns = 3;
const { width, height } = Dimensions.get('window');
const size = width / numColumns;
const gutter = 10; // You can add gutter if you want


@inject('appStore')
@observer
export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    console.log('constructor');
    this.state = {
      toggleView: false //by default is box view
    };
  }

  async componentWillMount() {
    const view = await AsyncStorage.getItem('ListOrBox');

    if (view !== null) {
      this.setState({
        toggleView: view === 'list'
      });
    }
  }

  EBSSERVICES = [
    new EbsService(
      1,
      I18n.t('Telecom Services'),
      'Telecom',
      'add',
      I18n.t('Telecom Services Desc'),
      '#85C1E9',
      true
    ),
    new EbsService(
      2,
      I18n.t('E-Government Services'),
      'EGover',
      'language',
      I18n.t('E-Government Services Desc'),
      '#A569BD',
      true
    ),
    new EbsService(
      3,
      I18n.t('Transfers'),
      'Transfers',
      'help',
      I18n.t('Transfers Desc'),
      '#b4abbf',
      true
    ),
    new EbsService(
      4,
      I18n.t('Electricity'),
      'Electricity',
      'update',
      I18n.t('Electricity Desc'),
      '#ffb6b1',
      true
    ),
    new EbsService(
      5,
      I18n.t('Payment Channels'),
      'PaymentChannels',
      'redo',
      I18n.t('Payment Channels Desc'),
      '#efd19f',
      false
    ),
    new EbsService(
      6,
      I18n.t('Balance Inquiry'),
      'BalanceInquiry',
      'refresh',
      I18n.t('Balance Inquiry Desc'),
      '#CD6155',
      true
    ),
    new EbsService(
      7,
      I18n.t('Last Transaction Status'),
      'LastTransactionStatus',
      'people',
      I18n.t('Transaction Status Desc'),
      '#FFC300',
      true
    ),
    new EbsService(
      8,
      I18n.t('IPIN Settings'),
      'IPIN',
      'build',
      I18n.t('IPIN Settings Desc'),
      '#7DCEA0',
      true
    ),
    new EbsService(
      9,
      I18n.t('QR code pay'),
      'QRCode',
      'access-time',
      I18n.t('QR code Desc'),
      '#C39BD3',
      false
    )
  ];

  navigateToScreen = (screen) => () => {
    console.log('Open screen', screen);
    this.props.navigation.navigate(screen);
  }

  changeView = () => {
    this.setState({
      toggleView: !this.state.toggleView
    });

    AsyncStorage.setItem('ListOrBox', !this.state.toggleView ? 'list' : 'box')
      .then(() => { console.log('ListOrBox saved success '); })
      .catch(err => { console.log(err); });

    console.log('change home view to', !this.state.toggleView ? 'box' : 'list');
  }

  renderItem = ({ item }) =>
    // console.log('renderItem:\n', item);
    (
      <TouchableOpacity
        onPress={this.navigateToScreen(item.screen)}
        key={item.id}
        activeOpacity={0.8}
      >
        <View
          style={[styles.row, {
            backgroundColor: item.backgroundColor,
            flex: 1,
            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
            justifyContent: 'flex-start'
          }]}
        >

          <View>
            <MaterialIcons
              name={item.icon} color='#fff'
              style={{ paddingHorizontal: 5 }}
              size={50}
            />
          </View>


          <View style={{ flex: 1, }}>
            <Text
              style={{
                flex: 1,
                alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start',
                fontFamily: I18n.isRTL() ? 'DroidKufi-Bold' : 'Roboto',
                fontSize: 16
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                flex: 1,
                alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start'
              }}
            >
              {item.description}
            </Text>
          </View>

          {item.isAvailable === false ?
            <Text
              style={{
                alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start',
                fontFamily: I18n.isRTL() ? 'DroidKufi-Bold' : 'Roboto',
                fontSize: 14,
                color: 'red'
              }}
            >
              {I18n.t('Coming Soon')}
            </Text>
            :
            null
          }

        </View>
      </TouchableOpacity >
    )
  render() {
    console.log(I18n.isRTL(), I18nManager.isRTL);
    return (
      <View style={globalStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />
        <NavBar
          centerTitle={I18n.t('Home')}
          centerStle={{ color: '#fff' }}
          iconSize={30}
          leftIcon='menu'
          leftOnPress={() => this.props.navigation.openDrawer()}
          rightIcon='apps'
          rightOnPress={() => this.changeView()}
        />
        {/* {this.state.toggleView ? <Text style={{ flex: 1, color: 'red' }}>{this.state.toggleView}</Text>
          : <Text style={{ flex: 1, color: 'blue' }}>{this.state.toggleView}</Text>} */}
        {this.state.toggleView ?
          <FlatList
            key='list'
            style={styles.list}
            data={this.EBSSERVICES}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
          :
          <GridView
            itemDimension={130}
            items={this.EBSSERVICES}
            style={styles.gridView}
            renderItem={item => (
              <TouchableOpacity
                onPress={this.navigateToScreen(item.screen)}
                key={item.id}
                activeOpacity={0.8}
              >
                <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor, }]}>
                  <MaterialIcons
                    name={item.icon} color='#fff'
                    style={{ paddingHorizontal: 5 }}
                    size={50}
                  />
                  <Text
                    style={[
                      styles.itemName,
                      { fontFamily: I18n.isRTL() ? 'DroidKufi-Bold' : 'Roboto' }]}
                  >
                    {item.title}
                  </Text>
                  {item.isAvailable === false ?
                    <Text
                      style={{
                        alignSelf: I18n.isRTL() ? 'center' : 'center',
                        fontFamily: I18n.isRTL() ? 'DroidKufi-Bold' : 'Roboto',
                        fontSize: 12,
                        color: 'red'
                      }}
                    >
                      {I18n.t('Coming Soon')}
                    </Text>
                    :
                    null
                  }

                </View>
              </TouchableOpacity>
            )}
          />

        }

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Expo.Constants.statusBarHeight,
  },

  list: {
    marginTop: 5,
    flex: 1,
  },
  row: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ff7f7f',
    width: Expo.Constants.width - 30
  },

  text: {
    flex: 1,
    alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start'
  },
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },

});

