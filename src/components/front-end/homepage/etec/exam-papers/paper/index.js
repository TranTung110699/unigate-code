/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToDateString } from 'common/utils/Date';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { t1, t3 } from 'translate';
import './stylesheet.scss';

class ExamPager extends Component {
  linkStyle = {
    margin: '0 auto',
    transform: 'translateY(calc( -50% - 35px))',
    display: 'block',
  };

  render() {
    const { className, icon, item } = this.props;
    return (
      <div className={`etec-exam-pager ${className}`}>
        <div className="top">
          <img src={icon} className="picture" />
          <div className="duration">
            <div className="left pull-left">
              {(item && item.ts && timestampToDateString(item.ts, '-')) ||
                '20-09-2017'}
            </div>
            <div className="right pull-right">
              {(item && item.test_rule && item.test_rule.duration) ||
                '02:00:00'}
            </div>
          </div>
        </div>
        <div className="description">{item.name || t1('exam_paper')}</div>
        <Link
          style={this.linkStyle}
          to={Links.startExam({ iid: item.course_iid }, item.id)}
        >
          <button className="button-green">{t3('go_to_test')}</button>
        </Link>
      </div>
    );
  }
}

ExamPager.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  item: PropTypes.shape(),
};
ExamPager.defaultProps = {
  className: '',
  icon: '',
  item: '',
};
export default ExamPager;
