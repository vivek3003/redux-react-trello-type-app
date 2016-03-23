import React from 'react';

import Card from './Card.jsx';
import AddCard from './AddCard.jsx';

import { connect } from 'react-redux'
import { addCard } from '../actions'

import '../../scss/components/List.scss';
import { DropTarget } from 'react-dnd';

const listTarget ={
  canDrop(props, monitor){
    var card = monitor.getItem();
    var currentListId = props.listId;
    //return true;
    return (card.listId !== currentListId);
  },
  drop(props) {
    return { listId: props.listId };
  }
};

class ListDropArea extends React.Component{
  render(){
    const { isOver, canDrop, connectDropTarget } = this.props;
    var dropAreaStyles = {
      height:'0px'
    }

    if(canDrop){
      dropAreaStyles['height'] = '60px';
      dropAreaStyles['background'] = '#888';
    }

    if(isOver && canDrop){
      dropAreaStyles['background'] = '#0FC34A';
      dropAreaStyles['opacity'] = '0.9';
    }

    return connectDropTarget(
        <div className='DropArea' style={dropAreaStyles}></div>
    )
  }
}

const ListDrop = DropTarget('CARD', listTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(ListDropArea)

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var cards = this.props.cards.map((card)=> {
                return (<Card text={card.text} key={card.id} cardId={card.id} listId={this.props.listId} />);
              });

    return (
 	    <div className='List'>
	      	<p className='List-Title'>{this.props.title}<span className='List-Count'>{ this.props.cards.length }</span></p>
          <div className='List-Container'>
            <div>
              <ListDrop listId={this.props.listId} />
            </div>
            {cards}
	      	</div>

	      	<div className='List-Footer'>
	      		<AddCard listId={this.props.listId}/>
	      	</div>
    	</div>
    );
  }
}


export default List;