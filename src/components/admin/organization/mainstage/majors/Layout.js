import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/major/search/Layout';
import { getSearchFormId } from './common/utils';

class Majors extends React.Component {
  cssClass = 'admin-organization-majors';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search
          formid={getSearchFormId(node)}
          hiddenFields={{ organization: node && node.iid }}
          readOnly
        />
      </div>
    );
  }
}

Majors.propTypes = {
  className: PropTypes.string,
};

Majors.defaultProps = {
  className: '',
};

export default connect()(Majors);
