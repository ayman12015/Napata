import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { NavBar } from '../components/navbar/NavBar';
import { RoundButton } from '../components/common/index';
import { Card } from 'native-base';

const CONTENT = [
    {
        title: 'Q:Getting Started to Know NapataPay?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:How do I get PAN?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:How can I get My Password?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:How do I transfer from Card to Card?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:Why am I being asked for add card number before using the app?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribsBacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:How do I transfer from Card to Card?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    },
    {
        title: 'Q:Why am I being asked for add card number before using the app?',
        content: 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribsBacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs',
    }
];


export default class HelpScreen extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    renderHeader = (section, _, isActive) => (
        <Animatable.View
            duration={400}
            style={[styles.header, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor"
        >
            <Text style={styles.headerText}>{section.title}</Text>
        </Animatable.View>
    );

    renderContent(section, _, isActive) {
        return (
            <Animatable.View
                duration={300}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text
                    style={{ color: '#FF9800' }}
                    animation={isActive ? 'bounceIn' : undefined}
                    duration={100}
                    easing="ease-in"
                >
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    render() {
        const { multipleSelect, activeSections } = this.state;
        return (
            <View style={styles.container}>
                <NavBar
                    centerTitle='Help'
                    centerStle={{ color: 'red' }}
                    iconSize={30}
                    leftIcon='arrow-back'
                    leftOnPress={() => this.props.navigation.goBack()}
                />
                <ScrollView contentContainerStyle={{ paddingTop: 30, margin: 8 }}>
                    <Text style={styles.title}>F.A.Q's</Text>
                    <Card>
                        <Accordion
                            activeSections={activeSections}
                            sections={CONTENT}
                            touchableComponent={TouchableOpacity}
                            expandMultiple={multipleSelect}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            duration={100}
                            onChange={this.setSections}
                        //sectionContainerStyle={{ color: '#fff', textAlign: 'center' }}
                        />
                    </Card>
                </ScrollView>
                <View style={{ flex: 2 }}>
                    <Text style={styles.title}>Need more help , don't hesitate to contact us </Text>
                    <RoundButton
                        title='Contact Us'
                    //onPress={this.props.navigation.navigate('Contact')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    title: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '300',
        marginBottom: 20,
        color: '#FF9800'
    },
    header: {
        //backgroundColor: '#000000',
        padding: 10,
    },
    headerText: {
        textAlign: 'justify',
        fontSize: 16,
        fontWeight: '500',
        color: '#FF9800'
    },
    content: {
        padding: 20,
        backgroundColor: 'black',

    },
    active: {
        backgroundColor: 'transparent',

    },
    inactive: {
        backgroundColor: '#d8d1c7db',
    },
    selector: {
        backgroundColor: '#F57C00',
        padding: 10,
    }
});

// export default HelpScreen;
