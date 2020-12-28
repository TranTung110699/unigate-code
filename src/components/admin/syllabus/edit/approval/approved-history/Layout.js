/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table/index';
import { t1 } from 'translate/index';
import { timestampToDateString } from 'common/utils/Date';
import './style.scss';

class ApprovedHistory extends Component {
  render() {
    const { node } = this.props;
    const approvedHistory = node.approved_history || [];

    return (
      <div className="approved-history">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('user_name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('comment')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('date_changed')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {approvedHistory &&
              approvedHistory.map((item) => {
                let status =
                  item.status ||
                  (item.comment && item.comment.syllabus_approval);

                let statusColor = '';
                switch (item.status) {
                  case 'review':
                    statusColor = '';
                    break;
                  case 'approve':
                    if (item.status) {
                      statusColor = '';
                    } else {
                      statusColor = 'comment-approved';
                      status = 'approved';
                    }
                    break;
                  case 'reject':
                    statusColor = 'comment-reject';
                    break;
                  default:
                    statusColor = 'status';
                }

                status = t1(status);

                const comment = item.comment.content || item.comment;

                const classNameCommentRow =
                  item.comment && item.comment.content ? 'comment-row' : '';

                return (
                  <TableRow className={classNameCommentRow}>
                    <TableRowColumn>{`${item.u.name}(${
                      item.u.name
                    })`}</TableRowColumn>
                    <TableRowColumn className={statusColor}>
                      {(() => {
                        if (
                          item.status === 'review' ||
                          item.status === 'approve'
                        ) {
                          return (
                            <div>
                              {t1('invite')}{' '}
                              <span className="strong">{item.to}</span>{' '}
                              {t1(`${item.status}_syllabus`)}{' '}
                              <span className="strong">{item.review}</span>
                            </div>
                          );
                        }

                        return status;
                      })()}
                    </TableRowColumn>
                    <TableRowColumn
                      dangerouslySetInnerHTML={{ __html: comment }}
                    />
                    <TableRowColumn>
                      {timestampToDateString(item.ts)}
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(ApprovedHistory);
