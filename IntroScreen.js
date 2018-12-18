import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';
import I18n from '../../app/i18n/i18n';




export default class IntroScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false
        }
    }

    onDone = async () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        //this.setState({ showRealApp: true });

        await AsyncStorage.setItem('isFirstrun', 'true')
            .then(() => {
                console.log('isFirstrun Saved succ');
            })
            .catch(err => {
                console.log(err);
            });

        console.log('Done');
        this.props.navigation.navigate('SignIn');
    }
    slides = [
        {
            key: 'somethun', //      I18n.t('Transfers'),
            title: I18n.t('Manage Per-cards'),
            text: I18n.t('Manage Per-cards Desc'),
            image: require('../images/1.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#59b2ab',
        },
        {
            key: 'somethun-dos',
            title: I18n.t('Pay Per-click'),
            text: I18n.t('Pay Per-click Desc'),
            image: require('../images/2.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#febe29',
        },
        {
            key: 'somethun1',
            title: I18n.t('Expense Per Needs'),
            text: I18n.t('Expense Per Needs Desc'),
            image: require('../images/3.jpg'),
            imageStyle: styles.image,
            backgroundColor: '#22bcb5',
        }
    ];
    renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
              name="md-arrow-round-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        );
    }
      renderDoneButton = () => {
        return (
            
          <View style={styles.buttonCircle}>
            <Ionicons
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        );
    }

    render() {
        return (
            <AppIntroSlider 
                slides={this.slides} 
                onDone={this.onDone} 
                renderDoneButton={this.renderDoneButton}
                renderNextButton={this.renderNextButton}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320
    },
    buttonCircle: {

    }
});
