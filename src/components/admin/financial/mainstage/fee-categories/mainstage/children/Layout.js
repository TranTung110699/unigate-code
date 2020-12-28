import React from 'react';
import PropTypes from 'prop-types';
import { getSearchFormId } from './common/utils';
import Search from '../../search/Layout';

class FeeCategoryChildren extends React.Component {
  cssClass = 'admin-fee-category-children';

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

FeeCategoryChildren.propTypes = {
  className: PropTypes.string,
};

FeeCategoryChildren.defaultProps = {
  className: '',
};

export default FeeCategoryChildren;
