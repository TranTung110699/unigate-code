import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import Link from 'components/common/router/Link';
import routes from 'routes';
import { schoolTypes } from 'configs/constants';
import { displayOrganizationTypeLabel } from 'utils/Util';
import sagaActions from 'actions/node/saga-creators';
import ResultActions from '../common/ResultActions';

import Table from 'antd/lib/table';
import { getThemeConfigSelector } from 'utils/selector';
import lodashGet from 'lodash.get';
import organizationApiUrls from 'components/admin/organization/endpoints';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array.isArray(props.items) ? props.items : [],
      itemsExpanded: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { items } = this.props;
    if (!isEqual(items, nextProps.items)) {
      this.setState({
        items: Array.isArray(nextProps.items) ? nextProps.items : [],
        itemsExpanded: [],
      });
    }
  }

  handleExpandableItem = (expanded, row = {}) => {
    if (!expanded || this.state.itemsExpanded.includes(row.iid)) {
      return;
    }

    const {
      dispatch,
      getOnlyOrganizationWhereUserHasPermission,
      orgTypes,
      hiddenFields,
    } = this.props;

    dispatch(
      sagaActions.getDataRequest(
        {
          url: organizationApiUrls.organization_search,
          executeOnSuccess: (children) => {
            if (!Array.isArray(children) || !children.length) {
              return;
            }
            Object.assign(row, { children });
            this.setState(({ itemsExpanded }) => ({
              itemsExpanded: [...itemsExpanded, row.iid],
            }));
          },
        },
        {
          ...(hiddenFields || {}),
          pIids: [row.iid],
        },
      ),
    );
  };

  render() {
    const {
      formid,
      ntype,
      readOnly,
      renderResultActions,
      themeConfig,
      orgTypes,
      isFeatureEnabled,
    } = this.props;
    const actionsLabel = t1('actions');

    const isEnterprise =
      themeConfig && themeConfig.type === schoolTypes.ENTERPRISE;

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <React.Fragment>
            {readOnly ? (
              code
            ) : (
              <Link
                className={`${this.cssClass}__node-name`}
                to={routes.url(
                  'node_edit',
                  Object.assign({}, item, { ntype: 'category' }),
                )}
              >
                {code}
              </Link>
            )}{' '}
            <span className="text-muted">
              {item.org_id && `(${t1('org_id')}: #${item.org_id})`}
            </span>
          </React.Fragment>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
        render: (name, item) =>
          readOnly ? (
            <h3>{name}</h3>
          ) : (
            <Link
              className={`${this.cssClass}__node-name`}
              to={routes.url(
                'node_edit',
                Object.assign({}, item, { ntype: 'category' }),
              )}
            >
              {name}
            </Link>
          ),
      },
      ...(isEnterprise
        ? [
            {
              title: t1('type'),
              key: 'type',
              dataIndex: 'type',
              render: (type, item) =>
                type === 'organization' && item.sub_type
                  ? displayOrganizationTypeLabel(orgTypes, item.sub_type)
                  : type
                  ? t1(type)
                  : '',
            },
            {
              title: t1('directly_under_unit_/_phongban'),
              key: 'org',
              render: (item) => (
                <div>
                  {item && item.__expand && item.__expand.ancestor_iids && (
                    <OrganizationsOrPhongBan
                      item={item}
                      attr={'ancestor_iids'}
                    />
                  )}
                </div>
              ),
            },
          ]
        : []),
      {
        title: actionsLabel,
        key: 'action',
        render: (item) =>
          renderResultActions ? (
            renderResultActions(item)
          ) : (
            <ResultActions item={item} formid={formid} ntype={ntype} />
          ),
      },
    ];

    const defaultPageSize = 50;
    return (
      <Table
        columns={columns}
        dataSource={this.state.items}
        pagination={
          !Array.isArray(this.state.items) ||
          this.state.items.length <= defaultPageSize
            ? false
            : {
                pageSizeOptions: [30, 50, 100],
                defaultPageSize,
                showSizeChanger: true,
              }
        }
        // childrenColumnName={null}
        onExpand={this.handleExpandableItem}
        className={
          isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'table-border-round'
            : 'white-background'
        }
        indentSize={20}
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state, props) => ({
  themeConfig: getThemeConfigSelector(state),
  orgTypes: lodashGet(state, 'domainInfo.school.org_types'),
});

export default connect(mapStateToProps)(withFeatureFlags()(Results));
