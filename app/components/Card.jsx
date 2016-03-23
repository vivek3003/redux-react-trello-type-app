import React,{PropTypes} from 'react';
import '../../scss/components/Card.scss';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';
import {moveCard} from '../actions.js';
const cardSource = {
    beginDrag(props) {
        return {
            text: props.text,
            cardId:props.cardId,
            listId:props.listId
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
          props.dispatch(moveCard(item.cardId, item.listId, dropResult.listId));
        }
    }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Card';
    }
    render() {
        const { isDragging, connectDragSource, text } = this.props;
        return connectDragSource(
                <div
                    className='Card'
                    style={{
                        opacity:(isDragging?'0.7':'1'),
                        background:(isDragging?'#AAA':'#FFF')
                        }}
                    >
                    {text}
                </div>
            );
    }
}


Card.propTypes = propTypes;

// Export the wrapped component:
export default connect()(DragSource('CARD', cardSource, collect)(Card));