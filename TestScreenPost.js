import React, { Component } from 'react';
import { Content, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import { Text, View, FlatList} from 'react-native';
  
import { NavBar } from '../components/navbar/NavBar';
import { RoundButton, Field } from '../components/common/index';
import styles from '../config/styles';


class TestAxios extends Component {

    state = {
        firstName:'',
        LastName: '',
        age: '',
        email: '',
        comapnyId:''
    }

   


    handelSubmit = () => {
        console.log(' post user from axios start handel submit ');
        axios.post(`http://10.0.3.2:3000/users`,

            {
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                age: this.state.age,
                email: this.state.email,
                comapnyId: this.state.comapnyId
            })
            .then((res) => {
                console.log(res);
                const user = res.data;
                console.log(user);
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
                    centerTitle='Post Axios Test'
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.navigate('Home')}
                />
                <Content>
                    <Form>
                        <Field 
                            title='First Name'
                            onChangeText={(firstName) => this.setState({ firstName })}
                            value={this.state.firstName}
                        />
                        <Field 
                            title='Last Name'
                            onChangeText={(lastName) => this.setState({ lastName })}
                            value={this.state.lastName}
                        />
                        <Field 
                            title='Age'
                            onChangeText={(age) => this.setState({ age })}
                            value={this.state.age}
                        />
                        <Field 
                            title='Email'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                        <Field 
                            title='Company Id'
                            onChangeText={(comapnyId) => this.setState({ comapnyId })}
                            value={this.state.comapnyId}
                        />     
                        <RoundButton
                            title='SUBMIT'
                            onPress={ this.handelSubmit}
                        />
                    </Form>
                </Content>
        </KeyboardAwareScrollView> 
    );
  }
}

export default TestAxios;
