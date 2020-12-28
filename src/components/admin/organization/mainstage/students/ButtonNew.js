import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';
import { categoryRelationTypes, relationTypes } from 'configs/constants';
import schema from 'components/admin/relation/schema/form';

import { getSearchFormId } from './common/utils';

class DepartmentChildrenNewButton extends React.Component {
  cssClass = 'admin-organization-children-new-form';

  handleAddButtonClick = () => {
    const { dispatch, node } = this.props;

    const contentDialog = (
      <NodeNew
        ntype={'relation'}
        schema={schema}
        mode={'new'}
        step="organization_students"
        closeModal
        formid={'new_organization_students'}
        searchFormId={getSearchFormId(node)}
        params={{
          sid: node.iid,
          object: 'user',
          subject: 'category',
          type: categoryRelationTypes.USER_GROUP,
          rt: relationTypes.USER_CATEGORY,
        }}
      />
    );

    const optionsProperties = {
      title: t1('new_students'),
      handleClose: true,

      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <FlatButton
          icon={<Icon icon="plus" />}
          labelPosition="right"
          label={t1('add_new_students')}
          onClick={this.handleAddButtonClick}
        />
      </div>
    );
  }
}

DepartmentChildrenNewButton.propTypes = {
  className: PropTypes.string,
};

DepartmentChildrenNewButton.defaultProps = {
  className: '',
};

export default connect()(DepartmentChildrenNewButton);
