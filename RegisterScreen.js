import React, { Component } from 'react';
import {
    StatusBa,
    ActivityIndicator,
    StatusBar,
    Text,
    StyleSheet,
    View
} from 'react-native';

import Expo from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Content, Form, DatePicker } from 'native-base';
import { NavBar } from '../components/navbar/NavBar';
import { colors } from '../config/colors';
import globalStyle from '../config/styles';
import axios from '../services/api/axios';
import { observer, inject } from 'mobx-react';
import ValidationComponent from 'react-native-form-validator';
//{colors.statusBarBackgroundColor}
import { Field, RoundButton, Checkbox } from '../components/common/index';
import I18n from '../../app/i18n/i18n';
import Registerform from '../screens/_Forms/Registerform';
import ValidationRules from '../screens/_Forms/ValidationRules';
import ValidationMessages from '../screens/_Forms/ValidationMessages';

@inject('appStore')
@observer

class RegisterScreen  extends ValidationComponent{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
   //   handleChange = (event) => {
   //      const email = event.target.value;
   //      this.setState({ email });
   //  }
   // onValueChange(field, value) {
   //      console.log(`field ${field} value ${value}`);
   //      this.setState({
   //          [field]: value
   //      });
   //  }
   //   submit = () => {
   //      const { appStore } = this.props;
   //      this.setState({ loading: false });
        
   //      if( this.validate({

   //           userName: {minlength:3, maxlength:7, required: true},
   //           firstName: {minlength:3, maxlength:7, required: true},
   //           lastName: {minlength:3, maxlength:7, required: true},
   //           address: {minlength:3, maxlength:7, required: true},
   //           phoneNo: {numbers: true, required: true},
   //           email: {email: true},
   //           phoneNo: {numbers: true, required: true},
   //           mobileNumber: {numbers: true, required: true},
   //           dateOfBirth: {date: 'YYYY-MM-DD'},
   //           userPassword:{minlength:8, maxlength:13, required: true},
   //           confirmPassword: {required: true}, 
   //           checked: {required: true} 

   //       }) ){

   
   //                  axios.post('/user/register',
   //          {
   //          userName: this.state.userName,
   //          firstName: this.state.firstName,
   //          lastName: this.state.lastName,
   //          dateOfBirth: this.state.dateOfBirth,
   //          address: this.state.address,
   //          SelectDate: this.state.SelectDate,
   //          email: this.state.email,
   //          userPassword: this.state.userPassword, 
   //          confirmPassword: this.state.confirmPassword,
   //          phoneNo: this.state.phoneNo,
   //          entityId: this.state.entityId,
   //          entityType: this.state.entityType,
   //          entityGroup: this.state.entityGroup,
   //          registrationType: this.state.registrationType,
   //          mobileNumber: this.state.mobileNumber,
   //          checked: this.state.checked

   //      }


   //      )
   //             .then(result => {
   //              console.log(result);
   //              this.setState({ loading: false });
   //          })
   //          .catch(err => {
   //              this.setState({ loading: false });
   //              console.log(err.response.data.error.message);
   //          });

   //                   }

       
    //};
      
    render() {
        const { email } = this.state;

        return (
            
            <Registerform {...this.props} rules={ValidationRules} messages={ValidationMessages} deviceLocale="ar" />
        //     <KeyboardAwareScrollView style={globalStyle.container}>
        //         <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />
        //         <NavBar
        //             centerTitle='Register'
        //             centerStle={{ color: '#fff' }}
        //             iconSize={30}
        //             leftIcon='arrow-back'
        //             leftOnPress={() => this.props.navigation.goBack()}
        //         />
        //         <Content>
        //             <Form style={{ marginTop: 20 }}>
        //                 <Field 
        //                     title={I18n.t('First Name')}
        //                     placeholder={I18n.t('First Name')}
        //                     maxLength={8}
        //                     value={this.state.firstName}
        //                     onChangeText={(text) => { this.onValueChange('firstName', text); }}
        //                 />

        //                {this.isFieldInError('firstName') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('firstName')}</Text> 
        //                     : 
        //                     null 
        //                 }

        //                 <Field 
        //                     title={I18n.t('Last Name')}
        //                     placeholder={I18n.t('Last Name')}
        //                     value={this.state.lastName}
        //                     onChangeText={(text) => { this.onValueChange('lastName', text); }}
        //                 />
        //                 {this.isFieldInError('lastName') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('lastName')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 
        //                     title={I18n.t('Date Of Birth')}
        //                     placeholder={I18n.t('Date Of Birth')}
        //                     value={this.state.dateOfBirth}
        //                     onChangeText={(date) => { this.onValueChange('dateOfBirth', date); }}
        //                 /> 
        //                 {this.isFieldInError('dateOfBirth') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('dateOfBirth')}</Text> 
        //                     : 
        //                     null 
        //                 }
                    
                        
        //                 <Field 
                           
        //                     title={I18n.t('address')}
        //                     placeholder={I18n.t('address')}
        //                     value={this.state.address}
        //                     onChangeText={(text) => { this.onValueChange('address', text); }}
        //                 />
        //                 {this.isFieldInError('address') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('address')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 
        //                     title={I18n.t('Email')}
        //                     placeholder={I18n.t('Email')}
        //                     value={this.state.email}
        //                     onChangeText={(text) => { this.onValueChange('email', text); }}
                           
        //                 />
        //                 {this.isFieldInError('email') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('email')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field
        //                     title={I18n.t('User Name')}
        //                     placeholder={I18n.t('User Name')}
        //                     value={this.state.userName}
        //                     onChangeText={(text) => { this.onValueChange('userName', text); }}
        //                 />
        //                 {this.isFieldInError('userName') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('userName')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 
        //                     title={I18n.t('Password')}
        //                      placeholder={I18n.t('Password')}
        //                     secureTextEntry={true}
        //                     value={this.state.userPassword}
        //                     onChangeText={(text) => { this.onValueChange('userPassword', text); }}
        //                 />
        //                 {this.isFieldInError('userPassword') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('userPassword')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 
        //                     title={I18n.t('Confirm Password')}
        //                     placeholder={I18n.t('Confirm Password')}
        //                     secureTextEntry={true}
        //                     value={this.state.confirmPassword}
        //                     onChangeText={(text) => { this.onValueChange('confirmPassword', text); }}
        //                 />
        //                 {this.isFieldInError('confirmPassword') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('confirmPassword')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 
        //                     title={I18n.t('Phone Number')}
        //                     placeholder={I18n.t('Phone Number')}
        //                     maxLength={10}
        //                     keyboardType="numeric"
        //                     value={this.state.phoneNo}
        //                     onChangeText={(text) => { this.onValueChange('phoneNo', text); }}
        //                 />
        //                 {this.isFieldInError('phoneNo') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('phoneNo')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                 <Field 

        //                     title={I18n.t('Mobile Number')}
        //                     placeholder={I18n.t('Mobile Number')}
        //                     maxLength={10}
        //                     keyboardType="numeric"
        //                     value={this.state.mobileNumber}
        //                     onChangeText={(text) => { this.onValueChange('mobileNumber', text); }}
        //                 />
        //                 {this.isFieldInError('mobileNumber') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('mobileNumber')}</Text> 
        //                     : 
        //                     null 
        //                 }
                       

        //                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        //                {!this.state.checked ? <Text style={styles.TEXT}>this field is required</Text> : null}
        //                  <Checkbox
        //                    title={I18n.t('Terms of Use')}
        //                    checked={this.state.checked}
        //                    onPress={() => this.setState({ checked: !this.state.checked })}
        //                  />
        //                  {this.isFieldInError('checked') ? 
        //                     <Text style={styles.TEXT}>{this.getErrorsInField('checked')}</Text> 
        //                     : 
        //                     null 
        //                 }
        //                  </View>

        //                   {!this.state.loading ?
        //                     <RoundButton
        //                         required= {true}
        //                         title={I18n.t('Submit')}
        //                         onPress={this.submit}
        //                     />
        //                     :
        //                     <ActivityIndicator color="red" />
        //                   }
                        
        //             </Form>
        //         </Content>
        //     </KeyboardAwareScrollView>
         );
    }
}

const styles = StyleSheet.create({
    TEXT: {
        fontSize: 10,
        color: 'red',
         marginHorizontal: 20
    }
});

export default RegisterScreen;
