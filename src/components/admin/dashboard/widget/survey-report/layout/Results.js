import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1, t3 } from 'translate';
import DisplayHtml from 'components/common/html';
import Table from 'antd/lib/table';
import ReactStars from 'react-stars';
import { timestampToDateString } from 'common/utils/Date';
import { getUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';

class Results extends Component {
  render() {
    const { items, star } = this.props;
    const width = {
      user: '20%',
      rating: '10%',
      desciption: '30%',
      course: '20%',
      date: '20%',
    };
    const columns = [
      {
        title: t1('user_commented'),
        key: 'user_commented',
        dataIndex: 'u',
        width: width.user,
        render: (u) => (
          <React.Fragment>
            {u && u.name}
            {u && u.code && ` (${u && u.code})`}
          </React.Fragment>
        ),
      },
      {
        title: t1('rating'),
        key: 'rating',
        dataIndex: 'rating',
        width: width.rating,
        render: (rating) => (
          <React.Fragment>
            {star && (
              <ReactStars
                count={5}
                size={24}
                value={rating || 0}
                edit={false}
                color2={'#ffd700'}
              />
            )}
            {!star && rating}
          </React.Fragment>
        ),
      },
      {
        title: t1('description'),
        key: 'comment',
        dataIndex: 'comment',
        width: width.comment,
        render: (comment) => <DisplayHtml content={comment} />,
      },
      {
        title: t1('course'),
        key: 'course',
        dataIndex: 'course_name',
        width: width.course,
        render: (courseName, item) => (
          <Link to={getUrl(`course/${item.item_iid}`)}>{courseName}</Link>
        ),
      },
      {
        title: t1('date'),
        key: 'date',
        dataIndex: 'ts',
        width: width.date,
        render: (ts) => ts && timestampToDateString(ts),
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
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
