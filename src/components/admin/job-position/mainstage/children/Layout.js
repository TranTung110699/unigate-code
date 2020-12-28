import React from 'react';
import PropTypes from 'prop-types';
import { getSearchFormId } from './common/utils';
import Search from '../../search/Layout';

class JobPositionChildren extends React.Component {
  cssClass = 'admin-job-position-children';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search parent={node} formid={getSearchFormId(node)} />
      </div>
    );
  }
}

JobPositionChildren.propTypes = {
  className: PropTypes.string,
};

JobPositionChildren.defaultProps = {
  className: '',
};

export default JobPositionChildren;
