import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import AntTable from 'antd/lib/table';
import { timestampToDateTimeString } from 'common/utils/Date';
import CommentCellAction from './comment/CommentCellAction';

class CommentResults extends Component {
  render() {
    const { items, formid } = this.props;

    const isWithInCourse = lodashGet(this.props, 'course.iid');

    const columns = [
      {
        title: t1('comment'),
        key: 'content',
        dataIndex: 'comment.content',
      },
      ...(!isWithInCourse
        ? [
            {
              title: t1('comment_type'),
              key: 'comment_type',
              dataIndex: 'type',
            },
          ]
        : []),
      {
        title: t1('commentor'),
        key: 'commentor',
        dataIndex: 'u.name',
      },
      {
        title: t1('comment_time'),
        key: 'ts',
        render: (item) => (
          <span>{timestampToDateTimeString(lodashGet(item, 'ts'))}</span>
        ),
      },
      {
        title: t1('action'),
        key: 'action',
        render: (item) => (
          <CommentCellAction
            item={item}
            comment={item.comment}
            formid={formid}
          />
        ),
      },
    ];

    return (
      <div class="whitebox">
        <AntTable
          dataSource={items}
          columns={columns}
          childrenColumnName={null}
          pagination={false}
          rowKey="id"
        />
      </div>
    );
  }
}

CommentResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

CommentResults.defaultProps = {
  items: [],
};

export default CommentResults;
