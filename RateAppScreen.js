import React, { Component } from 'react';
import {
    View,

    StyleSheet,
    Button
} from 'react-native';

import Rate, { AndroidMarket } from 'react-native-rate';

class RateAppScreen extends Component {
    static navigationOptions = {
        title: 'RateApp',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 14,
        },
        drawerLockMode: 'locked-open',
    };

    constructor(props) {
        super(props);
        this.state = {
            rated: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Button
                        title="Rate App" onPress={() => {
                            const options = {
                                AppleAppID: '2193813192',
                                GooglePackageName: 'com.mazin.userapp',
                                AmazonPackageName: 'com.mazin.userapp',
                                OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
                                preferredAndroidMarket: AndroidMarket.Google,
                                preferInApp: false,
                                openAppStoreIfInAppFails: true,
                                fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
                            };
                            Rate.rate(options, success => {
                                if (success) {
                                    // this technically only tells us if the user successfully
                                    //went to the Review Page. Whether they actually did anything,
                                    // we do not know.
                                    this.setState({ rated: true });
                                    console.log(this.state.rated);
                                }
                            });
                        }
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RateAppScreen;
