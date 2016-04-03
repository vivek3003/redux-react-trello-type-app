import React,{PropTypes} from 'react';
import '../../scss/components/Card.scss';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';
import {moveCard} from '../actions.js';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PlainCard from './PlainCard.jsx';
import {shallowEqual} from '../utils/shallowEqual';

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
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
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
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
               !shallowEqual(this.state, nextState);
    }
    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        this.props.connectDragPreview(getEmptyImage(), {
          // IE fallback: specify that we'd rather screenshot the node
          // when it already knows it's being dragged so we can hide it with CSS.
          captureDraggingState: true
        });
    }
    render() {
        const { isDragging, connectDragSource, text } = this.props;
        return connectDragSource(
                <div
                    style={{
                        opacity:(isDragging?'0.4':'1'),
                        background:(isDragging?'#AAA':'#FFF')
                        }}
                    >
                    <PlainCard {...this.props}/>
                </div>
            );
    }
}


Card.propTypes = propTypes;

// Export the wrapped component:
export default connect()(DragSource('CARD', cardSource, collect)(Card));