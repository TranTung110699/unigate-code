import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventBlog from './event-blog';

class Results extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className="row event-blogs-result-wrapper">
        {items &&
          items.length > 0 &&
          items.map((item) => <EventBlog key={item.id} eventBlog={item} />)}
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

export default Results;
