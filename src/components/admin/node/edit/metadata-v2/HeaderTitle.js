import React, { Component } from 'react';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
import WeightToggle from 'components/admin/node/edit/controls/Weight';
import Tooltip from 'antd/lib/tooltip';

const columnHelp = (column, node) => {
  if (column == 'weight')
    return t1('toggle_to_set_all_item_children_to_have_the_same_weight');
  else if (column == 'comment')
    return t1('list_of_all_collaborators_comments_on_the_item');
  else if (column == 'duration') return t1('duration_in_mm:ss_format');
  else if (column == 'sequential')
    return t1('click_to_edit_prerequisite_learning_items');
};

const hasTooltip = (column) => {
  return ['weight', 'duration', 'comment', 'sequential'].includes(column);
};

class HeaderTitle extends Component {
  render() {
    const { column, node, readOnly } = this.props;

    return (
      <div className="text-center">
        <div>
          {t1(column)}{' '}
          {hasTooltip(column) && (
            <Tooltip
              title={columnHelp(column, node)}
              overlayStyle={{ maxWidth: 'unset' }}
              placement="right"
              arrowPointAtCenter={true}
            >
              <Icon
                type="question-circle"
                style={{ color: 'rgba(0,0,0,.45)' }}
              />
            </Tooltip>
          )}
        </div>
        {column == 'weight' && (
          <WeightToggle readOnly={readOnly} node={node} noLabel />
        )}
      </div>
    );
  }
}

export default HeaderTitle;
