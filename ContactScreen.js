import React, { Component } from 'react';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { observer, inject } from 'mobx-react';


import ValidationComponent from 'react-native-form-validator';
import ContactForm from './_Forms/ContactForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';
import I18n from '../../app/i18n/i18n';

@inject('appStore')
@observer
class ContactScreen extends ValidationComponent {


    static navigationOptions = {
        title: 'Contact Us',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#2F95D6',
        },
        headerTitleStyle: {
            fontSize: 14,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false 
        };
    }
   
    render() {
        const devicLocal = I18n.locale;
        return (
            <ContactForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            />

        );
    }
}



export default ContactScreen;
