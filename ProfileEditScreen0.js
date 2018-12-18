import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView

} from 'react-native';
import { Header } from 'react-native-elements';


import { observer, inject } from 'mobx-react';
import DatePicker from 'react-native-datepicker';


import { TextHead } from '../components/common/index';

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
            address: this.user.address
        };
    }

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
            <ScrollView >

                <TextHead> PERSONAL DETAILS </TextHead>
                <Text style={styles.text}> Data of Birth </Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2000-05-01"
                    maxDate="2018-08-30"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 160,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 10
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ date }); }}
        
                />

                <TextHead> CONTACT DETAILS </TextHead>

                <Text style={styles.text}> Mobile Number </Text>

                <TextInput
                    style={styles.input}   
                    lable='Mobile'
                    placeholder='Please Enter MobileNumber '
                    secureTextEntry={false}
                    value={this.state.mobileNo}
                    onChangeText={(value) => this.setState({ mobileNo: value })}
                /> 

                <Text style={styles.text}> Email </Text>

                <TextInput
                    style={styles.input}   
                    lable='Email'
                    placeholder='Please Enter your Email '
                    secureTextEntry={false}
                    value={this.state.email}
                    onChangeText={(value) => this.setState({ email: value })}
                /> 

                <Text style={styles.text}> Address </Text>

                <TextInput
                    style={styles.input}   
                    lable='Address'
                    placeholder='Please Enter your Address '
                    secureTextEntry={false}
                    value={this.state.address}
                    onChangeText={(value) => this.setState({ address: value  })}
                /> 

                <TextHead> LOGIN DETAILS </TextHead>

                <TextInput
                    style={styles.input}
                    lable='Name : '
                    placeholder='User name '
                    secureTextEntry={false}
                    value={this.state.username}
                    onChangeText={(value) => { this.setState({ username: value }); }}
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
    text: {
        
        color: '#696969',
        fontSize: 15,
        marginLeft: 20,
    },
    input: {
        height: 50,
        width: 500,
        marginLeft: 20,
        marginTop: -5,
    }
});

export default ProfileEditScreen;
