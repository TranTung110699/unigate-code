import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lGet from 'lodash.get';
import { t1 } from 'translate';
import { TableRow, TableRowColumn } from 'components/common/mui/Table';
import { timestampToDateTimeString } from 'common/utils/Date';
import CommentCellAction from './CommentCellAction';

class DetailComment extends Component {
  render() {
    const { item, index, width, formid } = this.props;
    const comment = lGet(item, 'comment');
    const userName = lGet(item, 'user.name');
    const type = lGet(item, 'type');

    return (
      <TableRow key={comment.id}>
        <TableRowColumn width={width.content}>{comment.content}</TableRowColumn>
        <TableRowColumn width={width.type}>{t1(type)}</TableRowColumn>
        <TableRowColumn width={width.approval}>
          {t1(comment.syllabus_approval)}
        </TableRowColumn>
        <TableRowColumn width={width.commentor}>{userName}</TableRowColumn>
        <TableRowColumn width={width.commentCreateTime}>
          {timestampToDateTimeString(item.ts)}
        </TableRowColumn>
        <TableRowColumn width={width.actions}>
          <CommentCellAction item={item} comment={comment} formid={formid} />
        </TableRowColumn>
      </TableRow>
    );
  }
}

// DetailComment.propTypes = {
//   index: PropTypes.number(),
//   comment: PropTypes.shape(),
// };
//
// DetailComment.defaultProps = {
//   index: null,
//   comment: null,
// };
export default DetailComment;
