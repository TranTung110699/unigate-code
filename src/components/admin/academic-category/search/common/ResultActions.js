import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';

class ResultActions extends React.Component {
  cssClass = 'admin-academic-category-result-actions';

  render() {
    const { className, item, formid, ntype } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const editAcademicCategoryLabel = t1('edit');
    const removeLabel = t1('remove');

    return (
      <div className={componentClassName}>
        <IconButton
          title={editAcademicCategoryLabel}
          iconClassName="mi mi-edit"
          containerElement={
            <Link
              to={routes.url('node_edit', {
                ...item,
                step: 'info',
                ntype: 'category',
              })}
            />
          }
        />
        {(!Array.isArray(item.children) || item.children.length === 0) && (
          <DeleteItem
            title={removeLabel}
            alternativeApi={apiUrls.category_delete}
            textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [item.name])}
            formid={formid}
            ntype={ntype}
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
