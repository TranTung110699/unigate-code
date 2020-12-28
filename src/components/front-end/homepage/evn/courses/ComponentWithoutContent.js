import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';

class ComponentWithoutContent extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        <p>{t1(`there_are_no_${content}_yet`)}.</p>
      </div>
    );
  }
}

ComponentWithoutContent.defaultProps = {
  content: 'content',
};

ComponentWithoutContent.propTypes = {
  content: PropTypes.string,
};

export default ComponentWithoutContent;
