import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

const style = { paddingLeft: 16 };

const Results = ({ numberOfLearners, searchValues }) => {
  const fromDate = lodashGet(searchValues, 'from_date');
  const toDate = lodashGet(searchValues, 'to_date');

  if (!fromDate || !toDate) {
    return <div style={style}>{t1('please_select_date_range')}</div>;
  }

  return (
    <div style={style}>
      {t1('numbers_of_learners_during_this_period')}:
      <span
        style={{
          color: 'red',
          fontSize: 20,
          paddingLeft: 10,
        }}
      >
        {Number.isInteger(numberOfLearners) ? numberOfLearners : 0}
      </span>
    </div>
  );
};

Results.propTypes = {
  numberOfLearners: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  numberOfLearners: [],
};

export default Results;
