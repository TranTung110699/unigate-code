import Core from './Core';
import fetchData from './fetchData';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';

export default makeReduxFormCompatible({})(fetchData(Core));
