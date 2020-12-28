import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/course/search/SearchForm';
import { getSearchFormId } from './common/utils';

class Courses extends React.Component {
  cssClass = 'admin-organization-courses';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search
          hiddenFields={{
            organization: node.iid,
          }}
          formid={getSearchFormId(node)}
          readOnly
        />
      </div>
    );
  }
}

Courses.propTypes = {
  className: PropTypes.string,
};

Courses.defaultProps = {
  className: '',
};

export default connect()(Courses);
