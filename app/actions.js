/* CONSTANTS */
export const ADD_LIST = 'ADD_LIST';
export const ADD_CARD = 'ADD_CARD';
export const MOVE_CARD = 'MOVE_CARD';
//Creators
function addListSync(text, nextListId){
    return {
        type:ADD_LIST,
        text:text,
        id:nextListId
    };
}

export function addList(text) {
    return dispatch => {
        var nextListId = parseInt(window.localStorage['nextListId']) || 0;
        nextListId =  nextListId + 1;
        window.localStorage['nextListId'] = parseInt(nextListId);
        dispatch(addListSync(text, nextListId));
    };
}

function addCardSync(text, listId, nextCardId){
    return {
        type:ADD_CARD,
        text:text,
        listId:listId,
        id:nextCardId
    };
}

export function addCard(text, listId) {
  return dispatch => {
        var nextCardId = parseInt(window.localStorage['nextCardId']) || 0;
        nextCardId =  nextCardId + 1;
        window.localStorage['nextCardId'] = parseInt(nextCardId);
        dispatch(addCardSync(text, listId, nextCardId ));
    };
}

export function moveCard(cardId, oldListId, newListId){
    return {
        type:MOVE_CARD,
        cardId:cardId,
        oldListId:oldListId,
        newListId:newListId
    }
}