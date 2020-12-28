import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import PropTypes from 'prop-types';
import actions from 'actions/node/creators';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import UpdateForm from 'components/admin/course/new/Form';
import ActionToggle from 'components/common/toggle/ActionToggle';
import CourseCellAction from 'components/admin/course/search/CourseCellAction';
import { timestampToDateTimeString } from 'common/utils/Date';
import get from 'lodash.get';

const width = {
  name: '20%',
  type: '10%',
  startTime: '15%',
  endTime: '15%',
  transcriptStatus: '10%',
  fileUpload: '10%',
  status: '10%',
  actions: '10%',
};

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };
  updateItem = (item = {}) => {
    const { dispatch } = this.props;

    const node = {
      ...item,
      syllabus: Array.isArray(item.syllabus) ? item.syllabus : [item.syllabus],
      credit_syllabus: Array.isArray(item.credit_syllabus)
        ? item.credit_syllabus
        : [item.credit_syllabus],
    };

    const contentDialog = (
      <UpdateForm
        mode="edit"
        step="offline_exam"
        title={t1('edit_offline_exam')}
        node={node}
        formid="edit_offline_exam"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_offline_exam'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, formid, ntype } = this.props;

    return (
      <div className="table-result" style={{ width: '100%' }}>
        <Table style={{ tableLayout: 'auto' }}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.name} rowSpan={2}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.type} rowSpan={2}>
                {t1('type')}
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={2}>{t1('time')}</TableHeaderColumn>
              <TableHeaderColumn colSpan={2}>
                {t1('transcript')}
              </TableHeaderColumn>
              <TableHeaderColumn
                rowSpan={2}
                width={width.status}
                className="text-center"
              >
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan={2} width={width.actions}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              <TableHeaderColumn width={width.startTime}>
                {t1('start_time')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.endTime}>
                {t1('end_time')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.transcriptStatus}>
                {t1('transcript_status')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.fileUpload}>
                {t1('file_upload')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.name} title={item.name}>
                    <Link
                      to={routes.url('node_edit', {
                        ...item,
                        step: 'dashboard',
                      })}
                    >
                      {item.name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.type} title={item.exam_sub_type}>
                    {`${t1(item.exam_sub_type)} ${(item.exam_resit_nth &&
                      `(#${item.exam_resit_nth})`) ||
                      ''}`}
                  </TableRowColumn>
                  <TableRowColumn width={width.startTime}>
                    {item.start_date &&
                      timestampToDateTimeString(item.start_date)}
                  </TableRowColumn>
                  <TableRowColumn width={width.endTime}>
                    {item.end_date && timestampToDateTimeString(item.end_date)}
                  </TableRowColumn>
                  <TableRowColumn width={width.transcriptStatus}>
                    {item.transcript_status === 'approved'
                      ? t1('approved')
                      : t1('queued')}
                  </TableRowColumn>
                  <TableRowColumn width={width.fileUpload}>
                    {get(item, 'attach_result_files.length') > 0
                      ? t1('uploaded')
                      : t1('empty')}
                  </TableRowColumn>

                  <TableRowColumn width={width.status} className="text-center">
                    <ActionToggle
                      label
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                    />
                  </TableRowColumn>
                  <TableRowColumn width={width.actions}>
                    <CourseCellAction
                      item={item}
                      onEdit={() => this.updateItem(item)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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

export default connect()(Results);
