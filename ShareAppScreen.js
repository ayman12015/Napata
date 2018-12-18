import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Share,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ShareAppScreen extends Component {
    static navigationOptions = {
        title: 'Share App',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 14,
        },
    };

    state = {}
    onShare(){
        Share.share({
            title: 'Share App',
            url: 'www.youtube.com',
            message: 'Share App'
        },{
            //android
            dialogTitle: 'Share this awesome content',
            //ios
            excludedActivityTypes:[
             'com.apple.UIkit.activity.PostToTwitter'
            ]
        
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.onShare}>
               <View style={styles.myShareIcon}>
                <Icon 
                   style={styles.shareIcon}
                   name="share-alt"
                   color="grey"
                   size={25}

                />
                <Text stle={styles.text}>Share</Text>

               </View>

                </TouchableHighlight>
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

export default ShareAppScreen;
