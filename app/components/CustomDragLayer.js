import React, { PropTypes } from 'react';
import PlainCard from './PlainCard.jsx';
import { DragLayer } from 'react-dnd';
import {shallowEqual} from '../utils/shallowEqual';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset, initialOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends React.Component{
  renderItem(type, item) {
    switch (type) {
      case 'CARD':
        return (
          <div className='Card--wrap'>
            <PlainCard text={item.text} listId={item.listId} cardId={item.cardId} />
          </div>
        );
      default:
        return null;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }
  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);