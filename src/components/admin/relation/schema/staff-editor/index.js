/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import { Element } from 'schema-form/elements';
import 'components/admin/invite/new/stylesheet.scss';
import { t1 } from 'translate';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import fetchData from 'components/common/fetchData';
import './stylesheet.scss';

class UserEditor extends React.Component {
  cssClass = 'admin-staff-input-auto-complete-result-editor';

  render() {
    const { value, index, onDelete, roleOptions } = this.props;
    const { name, iid } = value;
    return (
      <Paper className={`${this.cssClass}`}>
        <div style={{ width: '100%' }}>
          <div className="row-fluid">
            <div className="col-md-12">
              <div className={`${this.cssClass}__name`}>
                {name} (#
                {iid})
              </div>
            </div>
          </div>
          <div className="row-fluid">
            {Array.isArray(roleOptions) && (
              <div className={'col-md-12'} style={{ padding: '10px' }}>
                <Element
                  schema={{
                    name: 'roles',
                    type: 'multiCheckbox',
                    // inline: true,
                    vertical: true,
                    fullWidth: true,
                    floatingLabelText: t1('roles'),
                    options: roleOptions,
                  }}
                />
              </div>
            )}
          </div>
          <div className={`${this.cssClass}__delete`}>
            <IconDelete
              onClick={() => {
                if (onDelete) {
                  onDelete(value, index);
                }
              }}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

UserEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

UserEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default connect()(
  fetchData((props) => ({
    baseUrl: aApiUrls.get_role_options,
    params: {
      applied_target_iid: props.roleAppliedTargetIid,
      type: props.type || '',
    },
    propKey: 'roleOptions',
    keyState: `new_staff_role_options_${props.roleAppliedTargetIid}`,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(UserEditor),
);
