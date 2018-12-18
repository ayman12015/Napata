import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Content, Form } from 'native-base';
import { observer, inject } from 'mobx-react';
import { Avatar } from 'react-native-elements';
import Moment from 'moment';

import { NavBar } from '../components/navbar/NavBar';
import { Field } from '../components/common/index';
import I18n from '../i18n/i18n';
import EditProfileForm from './_Forms/EditProfileForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';

const avatar = require('../images/avatar-placeholder.png');

@inject('appStore')
@observer
class ProfileEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    // updateProfile = () => {
    //     const user = this.props.appStore.currentUser;


    //     const {
    //         firstName,
    //         lastName,
    //         dateOfBirth,
    //         address,
    //         email,
    //         mobileNumber,
    //     } = user;

    //     const tempUser = {
    //         firstName,
    //         lastName,
    //         dateOfBirth,
    //         address,
    //         email,
    //         mobileNumber,
    //     };

    //     console.log('tempUser', tempUser);

    //     this.setState({ loading: true });

    //     const propsToUpdate = [];
    //     Object.keys(tempUser)
    //         .forEach(key => {
    //             console.log(`key=${key}  value=${tempUser[key]}`);
    //             if ((key[0] !== '_')) {
    //                 propsToUpdate.push({
    //                     propName: key, value: tempUser[key]
    //                 });
    //             }
    //         }
    //         );

    //     this.props.appStore.currentUser.update(user.userName, propsToUpdate)
    //         .then(async () => {
    //             this.setState({ loading: false });
    //             this.props.navigation.navigate('Profile');
    //         })
    //         .catch(err => {
    //             console.log('catch handleLoginPress ', err);
    //             this.setState({
    //                 error: err,
    //                 loading: false
    //             });
    //         });
    //     console.log('propsToUpdate', JSON.stringify(propsToUpdate));
    // }

    render() {
        const { appStore } = this.props;
        console.log('Profile Edit Screen render');
        return (
            <EditProfileForm {...this.props} rules={ValidationRules} messages={ValidationMessages} deviceLocale="ar" />
            // <KeyboardAwareScrollView
            //     style={{ backgroundColor: '#4c69a5' }}
            //     resetScrollToCoords={{ x: 0, y: 0 }}
            //     contentContainerStyle={styles.container}
            //     scrollEnabled={false}
            // >
            //     <NavBar
            //         centerTitle={I18n.t('Edit Profile')}
            //         centerStle={{ color: '#fff' }}
            //         iconSize={30}
            //         leftIcon='arrow-back'
            //         leftOnPress={() => this.props.navigation.goBack()}
            //         rightIcon='save'
            //         rightOnPress={() => {
            //             this.updateProfile();
            //         }}
            //     />
            //     <View style={styles.image}>
            //         <Avatar
            //             large
            //             title="LW"
            //             source={avatar}
            //             rounded
            //             onPress={() => console.log('Pressed!')}
            //             activeOpacity={0.7}
            //         />
            //         <Text style={styles.imgText}>{appStore.currentUser.userName}</Text>
            //     </View>
            //     <Content>
            //         <Form style={{ marginTop: 0 }}>


            //             <Field
            //                 title={I18n.t('First Name')}
            //                 value={appStore.currentUser.firstName}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeFirstName(text);
            //                 }}
            //             />

            //             <Field
            //                 title={I18n.t('Last Name')}
            //                 value={appStore.currentUser.lastName}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeLastName(text);
            //                 }}
            //             />

            //             <Field
            //                 title={I18n.t('Email')}
            //                 value={appStore.currentUser.email}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeEmail(text);
            //                 }}
            //             />
            //             <Field
            //                 title={I18n.t('Address')}
            //                 value={appStore.currentUser.address}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeAddress(text);
            //                 }}
            //             />
            //             <Field
            //                 title={I18n.t('Mobile Number')}
            //                 value={appStore.currentUser.mobileNumber}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeMobile(text);
            //                 }}
            //             />
            //             <Field
            //                 title={I18n.t('Date Of Birth')}
            //                 value={Moment(appStore.currentUser.dateOfBirth).format('MM/DD/YYYY')}
            //                 onChangeText={(text) => {
            //                     appStore.currentUser.changeDateOfBirth(text);
            //                 }}
            //             />

            //         </Form>
            //     </Content>
            // </KeyboardAwareScrollView>
        );
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
    },
    image: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 150,
        justifyContent: 'center',
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
    }
});

export default ProfileEditScreen;
