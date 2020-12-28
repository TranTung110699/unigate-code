import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import fetchNodes from 'components/common/fetchNodes';
import Items from './items';
import SetScale from './set-scale';

class Rubric extends React.Component {
  cssClass = 'skill-rubric-view';

  render() {
    const {
      className,
      controlled,
      defaultMarkingValues,
      mode,
      markingValues,
      node,
      onMarkingOverallValueChange,
      onMarkingValuesChange,
      readOnly,
    } = this.props;
    const componentClass = `${className || ''} ${this.cssClass}`;

    if (mode === 'marking') {
      if (readOnly) {
        // TODO: implement readOnly for mode marking
        return null;
      }
      if (!node.scale) {
        return t1('there_are_no_scale_for_marking');
      }
      return (
        <Items
          onMarkingOverallValueChange={onMarkingOverallValueChange}
          onMarkingValuesChange={onMarkingValuesChange}
          defaultMarkingValues={defaultMarkingValues}
          className={componentClass}
          skill={node}
          mode="marking"
          controlled={controlled}
          markingValues={markingValues}
        />
      );
    }

    if (mode === 'assign_children_score') {
      if (readOnly) {
        // TODO: implement readOnly for mode assign_children_score
        return null;
      }
      return (
        <Items
          onMarkingOverallValueChange={onMarkingOverallValueChange}
          onMarkingValuesChange={onMarkingValuesChange}
          defaultMarkingValues={defaultMarkingValues}
          className={componentClass}
          skill={node}
          mode="assign_children_score"
          controlled={controlled}
          markingValues={markingValues}
        />
      );
    }

    if (!node.scale) {
      return readOnly ? (
        t1('there_are_no_rubric_to_show')
      ) : (
        <SetScale className={componentClass} skill={node} />
      );
    }

    return (
      <Items className={componentClass} skill={node} readOnly={readOnly} />
    );
  }
}

Rubric.propTypes = {
  className: PropTypes.string,
  controlled: PropTypes.bool,
  defaultMarkingValues: PropTypes.shape(),
  markingValues: PropTypes.shape(),
  mode: PropTypes.string,
  node: PropTypes.shape(),
  onMarkingOverallValueChange: PropTypes.func,
  onMarkingValuesChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

Rubric.defaultProps = {
  className: '',
  controlled: false,
  defaultMarkingValues: null,
  markingValues: {},
  mode: '',
  node: null,
  onMarkingOverallValueChange: null,
  onMarkingValuesChange: null,
  readOnly: false,
};

export const PureRubric = Rubric;

export default fetchNodes([
  {
    nodePropName: 'node',
    depth: 1,
    fullNodePropName: 'node',
  },
])(Rubric);
