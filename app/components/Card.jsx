import React from 'react';
import '../../scss/components/Card.scss';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Card';
    }
    render() {
        return <div className='Card'>{this.props.text}</div>;
    }
}

export default Card;
