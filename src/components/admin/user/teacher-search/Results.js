import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
// import ActionToggle from 'components/common/toggle/ActionToggle';
import PropTypes from 'prop-types';
// import DeleteItem from 'components/common/buttons/DeleteBtnWithConfirmDialog';
// import actions from 'actions/node/creators';
import { Link } from 'react-router-dom';
// import routes from 'routes';
import { reduxForm } from 'redux-form';
// import { layouts } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import { getUrl } from 'routes/links/common';
import Avatar from 'components/common/avatar';

import Table from 'antd/lib/table';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

// import Form from '../new/Form';
// import ChangeUserStatus from '../common/ChangeUserStatus';

const label = {
  iidCode: t1('code'),
  name: t1('name'),
  mail: t1('mail'),
  phone: t1('phone'),
  status: t1('status'),
  role: t1('role'),
  actions: t1('actions'),
  editStaff: t1('edit_staff'),
};

const width = {
  actions: '10%',
  name: '20%',
};

class Results extends Component {
  render() {
    const {
      items,
      formid,
      id,
      themeConfig,
      showEditAccountButton,
      isFeatureEnabled,
    } = this.props;

    const columns = [
      {
        title: label.iidCode,
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <Link to={getUrl('admin_view_teacher', item)}>{code}</Link>
        ),
      },
      {
        title: label.name,
        key: 'name',
        dataIndex: 'name',
        width: width.name,
        render: (name, item) => (
          <React.Fragment>
            <Avatar user={item} />
            &nbsp; {name} <span className="text-muted">{item.iid}</span>
          </React.Fragment>
        ),
      },
      {
        title: label.mail,
        key: 'mail',
        dataIndex: 'mail',
      },
      {
        title: label.phone,
        key: 'phone',
        dataIndex: 'phone',
      },
      {
        title: label.role,
        key: 'role',
        dataIndex: 'roleNames',
        render: (roleNames) =>
          Array.isArray(roleNames) ? roleNames.join(', ') : null,
      },
      {
        title: label.actions,
        key: 'action',
        width: width.actions,
        render: (item) =>
          showEditAccountButton ? (
            <Link to={getUrl('admin_view_teacher', item)}>
              <IconButton
                title={t1('edit_user_account_information')}
                iconClassName="mi mi-edit"
              />
            </Link>
          ) : null,
      },
    ];
    return (
      <Table
        dataSource={items}
        columns={columns}
        pagination={false}
        childrenColumnName={null}
        rowKey="id"
        className={
          isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'table-border-round'
            : 'white-background'
        }
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'teacher_school_search_result',
  })(withFeatureFlags()(Results)),
);
