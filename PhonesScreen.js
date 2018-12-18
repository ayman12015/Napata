import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Expo from 'expo';
import { observer, inject } from 'mobx-react';


import { NavBar } from '../components/navbar/NavBar';
import { colors } from '../config/colors';

import I18n from '../../app/i18n/i18n';
import ErrorHelper from '../core/ErrorHelper';


const extractKey = ({ phoneNumber }) => phoneNumber;

@inject('appStore')
@observer
class PhonesScreen extends Component {
    state = {
        phones: null,
        loading: false,
        error: ''
    }


    componentDidMount() {
        this.loadPhones();
    }

    onPress = (phone) => {
        this.setState({
            refresh: false
        });

        this.props.navigation.navigate('UpdatePhone',
            {
                phone,
                onNavigateBack: this.handleOnNavigateBack
            });
    };

    handleOnNavigateBack = (phones) => {
        console.log('handleOnNavigateBack ', phones);
        this.setState({
            phones,
            refresh: true
        });
    }

    loadPhones() {
        const { appStore } = this.props;
        this.setState({ loading: true });
        appStore.getPhones(appStore.currentUser.userName)
            .then(result => {
                this.setState({
                    phones: result,
                    loading: false,
                    refresh: false
                });
            })
            .catch(error => {
                ErrorHelper.logError(error);
                this.setState({
                    error,
                    loading: false
                });
            });
    }

    renderItem = ({ item }) => {
        console.log('renderItem', item);

        return (
            <TouchableOpacity
                onPress={() => { this.onPress(item); }}
                key={item.phoneNumber}
                activeOpacity={0.8}
            >
                <View
                    style={{
                        marginRight: 30,
                        marginLeft: 30,
                        marginTop: 5,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <Text style={{ color: 'gray' }}> {item.phoneName} </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <Text style={{ color: 'gray' }}> {item.phoneNumber} </Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <Ionicons
                            name="md-checkmark-circle"
                            size={20}
                            color={item.isDefault ? 'green' : 'gray'}
                        />
                    </View>

                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        margin: 5,
                        flexDirection: 'row'
                    }}
                />
            </TouchableOpacity >
        );
    }
    render() {
        const { appStore } = this.props;

        return (
            <View style={styles.container}>
                <NavBar
                    centerTitle={I18n.t('Manage Phones')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon={I18n.isRTL() ? 'arrow-forward' : 'arrow-back'}
                    leftOnPress={() => this.props.navigation.goBack()}
                    rightIcon='add'
                    rightOnPress={() => {
                        this.setState({
                            refresh: false
                        });

                        this.props.navigation.navigate('NewPhone', {
                            onNavigateBack: this.handleOnNavigateBack
                        });
                    }}
                />
                {!this.state.loading && this.state.phones && this.state.phones.length > 0 &&
                    <View
                        style={{
                            marginRight: 30,
                            marginLeft: 30,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
                            marginTop: 5,
                        }}
                    >
                        {/* TODO: translate and RTL design 
                        Change this.state.phones => appStore.phones */}
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.DARKPRIMARYCOLOR }}> Phone Name </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }} >
                            <Text style={{ color: colors.DARKPRIMARYCOLOR }}> Phone Number </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }} >
                            <Text style={{ color: colors.DARKPRIMARYCOLOR }}> Default </Text>
                        </View>
                    </View>
                }


                {!this.state.loading && appStore.phones ?
                    <FlatList
                        style={styles.list}
                        data={appStore.phones}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                        extraData={this.state.refresh}
                    />
                    :
                    <ActivityIndicator
                        color='red'
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                }
                {
                    this.state.phones && this.state.phones.length === 0 ?
                        < Text style={styles.text}>
                            {/* TODO: rewrite and translate message */}
                            You haven't added phones yet, to add new card press + icon
                    </Text>
                        :
                        null

                }

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


        // paddingTop: Expo.Constants.statusBarHeight,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
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
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
        color: 'red',
        marginHorizontal: 20,
        fontSize: 20
    }
});

export default PhonesScreen;
