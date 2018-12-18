import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import I18n from '../i18n/i18n';
import UpdateMeterForm from './_Forms/UpdateMeterForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';

@inject('appStore')
@observer
class UpdateMeterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        console.log('Update Meter Screen render');
        const devicLocal = I18n.locale;
        return (
            <UpdateMeterForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            /> 
        );
    }
}



export default UpdateMeterScreen;
