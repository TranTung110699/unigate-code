import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';

class ResultActions extends React.Component {
  cssClass = 'admin-goal-result-actions';

  render() {
    const { className, item, formid } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const editGoalLabel = t1('edit');
    const removeLabel = t1('remove');

    return (
      <div className={componentClassName}>
        <IconButton
          title={editGoalLabel}
          iconClassName="mi mi-edit"
          containerElement={
            <Link
              to={routes.url(
                'node_edit',
                Object.assign({}, item, { ntype: 'goal' }),
              )}
            />
          }
        />
        {!item.job_position && (
          <DeleteItem
            title={removeLabel}
            alternativeApi="/goal/delete"
            textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [item.name])}
            formid={formid}
            ntype="goal"
            itemId={item.id}
          />
        )}
      </div>
    );
  }
}

ResultActions.propTypes = {
  className: PropTypes.string,
};

ResultActions.defaultProps = {
  className: '',
};

export default ResultActions;
