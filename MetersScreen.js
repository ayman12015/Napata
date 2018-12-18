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


const extractKey = ({ meterNumber }) => meterNumber;

@inject('appStore')
@observer
class MetersScreen extends Component {
    state = {
        meters: null,
        loading: false,
        error: ''
    }


    componentDidMount() {
        this.loadMeters();
    }

    onPress = (meter) => {
        this.setState({
            refresh: false
        });

        this.props.navigation.navigate('UpdateMeter',
            {
                meter,
                onNavigateBack: this.handleOnNavigateBack
            });
    };

    handleOnNavigateBack = (meters) => {
        console.log('handleOnNavigateBack ', meters);
        this.setState({
            meters,
            refresh: true
        });
    }

    loadMeters() {
        const { appStore } = this.props;
        this.setState({ loading: true });
        appStore.getMeters(appStore.currentUser.userName)
            .then(result => {
                this.setState({
                    meters: result,
                    loading: false,
                    refresh: false
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false
                });
            });
    }

    renderItem = ({ item }) => {
        console.log(item);

        return (
            <TouchableOpacity
                onPress={() => { this.onPress(item); }}
                key={item.meterNumber}
                activeOpacity={0.8}
            >
                <View
                    style={{
                        marginRight: 30,
                        marginLeft: 30,
                        marginTop: 5,
                        flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <Text style={{ color: 'gray', textAlign: 'center' }}> {item.meterName} </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between' }} >
                        <Text style={{ color: 'gray', textAlign: 'center' }}> {item.meterNumber} </Text>
                    </View>
                    {item.isDefault === true ?
                        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >
                            <Ionicons
                                name="md-checkmark-circle" size={20} color="green"
                            />
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >
                            <Ionicons
                                name="md-checkmark-circle" size={20} color="gray"
                            />
                        </View>
                    }
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        margin: 5,
                        flexDirection: I18n.isRTL() ? 'row-reverse' : 'row',
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
                    centerTitle={I18n.t('Manage Meters')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon={I18n.isRTL() ? 'arrow-forward' : 'arrow-back'}
                    leftOnPress={() => this.props.navigation.goBack()}
                    rightIcon='add'
                    rightOnPress={() => {
                        this.setState({
                            refresh: false
                        });

                        this.props.navigation.navigate('NewMeter', {
                            onNavigateBack: this.handleOnNavigateBack
                        });
                    }}
                />
                {!this.state.loading && appStore.meters && appStore.meters.length > 0 &&
                    <View
                        style={{
                            marginRight: 30,
                            marginLeft: 30,
                            marginTop: 5,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.DARKPRIMARYCOLOR, textAlign: 'center' }}> {I18n.t('Meter Name')} </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }} >
                            <Text style={{ color: colors.DARKPRIMARYCOLOR, textAlign: 'center' }}> {I18n.t('Meter Number')} </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between' }} >
                            <Text style={{ color: colors.DARKPRIMARYCOLOR, textAlign: 'center' }}> {I18n.t('Default')} </Text>
                        </View>
                    </View>
                }


                {!this.state.loading && appStore.meters ?
                    < FlatList
                        style={styles.list}
                        data={appStore.meters}
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
                    appStore.meters && appStore.meters.length === 0 ?
                        < Text style={styles.text}>
                            {/* TODO: rewrite message */}
                            {I18n.t('Add Meter Massage')}
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
        color: 'red',
        marginHorizontal: 20,
        fontSize: 20
    }
});

export default MetersScreen;
