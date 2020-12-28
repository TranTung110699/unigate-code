import TreeSelect from './TreeSelect';
import fetchData from './fetchData';
import makeReduxFormCompatible from './makeReduxFormCompatible';

export default makeReduxFormCompatible(fetchData(TreeSelect));
