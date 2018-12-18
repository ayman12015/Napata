import React, { Component } from 'react';
import { Content, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
//import { Text, View, FlatList} from 'react-native';
  
import { NavBar } from '../components/navbar/NavBar';
import { RoundButton, Field } from '../components/common/index';
import styles from '../config/styles';


class TestAxios extends Component {

    state = {
        id:'',
    }

    handelDelete = () => {
        console.log(' Delete user from axios start handel Delete by id ');
        axios.delete(`http://10.0.3.2:3000/users/${this.state.id}`)
            .then((res) => {
                
                console.log(res);
                const user = res.data;
                console.log(user);
                console.log('Delete user');
            })
            .catch((error) => {
            console.log(error);
            });
     };

    

  render() {
    return (
        <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
        >
                <NavBar
                    centerTitle='Delete Axios Test'
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.navigate('Home')}
                />
                <Content>
                    <Form>
                        <Field 
                            title='User Id'
                            onChangeText={(id) => this.setState({ id })}
                            value={this.state.id}
                        />     
                        <RoundButton
                            title='Delete'
                            onPress={ this.handelDelete}
                        />
                    </Form>
                </Content>
        </KeyboardAwareScrollView> 
    );
  }
}

export default TestAxios;
