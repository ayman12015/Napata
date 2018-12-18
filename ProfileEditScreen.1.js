import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView

} from 'react-native';
import { Header } from 'react-native-elements';

import { observer, inject } from 'mobx-react';

//import Expo from 'expo';
import { NavBar } from '../components/navbar/NavBar';

import { Form, Item, Input, Label, Content, DatePicker, Text } from 'native-base';

@inject('appStore')
@observer
class ProfileEditScreen extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.appStore.currentUse;
        this.setDate = this.setDate.bind(this);
        this.state = {
            chosenDate: new Date()
        };
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    centerTitle='Edit profile'
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.navigate('Profile')}
                />

                <Content>
                    <Form>
                        <Label style={styles.title}> PERSONAL DETAILS </Label>
                        <Item stackedLabel>
                            <Label style={styles.lable}>Date of Birth</Label>
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={'en'}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={'fade'}
                                androidMode={'default'}
                                placeHolderText="Select date"
                                textStyle={{ color: '#696969' }}
                                placeHolderTextStyle={{ color: '#d3d3d3' }}
                                onDateChange={this.setDate}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.lable}>Username</Label>
                            <Input />
                        </Item>
                        <Label style={styles.title}> CONTACT DETAILS </Label>
                        <Item stackedLabel>
                            <Label style={styles.lable}>Mobile Number</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label style={styles.lable}>Email</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label style={styles.lable}>Address</Label>
                            <Input />
                        </Item>
                        <Label style={styles.title}> LOGIN DETAILS </Label>
                        <Item stackedLabel>
                            <Label style={styles.lable}>User Name</Label>
                            <Input />
                        </Item>
                        <Label style={styles.title}> PAN DETAILS </Label>
                        <Item stackedLabel>
                            <Label style={styles.lable}>User Name</Label>
                            <Input />
                        </Item>
                        <Content style={{ flex: 1, flexDirection: 'row' }}>
                            <Label style={styles.title}> LOGIN DETAILS </Label>
                            <Item stackedLabel>
                                <Label style={styles.lable}>User Name</Label>
                                <Input />
                            </Item>
                            <Label style={styles.title}> PAN DETAILS </Label>
                            <Item stackedLabel>
                                <Label style={styles.lable}>User Name</Label>
                                <Input />
                            </Item>
                        </Content>
                    </Form>
                </Content>

            </View>
        );
    }

    /* save = () => {
         this.user.setUserName(this.state.username);
         this.props.navigation.navigate('Profile');
     }
 /* 
     async componentWillMount() {
         await Expo.Font.loadAsync({
             'Roboto': require('native-base/Fonts/Roboto.ttf'),
             'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
             'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf').
         });
     }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    title: {
        color: 'red',
        fontSize: 15,
        marginLeft: 6,
        height: 40,
        marginTop: 5,

    },
    lable: {
        color: '#696969',

    }
});

export default ProfileEditScreen;
