/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StatusBar
} from 'react-native';

import Expo from 'expo';
import { observer, inject } from 'mobx-react';

import CreditCard from '../components/CreditCard/CreditCard';

import { NavBar } from '../components/navbar/NavBar';

import I18n from '../../app/i18n/i18n';
import { colors } from '../config/colors';

const cardFronImg = require('../../app/images/card-front.png');
const cardBackImg = require('../../app/images/card-back.png');

const extractKey = ({ cardNumber }) => cardNumber;

@inject('appStore')
@observer
class CardsScreen extends Component {
    state = {
        cards: null,
        loading: false,
        error: ''
    }

    componentWillMount() {
        cacheImages([
            require('../../app/images/card-front.png'),
            require('../../app/images/card-back.png'),
        ]);
    }

    componentDidMount() {
        this.loadCards();
    }

    onPress = (card) => {
        this.setState({
            refresh: false
        });

        this.props.navigation.navigate('UpdateCard',
            {
                card,
                onNavigateBack: this.handleOnNavigateBack
            });
    };

    handleOnNavigateBack = (cards) => {
        console.log('handleOnNavigateBack ', cards);
        this.setState({
            cards,
            refresh: true
        });
    }

    loadCards() {
        const { appStore } = this.props;
        this.setState({ loading: true });
        appStore.getCards(appStore.currentUser.userName)
            .then(result => {
                this.setState({
                    cards: result,
                    loading: false,
                    refresh: false
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false
                });
            });
    }

    renderItem = ({ item }) => {
        console.log(item);

        return (
            <TouchableOpacity
                onPress={() => { this.onPress(item); }}
                key={item.cardNumber}
                activeOpacity={0.8}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5
                    }}
                >
                    <CreditCard
                        style={[styles.card]}
                        type={this.state.type}
                        imageFront={cardFronImg}
                        imageBack={cardBackImg}
                        shiny={false}
                        bar={false}
                        number={item.cardNumber}
                        name={item.name}
                        expiry={item.expiryDate}
                    />

                </View>
            </TouchableOpacity >
        );
    }

    render() {
        const { appStore } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.statusBarBackgroundColor}
                />
                <NavBar
                    centerTitle={I18n.t('Manage Cards')}
                    centerStle={{ color: '#fff' }}
                    iconSize={30}
                    leftIcon={I18n.isRTL() ? 'arrow-forward' : 'arrow-back'}
                    leftOnPress={() => this.props.navigation.goBack()}
                    rightIcon='add'
                    rightOnPress={() => {
                        this.setState({
                            refresh: false
                        });

                        this.props.navigation.navigate('NewCard', {
                            onNavigateBack: this.handleOnNavigateBack
                        });
                    }}
                />

                {!this.state.loading && appStore.cards ?

                    < FlatList
                        style={styles.list}
                        data={appStore.cards}
                        renderItem={this.renderItem}
                        keyExtractor={extractKey}
                        extraData={this.state.refresh}
                    />
                    :
                    <ActivityIndicator
                        color='red'
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                }
                {
                    appStore.cards && appStore.cards.length === 0 ?
                        < Text style={styles.text}>
                            {/* TODO: rewrite and translate message */}
                            You haven't added cards yet, to add new card, please press + icon
                        </Text>
                        :
                        null

                }

            </View>
        );
    }
}

function cacheImages(images) {
    return images.map(image => Expo.Asset.fromModule(image).downloadAsync());
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Expo.Constants.statusBarHeight,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    card: {
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    list: {
        marginTop: 5,
        flex: 1,
    },
    row: {
        padding: 15,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#ff7f7f',
        width: Expo.Constants.width - 30
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        color: 'red',
        marginHorizontal: 20,
        fontSize: 20
    }
});

export default CardsScreen;
