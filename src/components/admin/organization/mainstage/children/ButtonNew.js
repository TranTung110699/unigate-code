import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'components/common/mui/NewButton';
import { t, t1 } from 'translate';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import organizationSchema from 'components/admin/organization/schema/form';
import { taphuanSubTypes } from 'configs/constants';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';

import { getSearchFormId } from './common/utils';
import { getOrgTypes } from 'configs/constants';

class DepartmentChildrenNewButton extends React.Component {
  cssClass = 'admin-organization-children-new-form';

  getFormNew = () => {
    const {
      dispatch,
      node,
      childrenOrganizationLevelName,
      orgTypes,
    } = this.props;
    const hiddenFields = {
      orgTypes,
    };

    return (
      <NodeNew
        ntype={'organization'}
        mode={'new'}
        closeModal={false}
        formid={'new_organization_children'}
        searchFormId={getSearchFormId(node)}
        schema={organizationSchema}
        params={{
          pid: node.id,
          identifier: t(childrenOrganizationLevelName),
          type: 'organization',
        }}
        hiddenFields={hiddenFields}
        alternativeApi="/organization/api/new"
      />
    );
  };

  handleAddButtonClick = () => {
    const { dispatch, node, childrenOrganizationLevelName } = this.props;

    const contentDialog = this.getFormNew();

    const optionsProperties = {
      title: t1('new_%s', [t(childrenOrganizationLevelName)]),
      handleClose: true,

      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, childrenOrganizationLevelName, noDialog } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    if (noDialog) {
      return this.getFormNew();
    }

    return (
      <div className={componentClassName}>
        <FlatButton
          icon={<Icon icon="plus" />}
          labelPosition="right"
          label={t1('add_new_%s', [t(childrenOrganizationLevelName)])}
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

const mapStateToProps = (state, props) => {
  const { node } = props;
  const level = (node.level || 0) + 1;
  const childrenOrganizationLevelName = getCategoryStructureLevelNameSelector(
    state,
  )(node.type, level);
  return {
    childrenOrganizationLevelName,
    orgTypes: getOrgTypes(
      state,
      window.isTaphuan && Object.values(taphuanSubTypes).includes(node.sub_type)
        ? 'phongban'
        : '*',
    ),
  };
};

export default connect(mapStateToProps)(DepartmentChildrenNewButton);
