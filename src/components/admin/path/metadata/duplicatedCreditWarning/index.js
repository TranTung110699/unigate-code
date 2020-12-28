import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import fetchData from './fetchData';
import './stylesheet.scss';

class DuplicatedCreditWarning extends React.Component {
  cssClass = 'admin-path-duplicate-credit-warning';

  shouldComponentUpdate(nextProps) {
    if (nextProps.loadingStatus === 'loading') {
      return false;
    }
    return true;
  }

  render() {
    const { className, duplicatedCreditSyllabuses } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    if (
      !Array.isArray(duplicatedCreditSyllabuses) ||
      duplicatedCreditSyllabuses.length === 0
    ) {
      return null;
    }
    return (
      <div className={componentClassName}>
        <div>
          {t1(
            'warning:_some_subjects_are_added_more_than_once_inside_this_program',
          )}
        </div>
        <ul className={`${this.cssClass}__duplicated-credit-list`}>
          {duplicatedCreditSyllabuses.map((item) => (
            <li className={`${this.cssClass}__duplicated-credit-item`}>
              {item.credit_syllabus.name} (
              {t1('%s_times', [item.paths_to_credit_syllabus.length])})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

DuplicatedCreditWarning.propTypes = {
  className: PropTypes.string,
};

DuplicatedCreditWarning.defaultProps = {
  className: '',
};

export default fetchData(DuplicatedCreditWarning);
