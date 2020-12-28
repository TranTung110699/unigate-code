import Input from './Input';
import addPrefix from './addPrefix';
import makeReduxFormCompatible from './../text/makeReduxFormCompatible';

export default makeReduxFormCompatible(addPrefix(Input));
