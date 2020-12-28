import React, { Component } from 'react';
import Table from 'antd/lib/table';
import FlatButton from 'components/common/mui/NewButton';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import fetchData from 'components/common/fetchData';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import Request from 'common/network/http/Request';
import { userOrgIids } from 'common/selectors';
import DetailOnDialog from 'components/common/detail-on-dialog';
import '../style/no-render.scss';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class NoResultsShowAbstractRoles extends Component {
  width = {
    actions: '20%',
  };

  constructor(props) {
    super(props);
    this.state = { disableButton: false };

    this.renderFull = this.renderFull.bind(this);
    this.textPreview = this.textPreview.bind(this);
  }

  renderFull = ({ closeDialog }, props) => {
    const { item } = props;

    return (
      <div>
        {(() => {
          const permissions = [];
          if (item.module_permissions) {
            for (const index in item.module_permissions) {
              if (item.module_permissions[index].allowed_actions_name) {
                item.module_permissions[index].allowed_actions_name.forEach(
                  (action) => {
                    permissions.push(
                      <span style="display: block; clear: right">
                        {action}
                      </span>,
                    );
                  },
                );
              }
            }
          }

          return permissions.map((permission) => permission);
        })()}
      </div>
    );
  };

  textPreview = () => <Icon icon="view" />;

  handleOnClick = (abstractIid) => {
    const { orgIids, node, type, resourceAbstractRoles } = this.props;
    let abstractIids = [];

    this.setState({ disableButton: true });

    if (abstractIid === 0) {
      abstractIids = resourceAbstractRoles.map(
        (resourceAbstractRole) => resourceAbstractRole.iid,
      );
    } else {
      abstractIids = [abstractIid];
    }

    const params = {
      abstractIids,
      type,
    };

    if (node && !node.domains) {
      params.applied_target_iid = node.iid;
    }

    if (node.organizations && node.organizations.length > 0) {
      params.orgIids = node.organizations;
    } else if (type === 'school' && params.applied_target_iid) {
      params.orgIids = [params.applied_target_iid];
    } else {
      params.orgIids = orgIids;
    }

    Request.post(aApiUrls.abac_role_new_from_abstract, params).then((res) => {
      if (res.success) {
        const { dispatch } = this.props;

        dispatch(actions.snackbar(true, res.message));

        // if (
        //   window.location.pathname ===
        //     getSubMenuLink(node.type || node.ntype, node, 'roles') ||
        //   window.location.pathname ===
        //     getSubMenuLink(node.type || node.ntype, node, 'information/roles')
        // ) {
        window.location.reload();
        // } else {
        //   history.push(getSubMenuLink(node.type || node.ntype, node, 'roles'));
        // }
      }
    });
  };

  render() {
    const { resourceAbstractRoles, isFeatureEnabled } = this.props;

    const columns = [
      {
        title: t1('abstract_name'),
        key: 'abstract_name',
        dataIndex: 'name',
      },
      {
        title: t1('abstract_code'),
        key: 'abstract_code',
        dataIndex: 'code',
      },
      {
        title: t1('applied_scope'),
        key: 'applied_scope',
        dataIndex: 'applied_scope',
        render: (appliedScope) => t1(appliedScope),
      },
      {
        title: t1('module_permissions'),
        key: 'module_permissions',
        render: (item) => (
          <DetailOnDialog
            item={item}
            textPreview={this.textPreview}
            renderFull={this.renderFull}
          />
        ),
      },
      {
        title: t1('actions'),
        key: 'actions',
        width: this.width.actions,
        render: (item) => (
          <FlatButton
            name="submit"
            type="submit"
            icon={<Icon icon="plus" />}
            label={t1('use_role')}
            disabled={this.state.disableButton}
            onClick={() => this.handleOnClick(item.iid)}
          />
        ),
      },
    ];

    return (
      <div className="table-result admin-show-abstract-list">
        <b
          className={
            isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'text-white' : ''
          }
        >
          {t1('list_of_abstract_roles')}
        </b>
        {resourceAbstractRoles && resourceAbstractRoles.length ? (
          <Table
            columns={columns}
            dataSource={resourceAbstractRoles}
            pagination={false}
            rowKey="id"
            childrenColumnName={null}
            className="white-background"
          />
        ) : null}

        <div className="apply_all">
          {resourceAbstractRoles && resourceAbstractRoles.length > 0 && (
            <FlatButton
              name="submit"
              type="submit"
              icon={<Icon icon="plus" />}
              label={t1('use_all_roles')}
              disabled={this.state.disableButton}
              onClick={() => this.handleOnClick(0)}
            />
          )}
          {(!resourceAbstractRoles || resourceAbstractRoles.length <= 0) && (
            <span
              className={
                isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'text-white' : ''
              }
            >
              {t1(
                'no_abstract_role_found_for_this_module_please_ask_the_system_admin_to_setup_first',
              )}
              {/*
              ->{' '}
              <a href={getUrl('abstract-role')} target="_blank">
                {t1('create_new_abstract_role')}
              </a>
                 */}
            </span>
          )}
        </div>
      </div>
    );
  }
}

const fetchAbstractRoles = (props) => ({
  baseUrl: aApiUrls.abstract_role,
  params: {
    type: props.type,
    sub_type: props.node && props.node.sub_type,
    applied_target_iid: props.node && props.node.iid,
  },
  propKey: 'resourceAbstractRoles',
  keyState: 'resource_abstract_roles',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
});

const mapStateToProps = (state) => {
  const orgIids = userOrgIids(state);

  return {
    orgIids: orgIids.length > 1 ? [orgIids[0]] : orgIids,
  };
};

export default connect(mapStateToProps)(
  fetchData(fetchAbstractRoles)(withFeatureFlags()(NoResultsShowAbstractRoles)),
);
