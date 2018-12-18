import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker, Item } from 'native-base';
import Expo from 'expo';
import { observer, inject } from 'mobx-react';
import Moment from 'moment';
import { NavBar } from '../components/navbar/NavBar';
import I18n from '../../app/i18n/i18n';
//import globalStyle from '../config/styles';
import axios from '../services/api/axios';
import DisplayModal from './DisplayModal';
import { User } from '../store/UserModel';

const extractKey = ({ transactionsID }) => transactionsID.toString();

@inject('appStore')
@observer
export default class LastTransactionsScreen extends Component {

    state = {
        transactions: null,
        loading: true,
        cards: null,
        selectedCardNumber: '',
        display: false,
        selectedTransaction: null
    }

    componentDidMount() {
        console.log('componentDidMount');
        const { appStore } = this.props;
        console.log('User cards', JSON.stringify(appStore.cards));

        //console.log('User cards', JSON.stringify(this.state.cards));

        if (appStore.cards && appStore.cards.length > 0) {
            console.log('getting transactions for card ', JSON.stringify(appStore.cards[0]));
            this.getTransactionsForCard(appStore.cards[0].cardNumber);
        }
    }

    onPress = (transaction) => {
        console.log(transaction);
        this.triggerModal(transaction);
    }

    onValueChange(value) {
        this.setState({
            selectedCardNumber: value
        });

        this.getTransactionsForCard(value);
    }

    setModalVisible(visible) {
        this.setState({ display: visible });
    }

    getTransactionsForCard(cardNumber) {
        this.setState({
            loading: true,
        });

        axios.get(`/user/transcations/${cardNumber}`)
            .then(res => {
                const transactions = res.data;
                this.setState(
                    {
                        transactions,
                        loading: false
                    });
                console.log(transactions);
            })
            .catch(err => {
                console.log(err);
                this.setState(
                    {
                        loading: false
                    });
            });
    }


    triggerModal = (transaction) => {
        console.log('Trans: ', transaction);
        this.setState({
            selectedTransaction: transaction,
            display: true,

        });
    }

    renderItem = ({ item }) => {
        console.log('start rendering', item);

        return (
            <TouchableOpacity
                onPress={() => { this.onPress(item); }}
                key={item.transactionsID}
                activeOpacity={0.8}
            >

            <View
                style={{
                     flex: 1,
                     justifyContent: 'center',
                     alignItems: 'center',
                     paddingVertical: 6,
                     flexDirection: 'row',
                     marginLeft: 5
                    }}
            >

                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 44 }}>
                        {Moment(item.CreatedOn).format('d MMM')}
                    </Text>

                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 44 }}>
                        {item.cardNumber}
                    </Text>

                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 44 }}>
                        {item.paymentService}
                    </Text>

                    <Text style={{ fontSize: 12, color: 'black', paddingRight: 44 }}>
                        {item.Amount} {'\n'}
                        <Text style={{ fontSize: 16, color: 'blue' }}>SDG</Text>
                    </Text>

                           {item.Status === 'Successful' ?
                    <Icon
                        name='check-circle'
                        color='#ff0000'
                    />

                        :
                        <Icon
                           name='cancel'
                           color='#008000'
                        />
 
                      } 

                </View>

            </TouchableOpacity>
        );
    };

    render() {
        const { appStore } = this.props;
        const cardItems = appStore.cards.map((card, i) => 
        <Picker.Item 
        key={card.cardNumber} 
        value={card.cardNumber} label={card.cardNumber}
        />);
        return (


            <View style={styles.container}>
                <NavBar
                    centerTitle={I18n.t('Last Transactions')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon='menu'
                    leftOnPress={() => this.props.navigation.openDrawer()}

                />

                {/* checking cards length
            if there are more than one card  
            Picker with card numbers
            onchange call axios with selected cardnumberr
              
            */}

                {
                    //var
                    appStore.cards && appStore.cards.length > 1 ?


                        //i Tested what next??

                        <Item picker style={{ marginLeft: 10, height: 70, marginTop: 20 }}>
                            <Picker

                                mode="dropdown"
                                style={{ borderWidth: 1, borderColor: 'red', position: 'absolute', bottom: 0, left: 0, right: 0 }}
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined, color: '#0c5f97' }}
                                placeholder={I18n.t('Select Card')}
                                placeholderStyle={{ color: '#bfc6ea' }}//ok next?
                                placeholderIconColor="#007aff"
                                onValueChange={this.onValueChange.bind(this)} // ok
                                selectedValue={this.state.selectedCardNumber}

                            >
                                {cardItems}
                            </Picker>
                        </Item>
                        :
                        null 

                }
                

                    {appStore.cards && appStore.cards.length === 1 && this.state.loading  ?

                     <View 
                        style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        }}
                     > 
                        <Text  
                        style={{ color: 'gray', justifyContent: 'center' }}
                        >
                        {appStore.cards[0].cardNumber} </Text>
                    </View>
                        :
                        null
                    }

                {appStore.cards && appStore.cards.length === 0 && this.state.loading ?
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingVertical: 6,
                            flexDirection: 'row',
                            marginLeft: 5
                            }}
                    >
                        <Text style={styles.text}>Sorry You Have No Card...! </Text>
                    </View>
                        
                        :
                        null
                }

                {!this.state.loading && this.state.transactions  ?
                    < FlatList
                        style={styles.list}
                        data={this.state.transactions}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}

                    />
                    :
                    <ActivityIndicator
                        color='blue'
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                }

               
                {this.state.transactions && this.state.transactions.length === 0 ?
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingVertical: 6,
                            flexDirection: 'row',
                            marginLeft: 5 }}
                    >
                        <Text style={styles.text}> There is no transactions... </Text>
                    </View>

                    :
                    null

                }


                <DisplayModal
                    item={this.state.selectedTransaction}
                    display={this.state.display}
                    onclose={() => {
                        this.setState({
                            display: false,
                        });
                    }}
                />


            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
     views: {


     },
    list: {
        marginTop: 5,
        flex: 1,
    },
    nestedViewStyle: {
        width: 50,

        marginVertical: 3,
    },
    text: {
        fontSize: 16,
        color: 'blue',
        justifyContent: 'center',
        marginTop: 2,

        textAlign: 'center',
     
        flexDirection: 'row'

    }

});


// Testing Scenarios
// User has no cards
// 	Display message {you have no cards}	

// User has only one card
// 	Display card number
// 	Display card transactions
// 		If there are no transactions display message {No transactions}

// User has many cards
// 	Display picker with card numbers
// 	Display card transactions for first card
// 		If there are no transactions for selected card display message {No transactions}

//create 3 user for testing 
//1. user name [ali]
//2. user name [osman]
//3. userr name [test]
