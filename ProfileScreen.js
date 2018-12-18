import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    StatusBar
} from 'react-native';

import Expo from 'expo';
import Moment from 'moment';

import { Avatar } from 'react-native-elements';
import { colors } from '../config/colors';

import { observer, inject } from 'mobx-react';
import { NavBar } from '../components/navbar/NavBar';
import I18n from '../i18n/i18n';

const avatar = require('../images/avatar-placeholder.png');


@inject('appStore')
@observer
class ProfileScreen extends Component {

    render() {
        const user = this.props.appStore.currentUser;

        return (
            <View style={styles.container}>
                {/* <StatusBar barStyle="light-content" backgroundColor={colors.StatusBarBackgroundColor} /> */}

                <NavBar
                    centerTitle={I18n.t('Account')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='menu'
                    leftOnPress={() => this.props.navigation.openDrawer()}
                    rightIcon='edit'
                    rightOnPress={() => this.props.navigation.navigate('ProfileEdit')}
                />


                {/* Profile Data  */}
                <View style={styles.image}>
                    <Avatar
                        large
                        title="LW"
                        source={avatar}
                        rounded
                        onPress={() => console.log('Pressed!')}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.imgText}>{user.userName}</Text>
                </View>


                <ScrollView >
                    <Text style={[styles.title, styles.row]}> {I18n.t('Personal Details').toUpperCase()}</Text>

                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text
                            style={[styles.lable,
                            { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}

                        >
                            {I18n.t('First Name')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {user.firstName}
                        </Text>
                    </View>

                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text
                            style={[styles.lable,
                            { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}

                        >
                            {I18n.t('Last Name')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {user.lastName}
                        </Text>
                    </View>

                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={[styles.lable, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {I18n.t('Email')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {user.email}
                        </Text>
                    </View>

                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={[styles.lable, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {I18n.t('Address')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {user.address}
                        </Text>
                    </View>
                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={[styles.lable, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {I18n.t('Mobile Number')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {user.mobileNumber}
                        </Text>
                    </View>
                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={[styles.lable, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {I18n.t('Date Of Birth')}
                        </Text>
                        <Text style={[styles.input, { flex: 1, alignSelf: I18n.isRTL() ? 'flex-end' : 'flex-start' }]}>
                            {Moment(user.dateOfBirth).format('MMM Do YY')}
                        </Text>
                    </View>

                    {/* <Text style={[styles.title, styles.row]}> {I18n.t('Pan Details').toUpperCase()} </Text>

                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={styles.lable}>{I18n.t('Name')}</Text>
                        <Text style={styles.input}>Card Name</Text>
                    </View>
                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={styles.lable}>{I18n.t('Pan Number')}</Text>
                        <Text style={styles.input}>{user.cardNumber}</Text>
                    </View>
                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={styles.lable}>{I18n.t('Expiry date')}</Text>
                        <Text style={styles.input}>{user.expiryDate}</Text>
                    </View>
                    <View
                        style={[styles.row,
                        {
                            flex: 1,
                            flexDirection: I18n.isRTL() ? 'row-reverse' : 'row'
                        }]}
                    >
                        <Text style={styles.lable}>{I18n.t('Type')}</Text>
                        <Text style={styles.input}>Cash Card</Text>
                    </View> */}

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    image: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 150,
        justifyContent: 'center',
    },
    imgText: {
        color: '#0c5f97',
        height: 21,
        marginTop: 10,
    },
    title: {
        color: '#0c5f97',
        fontSize: 16,
        marginLeft: 30,
        height: 30,
        marginTop: 5,
    },
    row: {
        marginHorizontal: 25,
        marginVertical: 5,
    },
    lable: {
        color: '#0c5f97',
        marginLeft: 30,
    },
    input: {
        color: '#696969',
    }
});

export default ProfileScreen;
