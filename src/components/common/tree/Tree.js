import TreeCore from './parts/Core2';
import makeFilterable from './parts/makeFilterable';
import makeUncontrollable from './parts/makeUncontrollable';
import addSelect from './parts/addSelect';

const Tree = makeUncontrollable(makeFilterable(addSelect(TreeCore)));

export default Tree;
