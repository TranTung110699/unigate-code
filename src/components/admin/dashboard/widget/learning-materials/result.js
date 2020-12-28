import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StatText = ({ item }) => {
  return (
    <span>
      <b>{item.count}</b> {t1(item.name)}
    </span>
  );
};

const Results = ({ items }) => (
  <ul>
    {items &&
      items.map((item) => (
        <li>
          {['path', 'course', 'syllabus', 'contest'].includes(item.name) ? (
            <Link to={`/admin/${item.name}`}>
              <StatText item={item} />
            </Link>
          ) : (
            <StatText item={item} />
          )}
        </li>
      ))}
  </ul>
);

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
