import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import I18n from '../i18n/i18n';
import NewCardForm from './_Forms/NewCardForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';


@inject('appStore')
@observer
class NewCardScreen extends Component {

    constructor(props) {
        super(props);
            this.state = {
                loading: false,
            };
    }

    render() {
         console.log('NewMeter Screen render');
        const devicLocal = I18n.locale;
        return (
            <NewCardForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            /> 
        );
    }
}

export default NewCardScreen;
