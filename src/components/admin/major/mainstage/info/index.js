import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';
import { t } from 'translate';
import UpdateForm from '../../new/Form';

class MajorInfo extends React.Component {
  cssClass = 'admin-major-info';

  render() {
    const {
      className,
      node,
      step,
      majorLevelName,
      topOrganizationLevelName,
    } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateForm
          mode="edit"
          node={node}
          step={step || 'major'}
          alternativeApi="/category/index/update"
          formid="edit_major"
          params={{
            type: 'major',
            identifier: t(majorLevelName),
            organizationIdentifier: t(topOrganizationLevelName),
          }}
        />
      </div>
    );
  }
}

MajorInfo.propTypes = {
  className: PropTypes.string,
};

MajorInfo.defaultProps = {
  className: '',
};

const mapStateToProps = (state, props) => {
  const { node } = props;
  const level = node && node.level;
  const type = node && node.type;
  const topOrganizationLevelName = getCategoryStructureLevelNameSelector(state)(
    'organization',
    0,
  );

  return {
    majorLevelName: getCategoryStructureLevelNameSelector(state)(type, level),
    topOrganizationLevelName,
  };
};

export default connect(mapStateToProps)(MajorInfo);
