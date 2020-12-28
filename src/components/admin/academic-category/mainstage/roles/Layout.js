import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/abac-role/concrete-role/search';
import { abacRoleTypes } from 'configs/constants';
import New from './new';
import { getSearchFormId } from './common/utils';
import EditContainerV2 from '../../edit/EditContainerV2';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import ButtonNewRoles from './new/ButtonNew';

class AcademicCategoryRole extends React.Component {
  cssClass = 'admin-academic-category-role';

  render() {
    const { className, node, action, location } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    const button = <ButtonNewRoles node={node} />;
    return (
      <EditContainerV2 buttons={button} {...this.props}>
        <div className={componentClassName}>
          {action === 'new' ? (
            <New category={node} />
          ) : (
            <Search
              step={'academic_category'}
              type={abacRoleTypes.ACADEMIC_CATEGORY}
              formid={getSearchFormId(node)}
              node={node}
              location={location}
            />
          )}
        </div>
      </EditContainerV2>
    );
  }
}

AcademicCategoryRole.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryRole.defaultProps = {
  className: '',
};

export default connect()(withNodeEditContainer(AcademicCategoryRole));
