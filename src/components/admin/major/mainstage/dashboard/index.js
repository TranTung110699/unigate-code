import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { getCategoryStructureLevelNameSelector } from 'common/category-structure/selectors';
import { t } from 'translate';

class MajorDashboard extends React.Component {
  cssClass = 'admin-major-info';

  render() {
    const {
      className,
      node,
      majorLevelName,
      topOrganizationLevelName,
    } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <h1>{node.name}</h1>
        {node.degree && (
          <div>
            <Link to={`/admin/degree/${node.degree}`}>
              {t('degree_config')} <Icon icon="link" />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

MajorDashboard.propTypes = {
  className: PropTypes.string,
};

MajorDashboard.defaultProps = {
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

export default connect(mapStateToProps)(MajorDashboard);
