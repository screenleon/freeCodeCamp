import React from 'react';
import * as serviceWorker from '../serviceWorker';
import PropTypes from 'prop-types';

export class CampSite extends React.Component {
    render() {
        return (
            <div>
                <Camper />
            </div>
        );
    }
};

class Camper extends React.Component {
    render() {
        return (
            <p><strong>Camper Name</strong>: {this.props.name}</p>
        )
    }
}

Camper.defaultProps = {
    name: 'CamperBot'
}

Camper.propTypes = {
    name: PropTypes.string.isRequired
}

serviceWorker.unregister();
