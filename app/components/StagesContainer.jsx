import React from 'react';
import List from './List.jsx';
import AddList from './AddList.jsx';

import '../../scss/components/StagesContainer.scss';

export default class StagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var lists = this.props.lists.map(list => {
                  return (<List key={list.id} listId={list.id} cards={list.cards} title={list.text}/>)
                });
    return (
      <div className='StagesContainer'>
        {lists}
        <AddList currentListLength={this.props.lists.length}/>
      </div>
    );
  }
}