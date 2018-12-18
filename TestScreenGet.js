import React, { Component } from 'react';
import { Content, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import { Text, View, FlatList} from 'react-native';
import { NavBar } from '../components/navbar/NavBar';
import styles from '../config/styles';

const extractKey = ({ id }) => id.toString();

class TestAxios extends Component {

    state = {
        users: [],
        repos: null
    };

    componentDidMount(){
        console.log(' get user from axios start will mount components');
        axios.get(`http://10.0.3.2:3000/users`)
            .then((res) => {

                const users = res.data
                this.setState( users );
                console.log(users);
            })
            .catch((error) => {
            console.log(error);
            });
     };

     renderUser = ({user}) => {
         console.log(' Rendring users ...... Working on that!!' , user)
        return(
            <View style={{ flex: 1, flexDirection: 'row', marginStart: 10, marginEnd: 10 }} >
                <Text style={{ color: 'red'}}>
                  {user.firstName}
                </Text>
                <Text style={{ color: 'red' }}>
                  {user.lastName}
                </Text>
                <Text style={{ color: 'red' }}>
                  {user.age}
                </Text>
            </View>
        ) 
     }

  render() {
    return (
        <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
        >
                <NavBar
                    centerTitle='Get Axios Test'
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.navigate('Home')}
                />
                { this.state.users.length  > 0 && 
                    <FlatList
                        style={{ marginTop: 5, flex: 1 }}
                        data={this.state.users}
                        renderItem={this.renderUser()}
                        keyExtractor={extractKey}
                    />
                }   
        </KeyboardAwareScrollView> 
    );
  }
}

export default TestAxios;
