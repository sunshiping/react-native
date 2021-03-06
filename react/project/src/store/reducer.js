import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,ADD_DEL_ITEM,INIT_LIST_ACTION} from './actionTypes';
const defaultState = {
  inputValue:'',
  list:[]
};
// reducer 可接收state 不可修改
export default (state = defaultState, action) => {

  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    if(newState.inputValue){
      newState.list.push(newState.inputValue);
      newState.inputValue = '';
    }
    return newState
  }
  if (action.type === ADD_DEL_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index,1);
    return newState
  }  
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data;
    return newState
  }  
  return state;
}
