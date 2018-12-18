import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    StatusBar,
    Text
} from 'react-native';

import Expo from 'expo';
import { Content, ListItem, Left, Right, Radio } from 'native-base';


import I18n from '../../app/i18n/i18n';
import { NavBar } from '../components/navbar/NavBar';
import { colors } from '../config/colors';

class ChangeLanguageScreen extends Component {
    static navigationOptions = {
        title: 'Language',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 14,
        },
    };

    constructor() {
        super();
        this.state = {
            itemSelected: I18n.locale,
        };
    }

    changLanguage = (lang) => async () => {
        this.setState({ itemSelected: lang });
        console.log('changing lang to', lang);
        I18n.changLanguage(lang, this);
        await AsyncStorage.clear();
        await AsyncStorage.setItem('lang', lang);

        Expo.Util.reload();
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />

                <NavBar
                    centerTitle={I18n.t('Change Language')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.goBack()}
                />

                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            color: 'gray',
                            flex: 3,
                        }}
                    >
                        {I18n.t('English')}
                    </Text>

                    <Radio
                        onPress={this.changLanguage('en')}
                        color={'#f0ad4e'}
                        selectedColor={colors.PRIMARYCOLOR}
                        selected={this.state.itemSelected === 'en'}
                    />
                </View >


                <View
                    style={{
                        marginHorizontal: 20,
                        flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginVertical: 10,

                    }}
                >
                    <Text
                        style={{
                            color: 'gray',
                            flex: 3,
                        }}
                    >
                        {I18n.t('Arabic')}
                    </Text>

                    <Radio
                        onPress={this.changLanguage('ar')}
                        color={'#f0ad4e'}
                        selectedColor={colors.PRIMARYCOLOR}
                        selected={this.state.itemSelected === 'ar'}
                    />
                </View >

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChangeLanguageScreen;
