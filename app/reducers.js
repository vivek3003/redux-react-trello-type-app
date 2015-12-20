import  {ADD_LIST, ADD_CARD} from './actions';
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
        default:
            return state
    }
}
