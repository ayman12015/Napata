import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import I18n from '../i18n/i18n';
import UpdatePhoneForm from './_Forms/UpdatePhoneForm';
import ValidationRules from './_Forms/ValidationRules';
import ValidationMessages from './_Forms/ValidationMessages';

@inject('appStore')
@observer
class UpdatePhoneScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        console.log('Update Phone Screen render');
        const devicLocal = I18n.locale;
        return (
            <UpdatePhoneForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            /> 
        );
    }
}



export default UpdatePhoneScreen;
