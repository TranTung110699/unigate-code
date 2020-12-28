/* eslint-disable jsx-a11y/anchor-is-valid,new-parens,no-undef */
import React from 'react';
import get from 'lodash.get';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import Request from 'common/network/http/Request';

const Permission = (WrappedComponent, refetchCondition) =>
  class extends React.Component {
    /**
     * @inheritDoc
     */
    constructor(props) {
      super(props);

      this.state = {
        permissions: {},
      };
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
      this.getData();
    }

    componentWillReceiveProps(nextProps) {
      if (refetchCondition && refetchCondition(this.props, nextProps)) {
        this.getData(nextProps);
      }
    }

    /**
     * Get permissions for user logged
     */
    getData = (nextProps) => {
      const component = new WrappedComponent();
      const props = nextProps || this.props;
      let params = {};
      if (typeof component.getParamsForCheckPermission === 'function') {
        params = component.getParamsForCheckPermission(props);
      }

      Request.post(aApiUrls.has_perms, params).then((res) => {
        if (res.success) {
          this.setState({ permissions: res.result });
        }
      });
    };

    /**
     * Check permission form item with a action or more actions
     *
     * @param action
     * @param resourceIid
     * @param permissions
     * @returns {*}
     */
    hasPermission = (action, resourceIid, permissions) => {
      {
        if (Array.isArray(action)) {
          const length = action.length;
          for (let i = 0; i < length; ++i) {
            if (resourceIid) {
              if (get(permissions, `${resourceIid}.${action[i]}`)) {
                return true;
              }
            } else {
              if (get(permissions, `${action[i]}`)) {
                return true;
              }
            }
          }
          return false;
        }
        if (resourceIid) {
          return get(permissions, `${resourceIid}.${action}`);
        } else {
          return get(permissions, `${action}`);
        }
      }
    };

    /**
     * @returns {*}
     */
    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...this.state}
            hasPermission={(action, resourceIid, permissions) =>
              this.hasPermission(action, resourceIid, permissions)
            }
          />
        </div>
      );
    }
  };

export default Permission;
