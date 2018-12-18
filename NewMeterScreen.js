import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import I18n from '../i18n/i18n';
import NewMeterForm from './_Forms/NewMeterForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';

@inject('appStore')
@observer
class NewMeterScreen extends Component {

    
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
        console.log('NewMeter Screen render');
        const devicLocal = I18n.locale;
        return (
            <NewMeterForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            /> 
        );
    }
}



export default NewMeterScreen;
