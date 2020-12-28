import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'translate';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { timestampToDateString } from 'common/utils/Date';
import Image from './resources/img.png';
import './stylesheet.scss';

const Paper = ({ className, item, examShift }) => {
  const cssClass = 'etec-exam-shift-item';
  return (
    <div className={`${className || ''} ${cssClass}`}>
      <div className={`${cssClass}__top`}>
        <img src={Image} alt="test" className={`${cssClass}__top-background`} />
        <div className={`${cssClass}__top-content`}>
          <div className={`${cssClass}__buttons`}>
            <Link
              to={Links.startExam(examShift, item.id)}
              className={`${cssClass}__button`}
            >
              {t('start_your_test')}
            </Link>
          </div>
          <div className={`${cssClass}__info`}>
            <div className={`${cssClass}__date`}>
              <Icon icon="calendar" />
              {(item && item.ts && timestampToDateString(item.ts, '-')) ||
                '20-09-2017'}
            </div>
            <div className={`${cssClass}__duration`}>
              <Icon icon="time" />
              {(item && item.test_rule && item.test_rule.duration) ||
                '02:00:00'}
            </div>
          </div>
        </div>
      </div>
      <div className={`${cssClass}__bottom`}>
        <span className={`${cssClass}__name`}>{item.name}</span>
      </div>
    </div>
  );
};

class ExamShiftsDisplay extends React.Component {
  cssClass = 'etec-exam-shift-display';

  render() {
    const { className, items, examShift } = this.props;
    return (
      <div className={`${className || ''} row ${this.cssClass}`}>
        {Array.isArray(items) &&
          items.length > 0 &&
          items.map((item) => (
            <div key={item.id} className="col-md-3 col-sm-4">
              <Paper
                className={`${this.cssClass}__item`}
                item={item}
                examShift={examShift}
              />
            </div>
          ))}
      </div>
    );
  }
}

ExamShiftsDisplay.propTypes = {
  className: PropTypes.string,
  examShift: PropTypes.shape(),
  items: PropTypes.arrayOf(PropTypes.shape()),
};

ExamShiftsDisplay.defaultProps = {
  className: '',
  examShift: null,
  items: null,
};

export default ExamShiftsDisplay;
