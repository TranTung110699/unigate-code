import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';
import { t } from 'translate';
import UpdateForm from '../../new/Form';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

class OrganizationInfo extends React.Component {
  cssClass = 'admin-organization-info';

  render() {
    const { className, node, organizationLevelName } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />
        <UpdateForm
          mode="edit"
          node={node}
          step="organization"
          alternativeApi="/category/index/update?type=organization"
          formid="edit_organization"
          params={{
            identifier: t(organizationLevelName),
          }}
        />
      </div>
    );
  }
}

OrganizationInfo.propTypes = {
  className: PropTypes.string,
};

OrganizationInfo.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const { node } = props;
  const level = node && node.level;
  const type = node && node.type;
  return {
    organizationLevelName: getCategoryStructureLevelNameSelector(state)(
      type,
      level,
    ),
  };
};

export default connect(mapStateToProps)(OrganizationInfo);
