/* eslint-disable no-undef,react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
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
import '../style/no-render.css';

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
                      <span Style="display: block; clear: right">
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
    const { resourceAbstractRoles } = this.props;
    return (
      <div className="table-result admin-show-abstract-list">
        <b>{t1('list_of_abstract_roles')}</b>
        {resourceAbstractRoles && resourceAbstractRoles.length ? (
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{t1('abstract_name')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('abstract_code')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('applied_scope')}</TableHeaderColumn>
                <TableHeaderColumn>
                  {t1('module_permissions')}
                </TableHeaderColumn>
                <TableHeaderColumn width={this.width.actions}>
                  {t1('actions')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {resourceAbstractRoles &&
                resourceAbstractRoles.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.code}</TableRowColumn>
                    <TableRowColumn>{item.applied_scope}</TableRowColumn>
                    <TableRowColumn>
                      <DetailOnDialog
                        item={item}
                        textPreview={this.textPreview}
                        renderFull={this.renderFull}
                      />
                    </TableRowColumn>
                    <TableRowColumn width={this.width.actions}>
                      <FlatButton
                        name="submit"
                        type="submit"
                        icon={<Icon icon="plus" />}
                        label={t1('use_role')}
                        disabled={this.state.disableButton}
                        onClick={() => this.handleOnClick(item.iid)}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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
            <span>
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
  fetchData(fetchAbstractRoles)(NoResultsShowAbstractRoles),
);
