import React from 'react';

import { observer, inject } from 'mobx-react';
import ValidationComponent from 'react-native-form-validator';
import ChangePasswordForm from '../screens/_Forms/ChangePasswordForm';
import ValidationRules from '../screens/_Forms/ValidationRules';
import ValidationMessages from '../screens/_Forms/ValidationMessages';

import I18n from '../../app/i18n/i18n';

@inject('appStore')
@observer

class ChangePasswordScreen extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    render() {
        const devicLocal = I18n.locale;
        return (
            <ChangePasswordForm
                {...this.props}
                rules={ValidationRules}
                messages={ValidationMessages}
                deviceLocale={devicLocal}
            />

        );
    }
}


export default ChangePasswordScreen;

