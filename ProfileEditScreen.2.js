import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity

} from 'react-native';
import { Header, Avatar, Icon } from 'react-native-elements';



import DateTimePicker from 'react-native-modal-datetime-picker';
import { observer, inject } from 'mobx-react';

import { TextHead } from '../components/common/index';
import { Left } from 'native-base';
import { Button } from '../components/common/index'
@inject('appStore')
@observer
class ProfileEditScreen extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.appStore.currentUser;

        this.state = {
            username: this.user.userName,
            date: this.user.date,
            mobileNo: this.user.mobileNo,
            email: this.user.email,
            address: this.user.address,
            dVisible: false,
        };
    }
    _showDateTimePicker = () => this.setState({ dVisible: true });

    _hideDateTimePicker = () => this.setState({ dVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.hideDateTimePicker();
    };
    render() {
        return (
            <View style={styles.container}>
                {/* TODO:refactor HEADER*/}
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        width: 50,
                        height: 50,
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('Profile')
                    }}
                    centerComponent={{ text: 'Profile Edit', style: { color: '#fff' } }}
                    rightComponent={{
                        icon: 'save',
                        color: '#fff',
                        onPress: this.save
                    }}
                />

                <View style={styles.image}>
                    <Avatar
                        xlarge
                        title="LW"
                        source={require('../images/avatar-placeholder.png')}
                        rounded
                        onPress={() => console.log('Pressed!')}
                        activeOpacity={0.7}
                    />
                </View>

                <ScrollView>
                    <Text style={styles.title}> Personal Details </Text>

                    <TextInput
                        style={styles.input}
                        lable='Name : '
                        placeholder='User Name '
                        secureTextEntry={false}
                        value={this.state.username}
                        onChangeText={(value) => this.setState({ username: value })}
                    />
                    <TextInput
                        style={styles.input}
                        lable='Email'
                        placeholder='Email@gmail.com '
                        secureTextEntry={false}
                        value={this.state.email}
                        onChangeText={(value) => this.setState({ email: value })}
                    />
                    <TextInput
                        style={styles.input}
                        lable='Address'
                        placeholder='Address '
                        secureTextEntry={false}
                        value={this.state.address}
                        onChangeText={(value) => this.setState({ address: value })}
                    />
                    <TextInput
                        style={styles.input}
                        lable='Mobile'
                        placeholder='MobileNumber '
                        secureTextEntry={false}
                        value={this.state.mobileNo}
                        onChangeText={(value) => this.setState({ mobileNo: value })}
                    />
                    <TextInput
                        style={styles.input}
                        lable='04/04/2018'
                        placeholder='Date  '
                        secureTextEntry={false}
                        value={this.state.date}
                        onChangeText={(value) => this.setState({ date: value })}
                    />
                    <View style={styles.row}>
                        <Text style={styles.title} > Pan Details </Text>
                        <Icon
                            name='add'
                            iconStyle={styles.icon}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        lable='name'
                        placeholder='12286521543 '
                        secureTextEntry={false}
                        value={this.state.panNumber}
                        onChangeText={(value) => console.log(value)}
                    />
                    <TextInput
                        style={styles.input}
                        lable='ExpireDate'
                        placeholder='01/01/2020 '
                        secureTextEntry={false}
                        value={this.state.panDate}
                        onChangeText={(value) => console.log(value)}
                    />
                    <TextInput
                        style={styles.input}
                        lable='IPIN'
                        placeholder='87653 '
                        secureTextEntry={false}
                        value={this.state.IPIN}
                        onChangeText={(value) => console.log(value)}
                    />
                

                </ScrollView>

            </View>
        );
    }

    save = () => {
        this.user.setUserName(this.state.username);
        this.props.navigation.navigate('Profile');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    image: {
        backgroundColor: '#fff',
        alignItems: 'baseline',
        height: 200,
        justifyContent: 'flex-start',
        marginLeft: 430,
        marginTop: 15,
    },
    title: {
        color: '#0c5f97',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 30,
        height: 30,
    },

    input: {
        height: 50,
        width: 550,
        marginLeft: 30,
        marginTop: -5,
        fontSize: 16,
        color: '#0c5f97',
        paddingBottom: 10,
    },
    lable: {
        color: '#0c5f97',
        height: 21,
        width: 100,
        marginLeft: 30,

    },
    row: {
        marginLeft: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 570,
        marginTop: 10,
    },
    icon: {
        color: '#0c5f97',
        fontWeight: 'bold',
        fontSize: 30,
    }
});

export default ProfileEditScreen;
