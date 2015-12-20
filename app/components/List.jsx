import React from 'react';

import Card from './Card.jsx';
import AddCard from './AddCard.jsx';

import { connect } from 'react-redux'
import { addCard } from '../actions'

import '../../scss/components/List.scss';

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var cards = this.props.cards.map((card)=> {
                return (<Card text={card.text} key={card.id} />);
              })
    return (
 	    <div className='List'>
	      	<p className='List-Title'>{this.props.title}<span className='List-Count'>{ this.props.cards.length }</span></p>
	      	<div className='List-Container'>
            {cards}
	      	</div>
	      	<div className='List-Footer'>
	      		<AddCard listId={this.props.listId}/>
	      	</div>
    	</div>
    );
  }
}
