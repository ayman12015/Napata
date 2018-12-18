import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

import { Content, Form } from 'native-base';

import Expo from 'expo';

import { NavBar } from '../components/navbar/NavBar';
import { colors } from '../config/colors';
import globalStyle from '../config/styles';
//{colors.statusBarBackgroundColor}
import { RoundButton , Field } from '../components/common/index';
class ForgetPasswordScreen extends Component {
   

 
    render() {
      
        return (
            <View style={globalStyle.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackgroundColor} />

                <NavBar
                    centerTitle='Forget Password'
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.textContainer}>
                    <Text> 
                        Enter your Email below to receive your password reset information 
                    </Text>
                </View>
                <Content>
                    <Form>
                        <Field
                              placeholder='Please enter email'
                              
                        />
                         <RoundButton
                            title='Rest Password'
                            onPress={() => console.log('Pressed')}
                            disabled={!validEmail}
                        /> 
                    </Form>
                </Content>    
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Expo.Constants.statusBarHeight,
    },
    statusBar: {
        backgroundColor: '#C2185B',
        height: Expo.Constants.statusBarHeight,
    },
    textContainer: {
        justifyContent: 'center',
        margin: 40 ,
    },
    text: {
        fontSize: 17,
        color: 'black',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default ForgetPasswordScreen;
