import React from 'react';
import PropTypes from 'prop-types';
import UpdateForm from '../../new/Form';

class FeeCategoryInfo extends React.Component {
  cssClass = 'admin-fee-category-info';

  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm
          mode="edit"
          node={node}
          step="fee"
          alternativeApi="/category/index/update?type=fee"
          formid="edit_fee_category"
        />
      </div>
    );
  }
}

FeeCategoryInfo.propTypes = {
  className: PropTypes.string,
};

FeeCategoryInfo.defaultProps = {
  className: '',
};

export default FeeCategoryInfo;
