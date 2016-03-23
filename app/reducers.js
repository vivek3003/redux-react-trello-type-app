import  {ADD_LIST, ADD_CARD, MOVE_CARD} from './actions';
import assign from 'object-assign';

const initialState = window.localStorage['state']?window.JSON.parse(window.localStorage['state']) : { lists:[] };

export function trelloApp(state = initialState, action){
    switch(action.type){
        case ADD_LIST:
            return assign({}, state, {
                lists: [
                    ...state.lists,
                    {
                        id:action.id,
                        text: action.text,
                        cards:[]
                    }
                ]
            });
        case ADD_CARD:
            let list_index = action.listId - 1;
            return assign({}, state, {
                    lists: [
                        ...state.lists.slice(0, list_index),
                        assign({}, state.lists[list_index], {
                            id:state.lists[list_index].id,
                            text:state.lists[list_index].text,
                            cards:[
                                ...state.lists[list_index]['cards'],
                                {
                                    id:action.id,
                                    text:action.text
                                }
                           ]
                        }),
                        ...state.lists.slice(list_index + 1)
                    ]
                });
        case MOVE_CARD:
            var old_list_index = state.lists.findIndex(function(list){
                return (list.id === action.oldListId)
            });

            var new_list_index = state.lists.findIndex(function(list){
                return (list.id === action.newListId)
            });

            var card_index = state.lists[old_list_index]['cards'].findIndex(function(card){
                return (card.id === action.cardId);
            })

            var moved_card = assign({}, state.lists[old_list_index]['cards'][card_index]);

            var newCards = state.lists[old_list_index]['cards'].slice();
            newCards.splice(card_index,1);

            var stateAfterDeletion =  assign({}, state, {
                lists: [
                    ...state.lists.slice(0, old_list_index),
                    assign({}, state.lists[old_list_index], {
                        id:state.lists[old_list_index].id,
                        text:state.lists[old_list_index].text,
                        cards:newCards
                    }),
                    ...state.lists.slice(old_list_index + 1)
                ]
            });

            return  assign({}, stateAfterDeletion, {
                    lists: [
                        ...stateAfterDeletion.lists.slice(0, new_list_index),
                        assign({}, stateAfterDeletion.lists[new_list_index], {
                            id:stateAfterDeletion.lists[new_list_index].id,
                            text:stateAfterDeletion.lists[new_list_index].text,
                            cards:[
                                moved_card,
                                ...stateAfterDeletion.lists[new_list_index]['cards']
                           ]
                        }),
                        ...stateAfterDeletion.lists.slice(new_list_index + 1)
                    ]
                });
        default:
            return state
    }
}
