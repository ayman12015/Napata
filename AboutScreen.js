import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { NavBar } from '../components/navbar/NavBar';
import I18n from '../../app/i18n/i18n';
import { RoundButton } from '../components/common/index';

class AboutScreen extends Component {
    static navigationOptions = {
        title: 'About',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 14,
        },
    };

    state = {}
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    centerTitle={I18n.t('About Us')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.goBack()}
                />
                <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginTop: 20, flex: 1 }}>
                    <Image 
                        source={require ('../../assets/icon.png')} 
                    />
                </View>

                <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}> NapataPay </Text>
                </View>

                <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={[styles.text, { fontWeight: '100' }]}> One Wallet All Solutions </Text>
                </View>

                <View style={{ marginLeft: 20, marginTop: 30, flex: 1 }}>
                    
                    <Text style={styles.text}> 
                        <Text style={[styles.text, { fontWeight: 'bold' }]}> NapataPay </Text>
                        is an electronic wallet that makes payment process easy and effective. 
                        Developed by Mazin Developed Projects Co.Ltd. 
                    </Text>

                    <RoundButton title='Privicy poilcy' /> 
                </View>
             
                
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
        color: 'gray',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AboutScreen;
