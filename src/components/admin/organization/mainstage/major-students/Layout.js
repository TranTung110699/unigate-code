import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';
import { getSearchFormId } from './common/utils';

class MajorStudents extends React.Component {
  cssClass = 'admin-organization-major-students';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search formid={getSearchFormId(node)} node={node} />
      </div>
    );
  }
}

MajorStudents.propTypes = {
  className: PropTypes.string,
};

MajorStudents.defaultProps = {
  className: '',
};

export default connect()(MajorStudents);
