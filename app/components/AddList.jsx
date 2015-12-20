import React from 'react';
import { connect } from 'react-redux'
import {addList} from '../actions'

const ENTER_KEY = 13;

class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AddList';
    }
    addListToStages(event){
        if(event.keyCode === ENTER_KEY){
            this.props.dispatch(addList(this.refs.add_list.value));
            this.refs.add_list.value = '';
        }
    }
    render() {
        return(
                <div className='List'>
                    <input ref='add_list'
                        className='add_list'
                        placeholder='Add List Title and Click Enter'
                        onKeyUp={(e)=>this.addListToStages(e)}
                    />
                </div>
            );
    }
}

export default connect()(AddList);
