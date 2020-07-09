import React from 'react';
import * as serviceWorker from '../serviceWorker';

class ReturnTempPassword extends React.Component {
    render() {
        return (
            <div>
                <p>Your temporary password is: <strong>{this.props.tempPassword}</strong></p>
            </div>
        );
    }
};

export class ResetPassword extends React.Component {
    render() {
        return (
            <div>
                <h2>Reset Password</h2>
                <h3>We've generated a new temporary password for you.</h3>
                <h3>Please reset this password from your account settings ASAP.</h3>
                <ReturnTempPassword tempPassword={'12345678'} />
            </div>
        );
    }
};

serviceWorker.unregister();