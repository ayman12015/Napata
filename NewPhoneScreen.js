import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import I18n from '../i18n/i18n';
import NewPhoneForm from './_Forms/NewPhoneForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';

@observer
class NewPhoneScreen extends Component {

    
    // static navigationOptions = {
    //     header: null,
    //     headerBackTitle: null

    // };
    constructor(props) {
        super(props);
            this.state = {
                loading: false,
            };
    }

    render() {
        console.log('NewPhones Screen render');
        const devicLocal = I18n.locale;
        return (
            <NewPhoneForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            /> 
        );
    }
}



export default NewPhoneScreen;
