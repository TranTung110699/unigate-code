/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';
import { getSearchFormId } from './common/utils';
import EditContainerV2 from '../../edit/EditContainerV2';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

class AcademicCategoryStaff extends React.Component {
  cssClass = 'admin-academic-category-staff';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <EditContainerV2 buttons={null} {...this.props}>
        <div className={componentClassName}>
          <Search formid={getSearchFormId(node)} node={node} />
        </div>
      </EditContainerV2>
    );
  }
}

AcademicCategoryStaff.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryStaff.defaultProps = {
  className: '',
};

export default withNodeEditContainer(AcademicCategoryStaff);
