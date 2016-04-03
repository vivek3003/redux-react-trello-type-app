import React,{PropTypes} from 'react';


export default class PlainCard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'PlainCard';
    }
    render() {
        return (
                <div className='Card'>
                    {this.props.text}
                </div>
            );
    }
}