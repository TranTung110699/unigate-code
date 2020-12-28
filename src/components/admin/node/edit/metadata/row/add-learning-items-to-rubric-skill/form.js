import React from 'react';
import PropTypes from 'prop-types';
import { change, reduxForm } from 'redux-form';
import fetchNodes from 'components/common/fetchNodes';
import { filterTree, mapTree } from 'common/utils/object';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import TreeCheckbox from 'schema-form/elements/tree-check-box/new';

class AddItemToSyllabusSkill extends React.Component {
  cssClass = 'admin-add-item-to-credit-rubric';

  componentWillMount() {
    const { form, skill, dispatch } = this.props;
    const defaultValue =
      skill &&
      Array.isArray(skill.learning_items) &&
      skill.learning_items
        .map((learningItem) => parseInt(learningItem.iid, 10))
        .filter((iid) => !isNaN(iid));
    dispatch(change(form, 'learningItems', defaultValue));
  }

  render() {
    const { node, handleSubmit } = this.props;
    let children = node && node.children;
    if (Array.isArray(children)) {
      children = children
        .map((child) => {
          let newChild = filterTree(
            child,
            (item) => item && ['sco', 'exercise'].includes(item.ntype),
          );
          newChild = mapTree(newChild, (item) => {
            return {
              ...item,
              title: item.name,
              value: item.iid,
              key: item.iid,
            };
          });
          return newChild;
        })
        .filter((child) => typeof child !== 'undefined');
    }

    if (!Array.isArray(children) || children.length === 0) {
      return t1('there_are_no_addable_items');
    }

    return (
      children.length > 0 && (
        <div>
          <Element
            schema={{
              name: 'learningItems',
              type: TreeCheckbox,
              checkParentEqualCheckAllChildren: false,
              multiSelectable: false,
              treeData: children,
            }}
          />
          <RaisedButton primary label={t1('update')} onClick={handleSubmit} />
        </div>
      )
    );
  }
}

AddItemToSyllabusSkill.propTypes = {
  className: PropTypes.string,
};

AddItemToSyllabusSkill.defaultProps = {
  className: '',
};

export default fetchNodes([
  {
    nodePropName: 'node',
    depth: -1,
    fullNodePropName: 'node',
  },
])(reduxForm({})(AddItemToSyllabusSkill));
