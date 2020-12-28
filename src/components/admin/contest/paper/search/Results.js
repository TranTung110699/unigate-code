import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import routes from 'routes';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import Editable from 'components/common/forms/editable';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'components/common/mui/Table';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import get from 'lodash.get';
import SuccessAlert from '../../../../common/SuccessAlert';
import Warning from '../../../../common/Warning';
import { timestampToDateTimeString } from 'common/utils/Date';
import Table from 'antd/lib/table';

class Results extends Component {
  actionToggleStyle = { maxWidth: 150 };
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const {
      items,
      formid,
      enabledSetPaperPrice,
      enabledSetFeaturedPaper,
      isRoot,
    } = this.props;
    const previewLabel = t1('preview');

    const columns = [
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('exam_duration'),
        key: 'duration',
        // dataIndex: 'code',
        render: (item) => <span>{get(item, 'test_rule.duration')}</span>,
      },
      {
        title: t1('number_of_parts'),
        key: 'number_of_parts',
        // dataIndex: 'code',
        render: (item) => <span>{get(item, 'number_of_parts')}</span>,
      },
      {
        title: t1('number_of_questions'),
        key: 'number_of_questions',
        // dataIndex: 'code',
        render: (item) => <span>{get(item, 'number_of_questions')}</span>,
      },
      {
        title: t1('total_score'),
        key: 'total_score',
        // dataIndex: 'code',
        render: (item) => <span>{get(item, 'total_score')}</span>,
      },
      {
        title: t1('status'),
        key: 'status',
        // dataIndex: 'code',
        render: (item) => (
          <div>
            {/*
            {item.status === 'approved' ? (
              <SuccessAlert>{t1('approved')}</SuccessAlert>) : (
              <Warning>{t1('deleted')}</Warning>
            )}
             */}
            <ActionToggle
              style={this.actionToggleStyle}
              baseURL={routes.url('node_update', {
                ...item,
                step: 'status',
                ntype: 'paper',
              })}
              dataSet={this.actionToggleDataSet}
              value={item.status || 'queued'}
              name="status"
            />
          </div>
        ),
      },
      {
        title: t1('created_date'),
        key: 'ts',
        // dataIndex: 'code',
        render: (item) => <span>{timestampToDateTimeString(item.ts)}</span>,
      },
      {
        title: t1('action'),
        key: 'action',
        // dataIndex: 'code',
        render: (item) => (
          <div>
            <Link
              to={Links.previewPaper(item.syllabus_iid, item.id)}
              target="_blank"
            >
              <IconButton
                title={previewLabel}
                iconClassName="mi mi-remove-red-eye"
              />
            </Link>{' '}
            <span className="m-l-20">
              <DeleteItem
                formid={formid}
                ntype="paper"
                itemId={item.id}
                params={{ _sand_purge: 1 }}
              />
            </span>
          </div>
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
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

const populateStateToProps = (state, props) => {
  return {
    enabledSetPaperPrice:
      state.domainInfo &&
      state.domainInfo.conf &&
      state.domainInfo.conf.enable_set_paper_price,
    enabledSetFeaturedPaper:
      state.domainInfo &&
      state.domainInfo.conf &&
      state.domainInfo.conf.enable_set_featured_paper,
    isRoot: get(state, 'domainInfo.isRoot'),
  };
};

export default connect(populateStateToProps)(Results);
