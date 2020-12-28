import TextField from './TextField';
import addPrefix from './addPrefix';
import makeReduxFormCompatible from './makeReduxFormCompatible';

export default makeReduxFormCompatible(addPrefix(TextField));
