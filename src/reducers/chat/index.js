/**
 * Created by vohung on 06/06/2017.
 */
function chat(state = [], action) {
  switch (action.type) {
    case 'CHAT_RECEIVED': {
      console.log('CHAT_RECEIVED reducerrrrr');
      // if (action.msg)
      // return [{a:'asf'}, {b:'asfasdf'}];

      let newState = [];
      if (state) newState = [...state, action.msg];
      else if (action) newState = [action];
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
}

export default chat;
