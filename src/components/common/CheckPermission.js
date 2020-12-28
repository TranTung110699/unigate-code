/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import fetchData from 'components/common/fetchData';
import { loadingStatuses } from 'configs/constants';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';

class CheckPermission extends React.PureComponent {
  render() {
    const {
      hasPermission,
      loadingStatus,
      renderOnSuccess,
      renderOnFailure,
    } = this.props;

    if (loadingStatus !== loadingStatuses.FINISHED) {
      return null;
    }

    if (hasPermission) {
      return renderOnSuccess();
    }

    return renderOnFailure();
  }
}

CheckPermission.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string),
  keyState: PropTypes.bool,
  renderOnFailure: PropTypes.func,
  renderOnSuccess: PropTypes.func,
  resources: PropTypes.arrayOf(PropTypes.shape()),
};

CheckPermission.defaultProps = {
  actions: null,
  keyState: '',
  renderOnFailure: null,
  renderOnSuccess: null,
  resources: null,
};

export default fetchData((props) => ({
  baseUrl: aApiUrls.has_permissions,
  params: {
    actions: props.actions,
    resources: props.resources,
  },
  keyState:
    props.keyState ||
    `check_permission_${
      Array.isArray(props.actions) ? props.actions.join() : ''
    }_${
      Array.isArray(props.resources)
        ? props.resources.map((r) => r && r.iid).join()
        : ''
    }`,
  propKey: 'hasPermission',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(CheckPermission);
