import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PropTypes from 'prop-types';
import { getThemeConfigSelector } from 'utils/selector';
import { schoolTypes } from 'configs/constants';
import Table from 'antd/lib/table';
import lodashGet from 'lodash.get';
import Status from 'components/common/Status';
import { timestampToDateTimeString } from 'common/utils/Date';

const renderTime = (item, start) => {
  let ts;
  if (start) {
    ts = lodashGet(item, 'start_time');
  } else {
    ts = lodashGet(item, 'end_time');
  }

  let style = null;
  let title = '';
  if (item.ongoing_status === 'ongoing') {
    style = { color: 'green', fontWeight: 'bold' };
    title = t1('contest_is_ongoing');
  } else if (item.ongoing_status === 'soon') {
    style = { color: 'orange' };
    title = t1('contest_is_starting_soon');
  } else if (item.ongoing_status === 'finished') {
    style = { color: 'green' };
    title = t1('contest_is_finished');
  }

  return (
    <span title={title} style={style}>
      {timestampToDateTimeString(ts, { showTime: false })}
    </span>
  );
};

class Results extends Component {
  render() {
    const { items, formid, ntype, isSIS } = this.props;
    const codeLabel = t1('code');
    const nameLabel = t1('name');
    const organizations = t1('organizations');
    const startTimeLabel = t1('start_time');
    const endTimeLabel = t1('end_time');
    const editContestLabel = t1('edit_contest');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const width = {
      edit: '5%',
      delete: '5%',
    };

    const columns = [
      {
        title: codeLabel,
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <Link
            to={routes.url('node_edit', {
              ...item,
            })}
          >
            {code}
          </Link>
        ),
      },
      {
        title: nameLabel,
        key: 'name',
        dataIndex: 'name',
        render: (name, item) => (
          <Link
            to={routes.url('node_edit', {
              ...item,
            })}
          >
            {name}
          </Link>
        ),
      },
      ...(!isSIS
        ? [
            {
              title: organizations,
              key: 'organizations_name',
              dataIndex: 'organizations_name',
              render: (organizationsName) => organizationsName.join(','),
            },
            // {
            //   title: t1('accessible_in_sub_organizations'),
            //   key: 'accessible_in_sub_organizations',
            //   render: (item) =>
            //     lodashGet(item, 'accessible_in_sub_organizations')
            //       ? t1('yes')
            //       : t1('no'),
            // },
          ]
        : []),
      {
        title: t1('contestants'),
        key: 'contestants',
        render: (item) => <span>{lodashGet(item, 'counter.contestants')}</span>,
      },
      {
        title: startTimeLabel,
        key: 'start_time',
        render: (item) => renderTime(item, 'start'),
      },
      {
        title: endTimeLabel,
        key: 'end_time',
        render: (item) => renderTime(item),
      },
      {
        title: t1('status'),
        key: 'status',
        render: (item) => {
          if (item.ongoing_status === 'finished')
            return <Status text={t1('finished')} status={item.status} />;

          if (item.ongoing_status === 'ongoing')
            return <Status text={t1('ongoing')} status={item.status} bold />;

          return <Status status={item.status} />;
        },
      },
      {
        title: t1('edit'),
        key: 'edit',
        width: width.edit,
        render: (item) => (
          <Link
            to={routes.url('node_edit', {
              ...item,
            })}
          >
            <Icon icon={'edit'} title={editContestLabel} />
          </Link>
        ),
      },
      {
        title: t1('delete'),
        key: 'delete',
        width: width.delete,
        render: (item) => (
          <React.Fragment>
            <DeleteItem
              title={t1('remove_contest')}
              textConfirm={t1(
                'everything_related_to_this_contest_will_be_deleted_and_this_action_is_irreversible',
              )}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
              iconButton
              dialogTitle={`${t1(
                'are_you_sure_you_want_to_remove_this_contest',
              )}?`}
            />
          </React.Fragment>
        ),
      },
    ];
    return (
      <div className="table-result">
        <Table
          dataSource={items}
          columns={columns}
          rowKey="id"
          childrenColumnName={null}
          pagination={false}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => {
  const themeConfig = getThemeConfigSelector(state);

  return {
    isSIS: themeConfig && themeConfig.type === schoolTypes.SIS,
  };
};

export default connect(mapStateToProps)(Results);
