import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Content } from 'native-base';

import { NavBar } from '../components/navbar/NavBar';
import I18n from '../i18n/i18n';
import { Checkbox } from '../components/common/index';


class TermScreen extends Component {


    state = {
        checked: false,
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    centerTitle={I18n.t('Terms of Use')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.goBack()}
                />
                <View>
                    <Text style={styles.text}> {I18n.t('Napata Pay Terms and Conditions')} </Text>
                    <Text style={styles.text1}>
                    {I18n.t("Central Bank means Central Bank of Sudan")}
                    
                    </Text>
                     <Text style={styles.text2}>
                     {I18n.t("Service Provider Mazin Developed Projects")} 
                    </Text>
                     
                     <Text style={styles.text4}>
                      {I18n.t("These Terms formerly known as the Statement of Rights and Responsibilities make up the entire agreement between you and Facebook")}
                      {I18n.t("Inc regarding your use of our Products")}
                       {I18n.t("They supersede any prior agreements Some of the Products we offer are also governed by supplemental terms")}
                      
                    </Text>

                   

                </View>
                <Content>
                    <Checkbox
                       title={I18n.t('Accept')}
                       onPress={() => this.setState({ checked: !this.state.checked })}
                      checked={this.state.checked}

                    />

                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        color: 'red',
        padding: 10,
        fontSize:20
    },
    
    text1: {
        color: 'blue',
        padding: 10
    },
     text2: {
        color: 'blue',
        padding: 10,
        fontSize:15
    },
     text3: {
        color: 'blue',
        padding: 10,
        fontSize:15
    },
     text4: {
        color: 'blue',
        padding: 10,
        fontSize:15
    }
});

export default TermScreen;
