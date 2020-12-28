import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';
import { t } from 'translate';
// import { getUrl } from 'routes/links/common';
import { withRouter } from 'react-router-dom';
// import { getThemeConfig } from 'utils/selectors';
// import { layouts } from 'configs/constants';
import EditContainerV2 from '../../edit/EditContainerV2';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import UpdateForm from '../../new/Form';

class AcademicCategoryInfo extends React.Component {
  cssClass = 'admin-academic-category-info';

  render() {
    const { className, node, academicCategoryLevelName } = this.props;
    return (
      <EditContainerV2 buttons={null} {...this.props}>
        <div className={`${className || ''} ${this.cssClass}`}>
          <UpdateForm
            mode="edit"
            node={node}
            step="academic"
            alternativeApi="/category/index/update?type=academic"
            formid="edit_academic_category"
            params={{
              identifier: t(academicCategoryLevelName),
            }}
          />
        </div>
      </EditContainerV2>
    );
  }
}

AcademicCategoryInfo.propTypes = {
  className: PropTypes.string,
  // themeConfig: PropTypes.arrayOf(),
};

AcademicCategoryInfo.defaultProps = {
  className: '',
  // themeConfig: [],
};

const mapStateToProps = (state, props) => {
  const { node } = props;
  const level = node && node.level;
  const type = node && node.type;
  return {
    academicCategoryLevelName: getCategoryStructureLevelNameSelector(state)(
      type,
      level,
    ),
    // themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(
  withNodeEditContainer(AcademicCategoryInfo),
);
