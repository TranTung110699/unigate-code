import React from 'react';
import PropTypes from 'prop-types';
import { getSearchFormId } from './common/utils';
import Search from '../../search/Layout';
import EditContainerV2 from '../../edit/EditContainerV2';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

class AcademicCategoryChildren extends React.Component {
  cssClass = 'admin-academic-category-children';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <EditContainerV2 buttons={null} {...this.props}>
        <div className={componentClassName}>
          <Search parent={node} formid={getSearchFormId(node)} />
        </div>
      </EditContainerV2>
    );
  }
}

AcademicCategoryChildren.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryChildren.defaultProps = {
  className: '',
};

export default withNodeEditContainer(AcademicCategoryChildren);
