import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { addCard } from '../actions'

import '../../scss/components/Card.scss';

const ENTER_KEY = 13;

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'clicked':false}
  }
  toggleAddCard(){
  	this.setState({'clicked':!this.state.clicked});
    setTimeout(()=>{
      //Need somethin better here :/
      this.addCardInput.focus();
    },1)
  }
  addCardToList(listId, event){
    if(event.nativeEvent.type == 'keyup' && event.keyCode === ENTER_KEY || event.nativeEvent.type == 'click' ){
        this.props.dispatch( addCard(this.addCardInput.value, listId) );
        this.addCardInput.value = '';
    }
  }
  render() {
  	var classes = ['AddCard'];
  	if(this.state.clicked){
  		classes.push('clicked');
  	}
  	classes = classes.join(' ');
    return (
      <div className={classes}>
      	<p onClick={this.toggleAddCard.bind(this)}>Add Card</p>
      	<div className='AddCard-Input-Container'>
      		<input 	type='text'
                onKeyUp={(evt) => this.addCardToList(this.props.listId, evt)}
                className='AddCard-input'
                ref={(ref) => this.addCardInput = ref}
                placeholder='Input Here'
              />
      		<br />
      		<button className='btn' onClick={(evt) => this.addCardToList(this.props.listId, evt, this)}>Add</button>
      		<button className='btn btn-danger' onClick={this.toggleAddCard.bind(this)}>Cancel</button>
      	</div>
      </div>
    );
  }
}

export default connect()(AddCard);