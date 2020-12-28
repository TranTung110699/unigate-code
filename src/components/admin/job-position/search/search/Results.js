import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Table from 'antd/lib/table';
import { uzeEquivalentJobPositionSystemSelector } from 'common/selectors';
import lodashGet from 'lodash.get';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
// import apiUrls from 'api-endpoints';
import jApiUrls from 'components/admin/job-position/endpoints';
import topEquivalentPositionApiUrls from 'components/admin/top-equivalent-position/endpoints';
import { Link } from 'react-router-dom';
import routes from 'routes';
// import {
//   TableHeaderColumn,
//   TableRowColumn,
// } from '../../../../common/mui/Table';

class Results extends Component {
  width = {
    actions: '10%',
  };

  render() {
    const {
      items,
      searchFormId,
      uzeEquivalentJobPositionSystem,
      node,
    } = this.props;

    const isFilterByEquivalentPosition =
      node && node.ntype === 'top-equivalent-position';

    let isMultiLevelEquivalent = false;

    if (items && items[0]) {
      isMultiLevelEquivalent = items[0].isMultiLevelEquivalent || false;
    }

    const columns = [
      {
        title: `${t1('name')} (${t1('code')})`,
        key: 'code',
        render: (item) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, {
                ntype: 'category',
                type: 'job_position',
              }),
            )}
          >
            {item.name}
            {item.code && <span className="text-muted"> ({item.code})</span>}
          </Link>
        ),
      },
      ...(uzeEquivalentJobPositionSystem && isMultiLevelEquivalent
        ? [
            {
              title: t1('equivalent_position'),
              key: 'equivalent_position',
              render: (item) =>
                lodashGet(
                  item,
                  '__expand.equivalent_position.VTRICDANH_TDUONG',
                ),
            },
          ]
        : []),
      ...(uzeEquivalentJobPositionSystem
        ? [
            {
              title: t1(
                isMultiLevelEquivalent
                  ? 'evn_equivalent_position'
                  : 'equivalent_position',
              ),
              key: 'uzeEquivalentJobPositionSystem',
              render: (item) =>
                lodashGet(
                  item,
                  isMultiLevelEquivalent
                    ? '__expand.evn_equivalent_position.CDANHTDUONG_EVN'
                    : '__expand.top_equivalent_position.CDANHTDUONG_EVN',
                ),
            },
          ]
        : []),
      {
        title: t1('organization'),
        key: 'organization',
        render: (item) =>
          lodashGet(item, '__expand.organizations') &&
          lodashGet(item, '__expand.organizations').map((organization) => (
            <p>{`${organization.name}`}</p>
          )),
      },
      {
        title: t1('action'),
        key: 'action',
        width: this.width.actions,
        render: (item) => (
          <React.Fragment>
            {!isFilterByEquivalentPosition ? (
              <DeleteItem
                title={t1('remove')}
                alternativeApi={jApiUrls.job_position_delete}
                textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                  item.name,
                ])}
                formid={searchFormId}
                ntype={'job_position'}
                itemId={item.id}
              />
            ) : (
              <DeleteItem
                title={t1('detach')}
                alternativeApi={
                  topEquivalentPositionApiUrls.evn_equivalent_position_detach
                }
                textConfirm={t1(
                  'are_you_sure_you_want_detach_%s_from_this_equivalent_position?',
                  [item.name],
                )}
                formid={searchFormId}
                ntype={'job_position'}
                itemId={item.id}
                icon={'detach'}
                params={{
                  equivalentPositionIid: node && node.iid,
                }}
              />
            )}
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

const mapStateToProps = (state) => ({
  uzeEquivalentJobPositionSystem: uzeEquivalentJobPositionSystemSelector(state),
});

export default connect(mapStateToProps)(Results);
