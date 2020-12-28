import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/syllabus/search/credit-search/CreditSearchForm';
import { getSearchFormId } from './common/utils';

class Credits extends React.Component {
  cssClass = 'admin-organization-credits';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search
          type="credit"
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

Credits.propTypes = {
  className: PropTypes.string,
};

Credits.defaultProps = {
  className: '',
};

export default connect()(Credits);
