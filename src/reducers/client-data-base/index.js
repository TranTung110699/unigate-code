import { dataActionTypes } from 'actions/rc-node-data';

const clientDataBaseState = {};

const ClientDataBase = (state = clientDataBaseState, action) => {
  let newState = {};
  switch (action.type) {
    case dataActionTypes.STORE_DATA_USING_NAMESPACE:
      const { values, namespace } = action;
      newState = {
        ...state,
        [namespace]: values,
      };
      break;
    case dataActionTypes.STORE_SINGLE_DATA:
      const { value } = action;
      const id = value.iid || value._id || value.id;
      newState = {
        ...state,
        [id]: value,
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default ClientDataBase;
